import {
	Box,
	Button,
	ChakraProvider,
	Input,
	Text,
	Textarea,
} from "@chakra-ui/react";
import "./App.css";
import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import Model from "./components/Model.js";
import Table from "./components/Table";
import Disco from "./components/Disco";
import DotsGif from "./images/dots-same-time.gif";
import DiscoGif from "./images/Disco1.gif";

import Bg1 from "./images/TYBG1.png"
import Bg2 from "./images/TYBG2.png"
import Bg3 from "./images/TYBG3.png"

import BlueFloor from "./images/Bluefloor.svg"
import GreenFloor from "./images/Greenfloor.svg"
import PinkFloor from "./images/Pinkfloor.svg"

import Animals from "./images/Animals.png"

import {
	Environment,
	Lightformer,
	OrbitControls,
	PivotControls,
} from "@react-three/drei";
import Dots from "./components/Dots";
import { Image } from "@chakra-ui/react";
import theme from "./chakra-theme";
import { Wrap, WrapItem, Center } from "@chakra-ui/react";
import "intersection-observer";
import {AutoResizeTextarea} from "./components/textArea.js";
//Backend
import GPTCouncil from "./gptCouncil.js";
import { TrialMembers } from "./gptCouncil.js";

const AIHandler = new GPTCouncil();

//3D Components
function CouncilTable(props) {
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef();
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);

	useFrame((state, delta) => {
		ref.current.rotation.y += delta / 4;
	});

	function pickCouncilMember() {
		click(!clicked);
	}

	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh>
			{/* <Disco position={[0,0,0]} scale={0.002}/> */}
			{/* <Dots position={[0, 3, 0]} rotation={[0, Math.PI / -2, 0]} scale={0.02}/> */}
			<mesh
				{...props}
				ref={ref}
				scale={1.25}
				onClick={(event) => pickCouncilMember()}
				onPointerOver={(event) => (
					event.stopPropagation(), hover(true), pickCouncilMember()
				)}
				onPointerOut={(event) => hover(false)}
			>
				<Suspense fallback={null}>
					{/* <Frog position={[0, 0, 0]}/> */}
					{/* <Disco position={[0,2.4,0]} scale={0.0015}/> */}
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
	);
}

//2D Components
function CouncilCard(props) {
	const handleClick = () => {
		// Call the handleMoreDetails function to show the pop-up
		props.onCardClick();
	};
	return (
		<div className="council-card" onClick={handleClick}>
			<Text className="council-card-message">{props.message}</Text>
			<div className="council-card-member">
				{/*  Cannot have 3js elements in a 2d component, so probably redundant?*/}
				<div className="council-card-member-image">
					<Image borderRadius="full" src={props.imagePath} />
				</div>

				<Text className="council-card-member-name">
					The {props.name}
				</Text>
			</div>
		</div>
	);
}

function UserMessage(props) {
	return (
		<div className="user-message-blob">
			<Text className="user-message">{props.message}</Text>
		</div>
	);
}

function MemberMessage(props) {
	return (
		<div className="member-message-blob">
			<Text className="member-message">{props.message}</Text>
		</div>
	);
}

