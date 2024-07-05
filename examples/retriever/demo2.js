import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { resolve } from 'path'
import E from '../../llm/embedding.js'

const loader = new TextLoader(resolve('data/example.txt'));

const docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 64,
    chunkOverlap: 0,
});

const splitDocs = await splitter.splitDocuments(docs);

const embeddings = E('openai')
const vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);

await vectorStore.save(resolve('data/openai-vec-store'));
