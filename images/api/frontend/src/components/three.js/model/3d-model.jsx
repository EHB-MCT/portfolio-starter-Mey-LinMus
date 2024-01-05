/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.14 3d-model.glb 
Author: gadsby (https://sketchfab.com/gadsby)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/f-you-all-fd73942e5c45469f87d95f53e4576823
Title: F... you All!
*/
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const BirthdayModel = (props) => {
  const { nodes, materials } = useGLTF("model/3d-model.glb");

  const groupRef = useRef();

  // Rotate animation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; 
    }
  });
  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2.2, 0, 0]} scale={5}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[0.195, 0.241, 0.081]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.001}
          >
            <mesh
              geometry={nodes.Object_17.geometry}
              material={materials.Material_2_1}
              position={[-194.602, 81.332, -200.971]}
            />
            <mesh
              geometry={nodes.Object_19.geometry}
              material={materials.Material_1_2}
              position={[-194.602, 81.332, -200.971]}
            />
          </group>
          <group
            position={[0.23, 0.559, 0.055]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.001}
          >
            <mesh
              geometry={nodes.Object_22.geometry}
              material={materials.Material_7}
              position={[-230.439, 55.495, -519.093]}
            />
            <mesh
              geometry={nodes.Object_24.geometry}
              material={materials.Material_8}
              position={[-230.439, 55.495, -519.093]}
            />
            <mesh
              geometry={nodes.Object_26.geometry}
              material={materials.Material_9}
              position={[-230.439, 55.495, -519.093]}
            />
            <mesh
              geometry={nodes.Object_28.geometry}
              material={materials.Material_10}
              position={[-230.439, 55.495, -519.093]}
            />
          </group>

          <mesh
            geometry={nodes.Object_6.geometry}
            material={materials.Material_1_1}
            position={[0, 0.04, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.001}
          />
          <mesh
            geometry={nodes.Object_8.geometry}
            material={materials.Material_1_3}
            position={[0, 0.04, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.001}
          />
          <mesh
            geometry={nodes.Object_10.geometry}
            material={materials.Material_2}
            position={[0, 0.04, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.001}
          />
          <mesh
            geometry={nodes.Object_12.geometry}
            material={materials.Material_3}
            position={[0, 0.04, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.001}
          />
          <mesh
            geometry={nodes.Object_14.geometry}
            material={materials.Material_4}
            position={[0, 0.04, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.001}
          />
          <mesh
            geometry={nodes.Object_30.geometry}
            material={materials["3D_Text_material"]}
            position={[0.356, 0.315, 0.077]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            scale={0.001}
          />
          <mesh
            geometry={nodes.Object_32.geometry}
            material={materials["3D_Text_material_1"]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.001}
          />
          <mesh
            geometry={nodes.Object_34.geometry}
            material={materials["3D_Text_material_2"]}
            position={[-0.026, 0.492, -0.011]}
            rotation={[-1.191, -0.231, 1.658]}
            scale={[0.002, 0.001, 0.002]}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("model/3d-model.glb");

export default BirthdayModel;
