import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { MultiQueryRetriever } from "langchain/retrievers/multi_query";
import { resolve } from 'path'
import E from '../embedding.js'
import M from '../model.js'

const model = M('openai')
const embeddings = E('openai')
const vectorstore = await FaissStore.load(resolve('data/openai-vec-store'), embeddings);
const retriever = MultiQueryRetriever.fromLLM({
    llm: model,
    retriever: vectorstore.asRetriever(2),
    queryCount: 3,
    verbose: true,
});
const res = await retriever.invoke('鲁迅的作品集有哪些')

console.log(res)
