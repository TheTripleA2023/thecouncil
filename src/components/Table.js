/*
  Auto-generated by Spline
*/

import useSpline from '@splinetool/r3f-spline'
import { OrthographicCamera } from '@react-three/drei'

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline('https://prod.spline.design/u8olueo-1orOoKzy/scene.splinecode')
  return (
    <>
      <group {...props} dispose={null}>
        <scene name="Scene 1">
          <mesh
            name="Cylinder 5"
            geometry={nodes['Cylinder 5'].geometry}
            material={materials['Cylinder 5 Material']}
            castShadow
            receiveShadow
            position={[40.03, 48.21, 38.98]}
            rotation={[Math.PI / 2, 0, -Math.PI / 4]}
          />
          <mesh
            name="Cylinder 4"
            geometry={nodes['Cylinder 4'].geometry}
            material={materials['Cylinder 4 Material']}
            castShadow
            receiveShadow
            position={[0.48, 48.21, 55.36]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Cylinder 51"
            geometry={nodes['Cylinder 51'].geometry}
            material={materials['Cylinder 51 Material']}
            castShadow
            receiveShadow
            position={[-49.65, 48.21, -50.69]}
            rotation={[Math.PI / 2, 0, -Math.PI / 4]}
          />
          <mesh
            name="Cylinder 41"
            geometry={nodes['Cylinder 41'].geometry}
            material={materials['Cylinder 41 Material']}
            castShadow
            receiveShadow
            position={[0.48, 48.21, -71.46]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Cylinder 6"
            geometry={nodes['Cylinder 6'].geometry}
            material={materials['Cylinder 6 Material']}
            castShadow
            receiveShadow
            position={[40.03, 48.21, -40.1]}
            rotation={[Math.PI / 2, 0, -2.36]}
          />
          <mesh
            name="Cylinder 2"
            geometry={nodes['Cylinder 2'].geometry}
            material={materials['Cylinder 2 Material']}
            castShadow
            receiveShadow
            position={[56.4, 48.21, -0.56]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="Cylinder 61"
            geometry={nodes['Cylinder 61'].geometry}
            material={materials['Cylinder 61 Material']}
            castShadow
            receiveShadow
            position={[-49.65, 48.21, 49.57]}
            rotation={[Math.PI / 2, 0, -2.36]}
          />
          <mesh
            name="Cylinder 3"
            geometry={nodes['Cylinder 3'].geometry}
            material={materials['Cylinder 3 Material']}
            castShadow
            receiveShadow
            position={[-70.41, 48.21, -0.56]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="Ellipse 2"
            geometry={nodes['Ellipse 2'].geometry}
            material={materials['Ellipse 2 Material']}
            castShadow
            receiveShadow
            position={[0, 3.99, 0]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          />
          <mesh
            name="Ellipse 5"
            geometry={nodes['Ellipse 5'].geometry}
            material={materials['Ellipse 5 Material']}
            castShadow
            receiveShadow
            position={[0, 44.95, 0]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          />
          <mesh
            name="Ellipse 4"
            geometry={nodes['Ellipse 4'].geometry}
            material={materials['Ellipse 4 Material']}
            castShadow
            receiveShadow
            position={[0, 44.97, 0]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          />
          <mesh
            name="Ellipse 3"
            geometry={nodes['Ellipse 3'].geometry}
            material={materials['Ellipse 3 Material']}
            castShadow
            receiveShadow
            position={[0, 49, 0]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          />
          <mesh
            name="Ellipse"
            geometry={nodes.Ellipse.geometry}
            material={materials['Ellipse Material']}
            castShadow
            receiveShadow
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          />
        </scene>
      </group>
    </>
  )
}
