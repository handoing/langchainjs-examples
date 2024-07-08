import 'dotenv/config';
import { ChatOpenAI } from "@langchain/openai";
import { Ollama } from "@langchain/community/llms/ollama";

export default (model, options = {}) => {
    switch (model) {
        case 'openai': {
            return new ChatOpenAI(options)
        }
        case 'ollama': {
            return new Ollama({
                baseUrl: process.env.OLLAMA_BASE_URL,
                model: process.env.OLLAMA_MODEL,
                ...options,
            })
        }
        default: {
            return new ChatOpenAI()
        }
    }
}