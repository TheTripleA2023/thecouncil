import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as React from 'react'
import { Button, ChakraProvider, Input, Text, Textarea } from '@chakra-ui/react'
import { AiOutlineCheck } from "react-icons/ai";
import './App.css';

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <ChakraProvider>
      <div className='homepage'>
        <Text fontSize="80px">In a dilemma?</Text>
        <Text fontSize="80px">Ask the council.</Text>

        <div className='enter-prompt'>
          {/* <Textarea placeholder="Enter prompt here."/> */}
          <Input placeholder="Enter prompt here." width="50%" marginRight="20px"/>
          <Button rightIcon={<AiOutlineCheck/>} variant='outline'>
            OK
          </Button>
        </div>
      </div>

      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <OrbitControls />
      </Canvas>
    </ChakraProvider>
  )
}