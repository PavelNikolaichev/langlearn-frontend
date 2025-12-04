import { grammarSchema, type GrammarExercise } from '@/stores/grammar'
import type { Flashcard } from '@/api'
import type { Grammar } from '@/api'
import type { ExerciseGeneratorInterface } from './exerciseGeneratorInterface'
import { OpenAILLMService } from '../llm/openAILLMService'
import type { ResponseFormatJSONSchema } from 'openai/resources'

export class OpenAIExerciseGenerator implements ExerciseGeneratorInterface {
  name = 'OpenAI Exercise Generator'

  private static instance: OpenAIExerciseGenerator
  private textGenerator: OpenAILLMService

  public static getInstance(): OpenAIExerciseGenerator {
    if (!OpenAIExerciseGenerator.instance) {
      OpenAIExerciseGenerator.instance = new OpenAIExerciseGenerator()
    }

    return OpenAIExerciseGenerator.instance
  }

  private constructor() {
    this.textGenerator = OpenAILLMService.getInstance()
  }

  public async generateGrammarExercises(
    grammars: Array<Grammar>,
    vocabulary?: Array<Flashcard>,
    count?: number,
  ): Promise<GrammarExercise[]> {
    const prompt = await this.createPrompt(grammars, vocabulary, count || 5)

    return this.generateExercisesFromPrompt(prompt, grammars, count || 5)
  }

  private async generateExercisesFromPrompt(
    prompt: string,
    grammars: Grammar[],
    count: number,
  ): Promise<GrammarExercise[]> {
    // Why pure JSON instead of zod with helper formatter? - I can add descriptions in here
    const outputSchema: ResponseFormatJSONSchema = {
      type: 'json_schema',
      json_schema: {
        name: 'grammar_exercises',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['fill-blank', 'multiple-choice', 'error-correction'],
                description: 'The type of exercise.',
              },
              question: {
                type: 'string',
                description: 'The exercise question or prompt.',
              },
              options: {
                type: 'array',
                items: { type: 'string' },
                description: 'Options for multiple-choice exercises.',
              },
              correctAnswer: {
                type: 'string',
                description: 'The correct answer to the exercise.',
              },
              explanation: {
                type: 'string',
                description: 'A brief explanation of the grammar point being tested.',
              },
              grammar: {
                type: 'string',
                description: 'The grammar topic being tested.',
              },
              vocabulary: {
                type: 'array',
                items: { type: 'string' },
                description: 'Vocabulary words used in the exercise.',
              },
            },
            required: ['type', 'question', 'correctAnswer', 'explanation', 'grammar'],
          },
        },
        strict: true,
        description: 'A schema for generated grammar exercises',
      },
    }

    const response = await this.textGenerator.getResponse(
      prompt,
      await this.getSystemPrompt(),
      outputSchema,
    )

    return await this.parseResponse(response, count)
  }

  private async parseResponse(response: string, count: number): Promise<GrammarExercise[]> {
    // Additional check for code blocks, if LLM outputs it wrapped in triple backticks. Note, might break if LLM outputs everything as oneliner
    const codeBlockMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (codeBlockMatch) {
      response = codeBlockMatch[1].trim()
    }

    const exercises: GrammarExercise[] = JSON.parse(response)

    console.log('Generated exercises:', exercises)

    const validationResults = exercises.map((exercise) =>
      grammarSchema.safeParse({ ...exercise, id: crypto.randomUUID() }),
    )
    const validExercises = validationResults
      .filter((result) => result.success)
      .map((result) => result.data)

    console.log('Valid exercises:', validExercises)

    return validExercises.slice(0, count)
  }

  private async getSystemPrompt(): Promise<string> {
    return `
    You are a professional language teacher that helps students learn and practice grammar.
    Your task is to create engaging and effective grammar exercises based on the provided topics and vocabulary.
    The requirements are to ensure that the exercises are suitable for the students' proficiency levels and to provide clear instructions and examples.

    ## Input format:
    You will get a list of grammar topics and optional vocabulary words to use in the exercises in the following format:
     - For grammars -\`<grammar_name> - <grammar_description>\`
     - For vocabulary -\`<vocabulary_word> - <vocabulary_definition> - <vocabulary_examples or notes (if any)>\`

    ## Output Format
    You must output only json adhering to the schema provided
    `
  }

  private async createPrompt(
    grammars: Grammar[],
    vocabulary: Flashcard[] | undefined,
    count: number,
  ) {
    return `
    Generate ${count} grammar exercises for the following grammar topics:
    \`\`\`
    ${grammars.map((g) => `${g.name} - ${g.description}`).join('\n')}. ${
      vocabulary
        ? `Incorporate the following vocabulary: ${vocabulary.map((v) => `${v.front} - ${v.back}${v.notes ? ` - ${v.notes}` : ''}`).join(', ')}.`
        : ''
    }
    \`\`\`
    `
  }
}
