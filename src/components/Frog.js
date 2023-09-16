/*
  Auto-generated by Spline
*/

import useSpline from '@splinetool/r3f-spline'
import { OrthographicCamera } from '@react-three/drei'

export default function Frog({ ...props }) {
  const { nodes, materials } = useSpline('https://prod.spline.design/1vFpLuZBjCqcxKso/scene.splinecode')
  return (
    <>
      <group {...props} dispose={null}>
        <scene name="Scene 1">
          <group name="Frog" position={[0, 51.37, 0]}>
            <mesh
              name="Sphere 5"
              geometry={nodes['Sphere 5'].geometry}
              material={materials['Sphere 5 Material']}
              castShadow
              receiveShadow
              position={[-41.49, 88.82, 23.64]}
              rotation={[0, 0.21, 0.02]}
              scale={1}
            />
            <mesh
              name="Sphere 4"
              geometry={nodes['Sphere 4'].geometry}
              material={materials['Sphere 4 Material']}
              castShadow
              receiveShadow
              position={[41.66, 88.32, 23.75]}
              rotation={[0, 0.21, 0.02]}
              scale={1}
            />
            <mesh
              name="Sphere 3"
              geometry={nodes['Sphere 3'].geometry}
              material={materials['Sphere 3 Material']}
              castShadow
              receiveShadow
              position={[-37.84, 87.45, 12.29]}
            />
            <mesh
              name="Sphere 2"
              geometry={nodes['Sphere 2'].geometry}
              material={materials['Sphere 2 Material']}
              castShadow
              receiveShadow
              position={[39.84, 87.45, 12.29]}
            />
            <mesh
              name="Sphere"
              geometry={nodes.Sphere.geometry}
              material={materials['Sphere Material']}
              castShadow
              receiveShadow
              position={[0, 41.42, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <group name="Body Instance" position={[-0.87, -46.43, 0]}>
              <mesh
                name="Body"
                geometry={nodes.Body.geometry}
                material={nodes.Body.material}
                castShadow
                receiveShadow
                position={[0, 2.19, 0]}
              />
            </group>
          </group>
          <group name="Body1" position={[-0.87, 4.94, 0]}>
            <mesh
              name="Body2"
              geometry={nodes.Body2.geometry}
              material={nodes.Body2.material}
              castShadow
              receiveShadow
              position={[0, 2.19, 0]}
            />
          </group>
        </scene>
      </group>
    </>
  )
}
