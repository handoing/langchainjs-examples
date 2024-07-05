import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";
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
const vectorstore = new MemoryVectorStore(embeddings);
await vectorstore.addDocuments(splitDocs);
const retriever = vectorstore.asRetriever(2)
const res = await retriever.invoke('鲁迅的作品集有哪些')

console.log(res)