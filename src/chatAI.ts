import process from "process";
import OpenAI from "openai";
import * as readline from "readline";
import { config } from "dotenv";
config()

const differentiator: string = "\n\n----------------------------------------\n\n";
const openAIforClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const askChatAI = async (command?: readline.Interface): Promise<void> => {
    const interfaceCommand: readline.Interface = command || readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    interfaceCommand.question("Please enter your question: ", async (question: string) => {
        if (question === "/exit") {
            interfaceCommand.close();
            return;
        }
        console.log("thinking...");
        const response = await openAIforClient.chat.completions.create({
            model:'gpt-4o-mini',
            messages:[
                { role:"user",content:question}
            ]
        });
        console.log("\Answer", response, differentiator);
        askChatAI(interfaceCommand);
    });
}

askChatAI().catch(console.error);