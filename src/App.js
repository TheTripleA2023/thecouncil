import {
	Button,
	ChakraProvider,
	Input,
	Text,
	Textarea,
} from "@chakra-ui/react";
import "./App.css";
import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import Model from "./components/Model.js";
import Table from "./components/Table";
import Dots from "./components/Dots"
import DotsGif from "./images/dots-same-time.gif"
import {
	Environment,
	Lightformer,
	OrbitControls,
	PivotControls,
} from "@react-three/drei";
import { Image } from "@chakra-ui/react";
import { Html } from '@react-three/drei'
import theme from "./chakra-theme";
import Blob1 from "./components/Blob1";

//Backend
import GPTCouncil from "./councilBackend/gptCouncil.js";

const AIHandler = new GPTCouncil();


//3D Components
function CouncilTable(props, id) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  useFrame((state, delta) => {
    ref.current.rotation.y += delta/4
  })

	function pickCouncilMember() {
		click(!clicked);
	}

	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh>
			{/* <Dots position={[0, 3, 0]} rotation={[0, Math.PI / -2, 0]} scale={0.02}/> */}
			<mesh
			{...props}
			ref={ref}
			scale={ 1.25}
			onClick={(event) => pickCouncilMember()}
			onPointerOver={(event) => (event.stopPropagation(), hover(true),pickCouncilMember())}
			onPointerOut={(event) => hover(false)}
		>
      
			<Suspense fallback={null}>
				{/* <Frog position={[0, 0, 0]}/> */}
				<Table position={[0, 0, 0]} scale={0.012} />
				<Model position={[0, 0, -1.8]} scale={1.75} name="Panda" />
				<Model
					position={[1.4, 0, 0]}
					rotation={[0, Math.PI / -2, 0]}
					name="Flamingo"
				/>
				<Model
					position={[0, 0, 1.4]}
					rotation={[0, Math.PI, 0]}
					name="Cat"
				/>
				<Model
					position={[-1.6, 0, 0]}
					rotation={[0, Math.PI / 2, 0]}
					name="Platypus"
				/>
				<Model
					position={[-1, 0, -1]}
					scale={0.9}
					rotation={[0, Math.PI / 4, 0]}
					name="Frog"
				/>
				<Model
					position={[1, 0, 1]}
					scale={0.8}
					rotation={[0, (-3 * Math.PI) / 4, 0]}
					name="Possum"
				/>
				<Model
					position={[-1.1, 0, 1.1]}
					rotation={[0, (3 * Math.PI) / 4, 0]}
					name="Hornbill"
				/>
				<Model
					position={[1.4, 0, -1.4]}
					scale={1.2}
					rotation={[0, -Math.PI / 4, 0]}
					name="Tiger"
				/>
			</Suspense>
		</mesh>
		</mesh>
		// <mesh
		// 	{...props}
		// 	ref={ref}
		// 	scale={clicked ? 1.5 : 1}
		// 	onClick={(event) => pickCouncilMember()}
		// 	onPointerOver={(event) => (event.stopPropagation(), hover(true))}
		// 	onPointerOut={(event) => hover(false)}
		// >
		// 	<Suspense fallback={null}>
		// 		{/* <Frog position={[0, 0, 0]}/> */}
		// 		{/* <Dots position={[-0.45, 1, 0]} scale={0.01}/> */}
		// 		<Table position={[0, 0, 0]} scale={0.012} />
		// 		<Model position={[0, 0, -1.8]} scale={1.75} name="Panda" />
		// 		<Model
		// 			position={[1.4, 0, 0]}
		// 			rotation={[0, Math.PI / -2, 0]}
		// 			name="Flamingo"
		// 		/>
		// 		<Model
		// 			position={[0, 0, 1.4]}
		// 			rotation={[0, Math.PI, 0]}
		// 			name="Cat"
		// 		/>
		// 		<Model
		// 			position={[-1.6, 0, 0]}
		// 			rotation={[0, Math.PI / 2, 0]}
		// 			name="Platypus"
		// 		/>
		// 		<Model
		// 			position={[-1, 0, -1]}
		// 			scale={0.9}
		// 			rotation={[0, Math.PI / 4, 0]}
		// 			name="Frog"
		// 		/>
		// 		<Model
		// 			position={[1, 0, 1]}
		// 			scale={0.8}
		// 			rotation={[0, (-3 * Math.PI) / 4, 0]}
		// 			name="Possum"
		// 		/>
		// 		<Model
		// 			position={[-1.1, 0, 1.1]}
		// 			rotation={[0, (3 * Math.PI) / 4, 0]}
		// 			name="Hornbill"
		// 		/>
		// 		<Model
		// 			position={[1.4, 0, -1.4]}
		// 			scale={1.2}
		// 			rotation={[0, -Math.PI / 4, 0]}
		// 			name="Tiger"
		// 		/>
		// 	</Suspense>
		// </mesh>
	);
}



