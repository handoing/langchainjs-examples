import 'dotenv/config';
import { ChatOpenAI } from "@langchain/openai";
import { Ollama } from "@langchain/community/llms/ollama";

export default (model) => {
    switch (model) {
        case 'openai': {
            return new ChatOpenAI()
        }
        case 'ollama': {
            return new Ollama({
                baseUrl: process.env.OLLAMA_BASE_URL,
                model: process.env.OLLAMA_MODEL,
            })
        }
        default: {
            return new ChatOpenAI()
        }
    }
}