export default function App() {
	const [pageStage, setPageStage] = useState(0);
	const [inputValue, setInputValue] = useState("");
	const [replyValue, setReplyValue] = useState("");
	const [detailsPageBool, setdetailsPageBool] = useState(false);
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [memberName, setMemberName] = useState("");
	const [memberPic, setMemberPic] = useState("");
	const [memberConvo, setMemberConvo] = useState([]);
	const [councilList, setCouncilList] = useState([]);

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

	const enterCouncilSelect = () => {
		setPageStage(3);
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

	const handleMoreDetails = (memberName, index) => {
		setMemberName(memberName);
		setdetailsPageBool(true);
		setMemberConvo(data.members[index].conversation);
		setMemberPic(data.members[index].imagePath);
		console.log(memberName);
		console.log(data.members[index].conversation);
	};

	const handleClose = () => {
		setdetailsPageBool(false);
	};

	const handleCouncilClick = (index) => {
		console.log(index);

		if(councilList.includes(index)){
			setCouncilList(councilList.filter((item) => item !== index));
			return;
		} else if(councilList.length === 4) {
			return;
		} else {
			setCouncilList([...councilList, index]);
		}
		
	};

	const handleCouncilSelect = (index) => {
		console.log(index);
		AIHandler.setCouncilMembers(councilList);
		setPageStage(0);

	};

	const handleDone = () => {
		setPageStage(2);
	};

	const refreshPage = async () => {
		window.location.reload();
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
							<AutoResizeTextarea
								className="prompt-input"
								placeholder="Tell us what's going on"
								minHeight={"32px"}
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

						{/* <Image className="dots-gif" src={DotsGif}/> */}
						{/* <Image className="dots-gif" src={DotsGif} /> */}

						<div className="council-prompt">
							<Button
								size={"sm"}
								className="submit-button"
								colorScheme="teal"
								variant="outline"
								ml={2} // Add margin-left to create space between the input and button
								onClick={enterCouncilSelect} // Call the handleSubmit function on button click
								margin={"1em"}
							>
								Customize your Council
							</Button>
						</div>
						<Text className="homepage-text homepage-text-1">
							"my roommates hate me"
						</Text>
						<Text className="homepage-text homepage-text-2">
							"do I text my ex back"
						</Text>
						<Text className="homepage-text homepage-text-3">
							"how often should I be showering"
						</Text>
						<Text className="homepage-text homepage-text-4">
							"does pineapple go on pizza"
						</Text>
						<Text className="homepage-text homepage-text-5">
							*insert moral dilemma here*
						</Text>
					</div>
				)}
				{/* PAGE STAGE 2 - THE COUNCIL */}
				{pageStage === 1 && (
					<div className="council-content">
						<Text className="council-title">
							The Council says...
						</Text>
						<Text className="council-query-label">You said:</Text>
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
										onCardClick={() =>
											handleMoreDetails(
												councilMember.name,
												index
											)
										}
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
				{/* PAGE STAGE 3 - END STAGE */}
				{pageStage === 2 && (
					<div className="end-content">
						<div className="end-title">
							<Text className="end-h1">
								The Council thanks you!
							</Text>
							<Text className="end-h2">
								Thank you for choosing 
								<span className="endpage-gradient-text">
									The Council
								</span>
								.
							</Text>

							{/* <Text className="homepage-h1">
								Consult
								<span className="homepage-gradient-text">
									the Council.
								</span>
							</Text> */}

							<Text className="end-h2">
								We hope our advice helped.
							</Text>
							<Button
								className="refresh-button"
								id="refresh"
								onClick={refreshPage}
							>
								Ask another question
							</Button>

							<Image className="disco-gif" src={DiscoGif}/>
							<Image className="green-floor" src={GreenFloor}/>
							<Image className="animals" src={Animals}/>
						</div>
					</div>
				)}
				{/* POP UP MORE DETAILS */}
				{detailsPageBool && (
					<div>
						<div className="overlay"></div>
						<div className="pop-up-content">
							<Text className="pop-up-title">
								The {memberName} says...
							</Text>
							<button
								className="close-button"
								onClick={handleClose}
							>
								<span className="close-icon">&times;</span>
							</button>
							<Text className="pop-up-subtitle">
								Here’s what Council Member {memberName} had to
								say so far.
							</Text>
							<div className="pop-up-image-convo">
								<Image
									className="pop-up-image"
									src={memberPic} // Replace with the actual path to your image
									alt="Council Member Image" // Add an appropriate alt text
									boxSize="200px" // Adjust the image size as needed
									objectFit="cover" // Adjust the object fit style as needed
								/>
								<div className="pop-up-convo">
									{memberConvo.map((message, index) => {
										if (index % 2 === 0) {
											// Even index, render UserMessage
											return (
												<UserMessage
													key={index}
													message={message.content}
												/>
											);
										} else {
											// Odd index, render MemberMessage
											return (
												<MemberMessage
													key={index}
													message={message.content}
												/>
											);
										}
									})}
								</div>
							</div>
						</div>
					</div>
				)}
				{/* LOADING STAGE */}
				{isLoading && replyValue === "" && (
					<div className="council-content">
						<Text className="council-title">
							The Council is thinking...
						</Text>
						<Text className="council-query-label">You said:</Text>
						<Text className="council-query">{inputValue}</Text>
						<Image className="dots-gif" src={DotsGif} />
					</div>
				)}
				{isLoading && replyValue !== "" && (
					<div className="council-content">
						<Text className="council-title">
							The Council is thinking...
						</Text>
						<Text className="council-query-label">You said:</Text>
						<Text className="council-query">{replyValue}</Text>
						<Image className="dots-gif" src={DotsGif} />
					</div>
				)}
				{/* PAGE STAGE 3 - COUNCIL SELECT */}
				{pageStage === 3 && !isLoading && (
					<div className="council-select-content">
						<div className="council-select-title">
							<Text className="council-select-h1">
								Choose your Council Members
							</Text>
							<Center>
								<Text className="homepage-gradient-text">
									Choose 4 members for your Council
								</Text>
							</Center>
						</div>
						<Center margin={'1em'}>
							<Wrap spacing='1em' justify='center'> 
							{TrialMembers.map((councilMember, index) => (
								<WrapItem key={index}>
									<Center w='220px' h='280px' bg='blackAlpha.500' className="council-member-portfolio" border={councilList.includes(index)?'8px':'0px'} borderColor={"#9EFD69"} animation={'ease-in'}>
										<div onClick={() => handleCouncilClick(index)}>
											<Image borderRadius="full" src={councilMember.imagePath} padding={'1em'}/>
											<Text><b>{"The " + councilMember.name}</b></Text>
											<Text>{councilMember.type}</Text>
										</div>
									</Center>
								</WrapItem>
							))}
							</Wrap>
						</Center>
						<Button
							className="submit-button"
							colorScheme="teal"
							rightIcon={<AiOutlineCheck />}
							variant="solid"
							ml={2} // Add margin-left to create space between the input and button
							onClick={handleCouncilSelect} // Call the handleSubmit function on button click
						>
							OK
						</Button>
					</div>
				)}
				{pageStage === 0 && (<Canvas
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
						<CouncilTable position={[0,1, 0]} scale={5.0} />
					</group>
				</Canvas>
				)}
			</div>
		</ChakraProvider>
	);
}
