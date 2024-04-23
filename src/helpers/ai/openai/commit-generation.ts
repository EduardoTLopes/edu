import {StringOutputParser} from '@langchain/core/output_parsers'
import {ChatPromptTemplate} from '@langchain/core/prompts'
import {RunnableSequence} from '@langchain/core/runnables'
import {ChatOpenAI} from '@langchain/openai'

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4-turbo',
})

const outputParser = new StringOutputParser()

export async function runLLM(commitDiff: string) {
  const TEMPLATE_STRING = `You are an expert at Creating commit messages. You create commit messages using the karma commit message format.
    Also important is that you don't respond with anything else than the commit message.

    So, based on that please create a commit message for the following diff:
    
    {commitDiff}
    `
  const promptFromMessages = ChatPromptTemplate.fromTemplate(TEMPLATE_STRING)

  const commitMessageGenerationChain = RunnableSequence.from([promptFromMessages, model, outputParser])

  return commitMessageGenerationChain.invoke({commitDiff})
}
