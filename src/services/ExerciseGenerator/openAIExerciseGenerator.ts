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
          type: 'object',
          properties: {
            exercises: {
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
                additionalProperties: false,
              },
            },
          },
          required: ['exercises'],
          additionalProperties: false,
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

    return await this.parseResponse(response, count, grammars)
  }

  private async parseResponse(
    response: string,
    count: number,
    grammars: Grammar[],
  ): Promise<GrammarExercise[]> {
    // Additional check for code blocks, if LLM outputs it wrapped in triple backticks. Note, might break if LLM outputs everything as oneliner
    const codeBlockMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (codeBlockMatch) {
      response = codeBlockMatch[1].trim()
    }

    let parsed: any
    try {
      parsed = JSON.parse(response)
    } catch (e) {
      console.error('Failed to parse JSON response:', e)
      return []
    }

    // Handle both array root and object root with 'exercises' property
    let exercisesRaw: any[] = []
    if (Array.isArray(parsed)) {
      exercisesRaw = parsed
    } else if (parsed.exercises && Array.isArray(parsed.exercises)) {
      exercisesRaw = parsed.exercises
    } else {
      console.warn('Unexpected JSON structure:', parsed)
      return []
    }

    console.log('Generated exercises (raw):', exercisesRaw)

    // Normalize exercises to match schema
    const normalizedExercises = exercisesRaw.map((ex) => {
      // Map 'prompt' to 'question' if needed
      let question = ex.question
      if (!question && ex.prompt) {
        question = ex.prompt
      }

      // Map 'fill-in-the-blank' to 'fill-blank'
      let type = ex.type
      if (type === 'fill-in-the-blank') {
        type = 'fill-blank'
      }

      // Ensure grammar field exists
      let grammar = ex.grammar
      if (!grammar) {
        // Try to find a matching grammar from the input list based on the question or just pick the first one
        grammar = grammars.length > 0 ? grammars[0].name : 'General Grammar'
      }

      return {
        ...ex,
        id: crypto.randomUUID(),
        question,
        type,
        grammar,
      }
    })

    const validationResults = normalizedExercises.map((exercise) =>
      grammarSchema.safeParse(exercise),
    )

    const validExercises = validationResults
      .filter((result) => {
        if (!result.success) {
          console.warn('Validation failed for exercise:', result.error)
        }
        return result.success
      })
      .map((result) => result.data)

    console.log('Valid exercises:', validExercises)

    return validExercises.slice(0, count)
  }

  private async getSystemPrompt(): Promise<string> {
    return `
You are an expert language teacher and linguist specializing in creating high-quality, context-aware grammar exercises.
Your goal is to generate exercises that help students practice specific grammar rules using vocabulary they are currently learning.

## Guidelines:
1. **Target Language**: All exercises (questions, sentences) must be in the target language (the language of the 'Front' of the flashcards).
2. **Contextual Learning**: Use the provided vocabulary words to construct the sentences. Do not introduce complex unknown vocabulary that distracts from the grammar point.
3. **Grammar Focus**: Each exercise must specifically target one of the provided grammar rules.
4. **Variety**: Generate a mix of exercise types (Fill-in-the-blank, Multiple Choice, Error Correction).
5. **Explanations**: Provide clear, concise explanations for the correct answer in the learner's native language (or English if not specified).
6. **Difficulty**: The difficulty should be appropriate for a learner who knows the provided vocabulary but is practicing the grammar.

## Output Format:
You must output a valid JSON object with a single key "exercises" containing an array of exercise objects.
Each exercise object must have the following fields:
- "type": One of "fill-blank", "multiple-choice", "error-correction".
- "question": The exercise question or sentence (use "question", NOT "prompt").
- "correctAnswer": The correct answer string.
- "explanation": Explanation of why the answer is correct.
- "grammar": The name of the grammar rule being tested.
- "options": (Array of strings) Required for "multiple-choice", optional otherwise.
- "vocabulary": (Array of strings) List of vocabulary words used.

Example:
{
  "exercises": [
    {
      "type": "fill-blank",
      "question": "I _____ (to go) to the store.",
      "correctAnswer": "went",
      "explanation": "Past tense of 'go'.",
      "grammar": "Past Simple",
      "vocabulary": ["store"]
    }
  ]
}
    `
  }

  private async createPrompt(
    grammars: Grammar[],
    vocabulary: Flashcard[] | undefined,
    count: number,
  ) {
    const grammarList = grammars.map((g) => `- ${g.name}: ${g.description}`).join('\n')

    let vocabList = 'No specific vocabulary provided. Use common words suitable for A2/B1 level.'
    if (vocabulary && vocabulary.length > 0) {
      vocabList = vocabulary
        .map(
          (v) =>
            `- Front (Target): "${v.front}", Back (Native): "${v.back}"${v.notes ? `, Notes: "${v.notes}"` : ''}`,
        )
        .join('\n')
    }

    return `
Please generate ${count} grammar practice exercises.

### Grammar Rules to Practice:
${grammarList}

### Vocabulary to Use (Context):
${vocabList}

### Instructions:
- Create exactly ${count} exercises.
- Ensure the exercises test the understanding and application of the grammar rules listed above.
- Use the vocabulary words provided in the sentences.
- For "fill-blank" exercises, the blank should correspond to the grammar structure being practiced (e.g., verb conjugation, particle, preposition).
- For "error-correction", provide a sentence with a common mistake related to the grammar rule.
- For "multiple-choice", ensure distractors are plausible but clearly incorrect based on the grammar rule.
    `
  }
}
