import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as React from "react";
import {
	Button,
	ChakraProvider,
	Input,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { AiOutlineCheck } from "react-icons/ai";
import "./App.css";

function Box(props) {
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef();
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => (ref.current.rotation.x += delta));
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={ref}
			scale={clicked ? 1.5 : 1}
			onClick={(event) => click(!clicked)}
			onPointerOver={(event) => (event.stopPropagation(), hover(true))}
			onPointerOut={(event) => hover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	);
}

export default function App() {
	const [pageStage, setPageStage] = useState(0);
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = () => {
		setPageStage(1);
		setInputValue(document.querySelector(".prompt-input").value);
	};

	return (
		<ChakraProvider className="body">
			{pageStage === 0 && (
				<div className="homepage-content">
					<div className="homepage-title">
						<Text className="homepage-h1">In a dilemma?</Text>
						<Text className="homepage-h1">
							Consult the council.
						</Text>
					</div>

					<div className="homepage-prompt">
						<Input
							className="prompt-input"
							placeholder="Tell us what's going on"
							style={{ width: "488px" }}
						/>
						<Button
							className="submit-button"
							rightIcon={<AiOutlineCheck />}
							variant="outline"
							ml={2} // Add margin-left to create space between the input and button
							onClick={handleSubmit} // Call the handleSubmit function on button click
						>
							OK
						</Button>
					</div>
				</div>
			)}

			{pageStage === 1 && (
				<div className="council-content">
					<Text className="council-title">The Council says...</Text>
					<Text className="council-query-label">Your query:</Text>
					<Text className="council-query">{inputValue}</Text>
				</div>
			)}

			<Canvas>
				<ambientLight intensity={0.5} />
				<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
				<pointLight position={[-10, -10, -10]} />
				<Box position={[-1.2, 0, 0]} />
				<Box position={[1.2, 0, 0]} />
				<OrbitControls />
			</Canvas>
		</ChakraProvider>
	);
}
