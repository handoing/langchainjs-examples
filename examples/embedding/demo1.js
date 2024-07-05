import 'dotenv/config';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { resolve } from 'path'
import E from '../../llm/embedding.js'

const loader = new TextLoader(resolve('data/example.txt'));

const docs = await loader.load();

console.log(docs)

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 64,
    chunkOverlap: 0,
});

const splitDocs = await splitter.splitDocuments(docs);

console.log(splitDocs)

const embeddings = E('ollama');
const res = await embeddings.embedQuery(splitDocs[0].pageContent)

console.log(res)