import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { resolve } from 'path'
import E from '../../llm/embedding.js'
import M from '../../llm/model.js'

const model = M('openai')
const embeddings = E('openai')
const vectorstore = await FaissStore.load(resolve('data/openai-vec-store-large'), embeddings);
const retriever = vectorstore.asRetriever(3)

const TEMPLATE = `
你是鲁迅的老婆，你是一个很了解他的人，没有比你更了解鲁迅的人了。
你在回答时会引用鲁迅简介，并且仅根据简介，尽可能回答用户问题，如果简介中没有相关内容，你可以回答“简介中没有相关内容”，

以下是简介中跟用户回答相关的内容：
{context}

现在，你需要基于简介，回答以下问题：
{question}`;

const prompt = ChatPromptTemplate.fromTemplate(
    TEMPLATE
);

const contextRetriverChain = RunnableSequence.from([
    (input) => input.question,
    retriever,
    (documents) => documents.map((document) => document.pageContent).join("\n")
])

const ragChain = RunnableSequence.from([
    {
        context: contextRetriverChain,
        question: (input) => input.question,
    },
    prompt,
    model,
    new StringOutputParser()
])

const res = await ragChain.invoke({ question: '鲁迅的小说作品有哪些' })

console.log(res)
