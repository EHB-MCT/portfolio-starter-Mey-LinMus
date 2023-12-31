import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const GLTFLoaderComponent = (props) => {
  const gltf = useLoader(GLTFLoader, props.modelPath);
  const group = useRef();

  return <primitive object={gltf.scene} ref={group} {...props} />;
};

export default GLTFLoaderComponent;