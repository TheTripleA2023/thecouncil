import OpenAI from "openai";

const model = "gpt-3.5-turbo";

const TrialMembers = [
    {
        name:"The Starfish",
        personality: "Temp",
        objPath: "temp",
        conversation:[]
    },
    {
        name:"The Bear",
        personality: "Temp",
        objPath: "temp",
        conversation:[]
    },
    {
        name:"The Hammerhead",
        personality: "Temp",
        objPath: "temp",
        conversation:[]
    },
    {
        name:"The Tree Frog",
        personality: "Temp",
        objPath: "temp",
        conversation:[]
    },
    {
        name:"The Wolf",
        personality: "Temp",
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
                    messages: [{ role: "system", content: member.personality }, ...member.conversation],
                    model: model,
                });
    
                member.conversation.push({"role": "assistant", "content": verdict.choices[0].message.content});
            });
    
            console.log(this.godJson);
            return "Success"
        } catch (error) {
            console.log(error);
        }
        return "Error";
    }
}