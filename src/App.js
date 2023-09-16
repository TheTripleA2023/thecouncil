import {
	Button,
	ChakraProvider,
	Input,
	Text,
	Textarea,
} from "@chakra-ui/react";
import "./App.css";
import { useRef, useState, Suspense} from 'react'
import { Canvas, useFrame, useThree} from '@react-three/fiber'
import * as React from 'react'
import { AiOutlineCheck } from "react-icons/ai";
import Model from "./components/Model.js"
import Frog from "./components/Frog";

//Backend
import GPTCouncil from './councilBackend/gptCouncil.js'

const AIHandler = new GPTCouncil();


//3D Components
function CouncilMember(props, id) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  function pickCouncilMember() {
    click(!clicked)
    AIHandler.askTheCouncil("Hello, World!, Say it back")
  }

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
            <Model pose={4} position={[0, 0, 0]} />
      </Suspense>
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
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
				<div className="council-card-member-image"></div>
				<Text className="council-card-member-name">{props.name}</Text>
			</div>
		</div>
	);
}

export default function App() {
	const [pageStage, setPageStage] = useState(0);
	const [inputValue, setInputValue] = useState("");
  const ref = useRef()

	const handleSubmit = () => {
		setPageStage(1);
		setInputValue(document.querySelector(".prompt-input").value);
	};

	const handleReply = () => {
		// TODO
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
						<Text className="council-query">{inputValue}</Text>
						<div className="council-cards">
							<CouncilCard
								name="The Starfish"
								message="Go for it! Take this opportunity to reconnect and have a conversation. First, make sure to set some boundaries, express your feelings, and listen. This could be a chance to rebuild and create something even better than before!"
							></CouncilCard>
							<CouncilCard
								name="The Hammerhead"
								message="Do not go. Entertaining the idea of going over is unwise and potentially setting yourself up for disappointment or even heartbreak. Prioritize your emotional well-being by avoiding unnecessary complications from the past."
							></CouncilCard>
							<CouncilCard
								name="The Tree Frog"
								message="Absolutely go over! This is surely a sign that they can't resist your magnetic allure. Embrace the opportunity to reignite the passion and show them what they're missing!"
							></CouncilCard>
							<CouncilCard
								name="The Bear"
								message="Listen to your instincts and consider what you truly want. If meeting your ex aligns with your personal growth and happiness, go for it. However, if it feels like a step backwards, prioritize yourself and politely decline."
							></CouncilCard>
						</div>
						<div className="coucil-reply-prompt">
							<Input
								className="coucil-reply-prompt-input"
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
          <CouncilMember position={[-1.2, -1, 0]}/>
          <CouncilMember position={[1.2, -1, 0]}/>
          <Shadows position={[0, 0, 0]} />
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

*/



