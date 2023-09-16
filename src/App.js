import {
	Button,
	ChakraProvider,
	Input,
	Text,
	Textarea,
} from "@chakra-ui/react";
import "./App.css";
import { useRef, useState, Suspense, useEffect} from 'react'
import { Canvas, useFrame, useThree} from '@react-three/fiber'
import * as React from 'react'
import { AiOutlineCheck } from "react-icons/ai";
import Model from "./components/Model.js"
import Frog from "./components/Frog";
import Table from "./components/Table";
import { Environment, Lightformer, OrbitControls, PivotControls } from '@react-three/drei'


//Backend
import GPTCouncil from './councilBackend/gptCouncil.js'


const AIHandler = new GPTCouncil();


//3D Components
function CouncilTable(props, id) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  function pickCouncilMember() {
    click(!clicked)
  }
  
  useFrame((state, delta) => (ref.current.rotation.y += delta/4))

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => pickCouncilMember() }
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <Suspense fallback={null}>
        {/* <Frog position={[0, 0, 0]}/> */}
        <Table position={[0, 0, 0]} scale={0.01}/>
        <Model position={[0, 0, -1.4]} name="Panda" />
        <Model position={[1.4, 0,  0]} rotation={[0, Math.PI/-2, 0]} name="Flamingo" />
        <Model position={[0, 0, 1.4]} rotation={[0, Math.PI, 0]} name="Cat" />
        <Model position={[-1.4, 0, 0]} rotation={[0, Math.PI/2, 0]} name="Platypus" />
      </Suspense>
    </mesh>
  )
}

function Shadows(props) {
  const { viewport } = useThree()
  return (
    <mesh receiveShadow scale={[viewport.width, viewport.height, 1]} {...props}>
      <planeGeometry />
      <shadowMaterial transparent opacity={0.5} />
    </mesh>
  )
}



//2D Components
function CouncilCard(props) {

	return (
		<div className="council-card">
			<Text className="council-card-message">{props.message}</Text>
			<div className="council-card-member">
         {/* Cannot have 3js elements in a 2d component, so probably redundant? */}
				<div className="council-card-member-image">
        </div>
     
				<Text className="council-card-member-name">{props.name}</Text>
			</div>
		</div>
	);
}

export default function App() {
	const [pageStage, setPageStage] = useState(0);
	const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);

  const ref = useRef()

	const handleSubmit = () => {
		setInputValue(document.querySelector(".prompt-input").value);
    if(inputValue === "") {return};
    AIHandler.askTheCouncil(inputValue).then(setData(AIHandler.godJson)).then(setPageStage(1));
	};

	const handleReply = () => {
    setInputValue(document.querySelector(".council-reply-prompt-input").value);
		// TODO
    if(inputValue === "") {return};
    AIHandler.askTheCouncil(inputValue).then(setData(AIHandler.godJson)).then(setPageStage(1));
	};

	return (
		<ChakraProvider>
			<div ref={ref} className="container">
				{/* PAGE STAGE 1 - HOMEPAGE */}
				{pageStage === 0 && (
					<div className="homepage-content">
						<div className="homepage-title">
							<Text className="homepage-h1">In a dilemma?</Text>
							<Text className="homepage-h1">
								Consult
								<span className="homepage-gradient-text">
									the council.
								</span>
							</Text>
						</div>

						<div className="homepage-prompt">
							<Input
								className="prompt-input"
								placeholder="Tell us what's going on"
								style={{
									width: "488px",
								}}
								colorScheme="gray"
								variant="filled"
								_focus={{
									borderColor: "gray",
									textColor: "gray",
									bg: "white",
									boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
									overflowY: "auto",
									resize: "vertical",
								}}
							/>
							<Button
								className="submit-button"
								colorScheme="teal"
								rightIcon={<AiOutlineCheck />}
								variant="solid"
								ml={2} // Add margin-left to create space between the input and button
								onClick={handleSubmit} // Call the handleSubmit function on button click
							>
								OK
							</Button>
						</div>
					</div>
				)}
				{/* PAGE STAGE 2 - THE COUNCIL */}
				{pageStage === 1 && (
					<div className="council-content">
						<Text className="council-title">
							The Council says...
						</Text>
						<Text className="council-query-label">Your query:</Text>
						<Text className="council-query">{data.questions[data.questions.length-1]}</Text>
            <div className="council-cards">
              {/* I CANNOT GET THIS TO UPDATE */}
              {data.members.map((councilMember,index)=>{
                  return <CouncilCard
                    key={index}
                    name= {councilMember.name}
                    message= {councilMember.conversation[councilMember.conversation.length-1].content}
                  />
              })}
            </div>
						<div className="council-reply-prompt">
							<Input
								className="council-reply-prompt-input"
								placeholder="I'm thinking about..."
								style={{ width: "488px" }}
								variant="filled"
								_focus={{
									borderColor: "gray", // Set the border color when the input is focused
									textColor: "gray",
									bg: "white",
									boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)", // Add a focus shadow
								}}
							/>
							<Button
								className="reply-button"
								colorScheme="teal"
								rightIcon={<AiOutlineCheck />}
								variant="solid"
								ml={2} // Add margin-left to create space between the input and button
								onClick={handleReply} // Call the handleSubmit function on button click
							>
								OK
							</Button>
						</div>
					</div>
				)}
				{/* PAGE STAGE 3 - LOADING STAGE */}
				{pageStage === 2 && (
					<div className="council-content">
						<Text className="council-title">
							The Council is thinking...
						</Text>
						<Text className="council-query-label">Your query:</Text>
						<Text className="council-query">{inputValue}</Text>
					</div>
				)}
        <Canvas 
          orthographic camera={{ position: [0, 5, 10], zoom: 100 }} 
          style={{ pointerEvents: 'none' }}
          // In order for two dom nodes to be able to receive events they must share
          // the same source. By re-connecting the canvas to a parent that contains the
          // text content as well as the canvas we do just that.
          eventSource={ref}
          eventPrefix="client">
          <ambientLight />
          <directionalLight castShadow intensity={0.6} position={[0, 0, 10]} />
          <group >
            <CouncilTable position={[0, 2, 0]} scale={5.0}/>
          </group>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
              {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
                <Lightformer key={i} form="circle" intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[4, 1, 1]} />
              ))}
              <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
              <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[50, 2, 1]} />
              <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
            </group>
          </Environment>
        </Canvas>
			</div>
		</ChakraProvider>
	);
}



/*
export default function App() {
  const ref = useRef()
  return (
    <ChakraProvider>
      <div ref={ref} className="container">
      <div className='text'>
        <Text>In a dilemma?</Text>
        <Text>Ask the council.</Text>

        <div>
          <Input placeholder="Enter prompt here."/>
          <Button rightIcon={<AiOutlineCheck/>} variant='outline'>
            OK
          </Button>
        </div>
      </div>

      </div>
    </ChakraProvider>
  )
}


				<Canvas
          shadows
          camera={{ position: [0, 0, 4] }}
          style={{ pointerEvents: 'none' }}
          // In order for two dom nodes to be able to receive events they must share
          // the same source. By re-connecting the canvas to a parent that contains the
          // text content as well as the canvas we do just that.
          eventSource={ref}
          eventPrefix="client">
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow shadow-mapSize={[2024, 2024]} />
          <pointLight position={[10, 0, 0]} />
          <CouncilMember position={[0, 0, 0]}/>
          <CouncilMember position={[0, 0, 0]}/>
          <Shadows position={[0, 0, 0]} />
        </Canvas>

*/



