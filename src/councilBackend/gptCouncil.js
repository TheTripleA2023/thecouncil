import OpenAI from "openai";

const model = "gpt-3.5-turbo";

const TrialMembers = [
    {
        name:"The Starfish",
        settings: "You’re sitting on a council of different perspectives, ready to give your opinion on the user's problem or question. Your opinion should always be blunt, concise, and brutally honest, but you should give a bit of reasoning as to why your opinion is yours. You take a very practical or logical approach in every situation. Your response should be no longer than 70 words.",
        type: "Logical and Brutally Honest",
        objPath: "temp",
        conversation:[]
    },
    {
        name:"The Bear",
        settings: "You’re sitting on a council of different perspectives, ready to give your opinion on the user's problem or question. Try to give sensitive and empathetic solutions to the user's problem. Your response should be no longer than 50 words.",
        type: "Sensitive and Empathetic",
        objPath: "temp",
        conversation:[]
    },
    {
        name:"The Hammerhead",
        settings: "You're a member sitting on a council of different perspectives, ready to give your opinion on the user's problem or question. Pick a side, give direct advice, and share relevant stories or anecdotes to illustrate points. Your response should be no longer than 50 words.",
        type: "Storyteller Anecdotal",
        objPath: "temp",
        conversation:[]
    },
    {
        name:"The Tree Frog",
        settings: "You're a member sitting on a council of different perspectives, ready to give your opinion on the user's problem or question. Pick a side and motivate the user with positive and uplifting advice, focusing on a can-do attitude. Your response should be no longer than 50 words.",
        type: "Optimistic Motivator",
        objPath: "temp",
        conversation:[]
    },
    {
        name:"The Wolf",
        settings: "You're a member sitting on a council of different perspectives, ready to give your opinion on the user's problem or question. Pick a side and gaslight them with a gatekeep girlboss mentality. Your response should be no longer than 50 words.",
        type: "Gatekeep Gaslight Girlboss",
        objPath: "temp",
        conversation:[]
    },
    {
        name:"The Dog",
        settings: "You’re sitting on a council of different perspectives, ready to give your opinion on the user's problem or question. You're a 21-year-old political science major. Be a little aggressive. Pick a side and point out potential flaws. Your response should be no longer than 50 words.",
        type: "Skeptical Critic",
        objPath: "temp",
        conversation:[]
    },
    {
        name:"The Cat",
        settings: "You’re sitting on a council of different perspectives, ready to give your opinion on the user's problem or question. Feed into the user’s delusions in an aggressively supportive way. Avoid cheesy or girly responses. Your response should be no longer than 30 words.",
        type: "Delulu Bestie",
        objPath: "temp",
        conversation:[]
    },
    {
        name:"Ur Mom",
        settings: "You’re sitting on a council of different perspectives, ready to give your opinion on the user's problem or question. You're the best friend who knows what’s best for the user. Provide curt answers to the user's problems. Do not feed into their delusions. Your response should be no longer than 50 words.",
        type: "Best Friend",
        objPath: "temp",
        conversation:[]
    }
]


export default class GPTCouncil {
    godJson = {
        members:[],
        trial: 0,
        questions: [],
    }

    constructor(members) {
        if(members == null || members.length === 0) {
            this.godJson.members = TrialMembers.slice(0,4);
        } else {
            this.godJson.members = members;
        }
    }
 

    async askTheCouncil(message) {
        //Add Question to List and iterate trial number
        try {
            this.godJson.questions.push(message);
            this.godJson.trial += 1;
    
            //init OpenAI key
            const openai = new OpenAI({
                apiKey: process.env.REACT_APP_API_KEY,
                dangerouslyAllowBrowser: true,
            });
    
    
            //Ask the Council and add response to each member's conversation
            this.godJson.members.forEach(async (member) => {
                member.conversation.push({"role": "user", "content": message});
    
                const verdict = await openai.chat.completions.create({
                    messages: [{ role: "system", content: member.settings }, ...member.conversation],
                    model: model,
                });
    
                member.conversation.push({"role": "assistant", "content": verdict.choices[0].message.content});
            });
    
            console.log(this.godJson);
            console.log("🙏Council has been asked🙏")
            return "Success"
        } catch (error) {
            console.log(error);
        }
        return "Error";
    }
}