//2D Components
function CouncilCard(props) {
	// console.log("card: " + props.message);
	return (
		<div className="council-card">
			<Text className="council-card-message">{props.message}</Text>
			<div className="council-card-member">
				{/*  Cannot have 3js elements in a 2d component, so probably redundant?*/}
				<div className="council-card-member-image">
					<Image borderRadius="full" src={props.imagePath} />
				</div>

				<Text className="council-card-member-name">{props.name}</Text>
			</div>
		</div>
	);
}

export default function App() {
	const [pageStage, setPageStage] = useState(0);
	const [inputValue, setInputValue] = useState("");
	const [replyValue, setReplyValue] = useState("");
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const ref = useRef();

	const handleSubmit = async () => {
		setInputValue(document.querySelector(".prompt-input").value);
		if (inputValue === "") {
			return;
		}
		setLoading(true);
		setPageStage(3);
		const response = await AIHandler.askTheCouncil(inputValue);
		console.log(response);
		setData(AIHandler.godJson);
		setPageStage(1);
		setLoading(false);
	};

	const handleReply = async () => {
		setReplyValue(
			document.querySelector(".council-reply-prompt-input").value
		);
		if (replyValue === "") {
			return;
		}
		setLoading(true);
		setPageStage(3);
		const response = await AIHandler.askTheCouncil(replyValue);
		console.log(response);
		setData(AIHandler.godJson);
		setPageStage(1);
		setLoading(false);
	};

	const handleDone = () => {
		setPageStage(2);
	};

	return (
		<ChakraProvider theme={theme}>
			<div ref={ref} className="container">
				{/* PAGE STAGE 1 - HOMEPAGE */}
				{pageStage === 0 && (
					<div className="homepage-content">
						<div className="homepage-title">
							<Text className="homepage-h1">In a dilemma?</Text>
							<Text className="homepage-h1">
								Consult
								<span className="homepage-gradient-text">
									the Council.
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

						<Image className="dots-gif" src={DotsGif}/>

            <Text className="homepage-text homepage-text-1">"my roommates hate me"</Text>
            <Text className="homepage-text homepage-text-2">"do I text my ex back"</Text>
            <Text className="homepage-text homepage-text-3">"how often should I be showering"</Text>
            <Text className="homepage-text homepage-text-4">"does pineapple go on pizza"</Text>
            <Text className="homepage-text homepage-text-5">*insert moral dilemma here*</Text>
					</div>
				)}
				{/* PAGE STAGE 2 - THE COUNCIL */}
				{pageStage === 1 && (
					<div className="council-content">
						<Text className="council-title">
							The Council says...
						</Text>
						<Text className="council-query-label">Your query:</Text>
						{data ? (
							<Text className="council-query">
								{data.questions[data.questions.length - 1]}
							</Text>
						) : (
							<div>Loading...</div> // Display a loading message while data is loading
						)}
						<div className="council-cards">
							{data ? (
								data.members.map((councilMember, index) => (
									<CouncilCard
										key={index}
										name={councilMember.name}
                    imagePath={councilMember.imagePath}
										message={
											councilMember.conversation &&
											councilMember.conversation.length
												? councilMember.conversation[
														councilMember
															.conversation
															.length - 1
												  ]?.content || ""
												: ""
										}
									/>
								))
							) : (
								<div>Loading...</div> // Display a loading message while data is loading
							)}
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
						<Text className="done-text" onClick={handleDone}>
							No thanks, I’m all done!
						</Text>
					</div>
				)}
				{/* PAGE STAGE 3 - LOADING STAGE */}
				{pageStage === 2 && (
					<div className="end-content">
						<div className="end-title">
							<Text className="end-h1">
								The Council thanks you!
							</Text>
						</div>
					</div>
				)}
				{/* LOADING STAGE */}
				{isLoading && (
					<div className="council-content">
						<Text className="council-title">
							The Council is thinking...
						</Text>
						<Text className="council-query-label">Your query:</Text>
						<Text className="council-query">{inputValue}</Text>
					</div>
				)}
				<Canvas
					orthographic
					camera={{ position: [0, 5, 10], zoom: 100 }}
					style={{ pointerEvents: "none" }}
					// In order for two dom nodes to be able to receive events they must share
					// the same source. By re-connecting the canvas to a parent that contains the
					// text content as well as the canvas we do just that.
					eventSource={ref}
					eventPrefix="client"
				>
					<ambientLight />
					<directionalLight
						castShadow
						intensity={0.01}
						position={[0, 0, 10]}
					/>
					<group>
						<CouncilTable position={[0, 1, 0]} scale={5.0} />
        
					</group>
				</Canvas>
			</div>
		</ChakraProvider>
	);
}
