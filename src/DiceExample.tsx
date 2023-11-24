import React, {FunctionComponent, useEffect, useState} from 'react';
import {SafeAreaView, View, ViewProps} from 'react-native';
import {EngineView, useEngine} from '@babylonjs/react-native';
import {SceneLoader} from '@babylonjs/core/Loading/sceneLoader';
import {Camera} from '@babylonjs/core/Cameras/camera';
import {ArcRotateCamera} from '@babylonjs/core/Cameras/arcRotateCamera';
import '@babylonjs/loaders/glTF';
import {Scene} from '@babylonjs/core/scene';

const EngineScreen: FunctionComponent<ViewProps> = (props: ViewProps) => {
  const engine = useEngine();
  const [camera, setCamera] = useState<Camera>();
  const [_, setScene] = useState<Scene>();

  useEffect(() => {
    if (engine) {
      const url =
        'https://raw.githubusercontent.com/WayneKim92/ReactNativeHelloBabylon/practice/assets/3d_models/dice/scene.gltf';

      SceneLoader.LoadAsync(url, undefined, engine)
        .then(loadScene => {
          setScene(loadScene);
          loadScene.createDefaultCameraOrLight(true, undefined, true);
          (loadScene.activeCamera as ArcRotateCamera).alpha += Math.PI;
          (loadScene.activeCamera as ArcRotateCamera).radius = 30;
          setCamera(loadScene.activeCamera!);
        })
        .catch(err => {
          console.log('🐞err', err);
        });
    }
  }, [engine]);

  return (
    <>
      <View style={props.style}>
        <View style={{flex: 1}}>
          <EngineView camera={camera} displayFrameRate={true} />
        </View>
      </View>
    </>
  );
};

const DiceExample = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <EngineScreen style={{flex: 1}} />
    </SafeAreaView>
  );
};

export default DiceExample;
