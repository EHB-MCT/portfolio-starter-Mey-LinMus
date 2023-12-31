import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Model from "./model/3d-model"; 

function CanvasContainer() {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={1.0} />
      <Stars />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Model />
    </Canvas>
  );
}

export default CanvasContainer;
