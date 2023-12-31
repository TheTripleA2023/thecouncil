/*
  Auto-generated by Spline
*/

import useSpline from '@splinetool/r3f-spline'
import { OrthographicCamera } from '@react-three/drei'

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline('https://prod.spline.design/g8vx4jmfENd4ub-Q/scene.splinecode')
  return (
    <>
      <color attach="background" args={['#74757a']} />
      <group {...props} dispose={null}>
        <scene name="Scene 1">
          <mesh
            name="Ellipse"
            geometry={nodes.Ellipse.geometry}
            material={materials['Ellipse Material']}
            castShadow
            receiveShadow
            position={[1.9, 68.05, 0.53]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="Sphere"
            geometry={nodes.Sphere.geometry}
            material={nodes.Sphere.material}
            castShadow
            receiveShadow
          />
          {/* <OrthographicCamera name="1" makeDefault={true} far={10000} near={-50000} />
          <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea" /> */}
        </scene>
      </group>
    </>
  )
}