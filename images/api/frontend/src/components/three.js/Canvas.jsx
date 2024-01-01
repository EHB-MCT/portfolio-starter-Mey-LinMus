import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./model/3d-model";

function CanvasContainer() {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "120%",
        backgroundColor: "#d9afd9",
        backgroundImage: "linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%)",
        position: "relative",
        bottom: "20%",
      }}
    >
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        zoomSpeed={0.5}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <ambientLight intensity={3.5} />
      <Model position={[0, -2, 0]} />
    </Canvas>
  );
}

export default CanvasContainer;
