import 'dotenv/config';
import { OpenAIEmbeddings } from "@langchain/openai";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

export default (model) => {
    switch (model) {
        case 'openai': {
            return new OpenAIEmbeddings()
        }
        case 'ollama': {
            return new OllamaEmbeddings({
                baseUrl: process.env.OLLAMA_BASE_URL,
                model: process.env.OLLAMA_MODEL,
            })
        }
        default: {
            return new OpenAIEmbeddings()
        }
    }
}