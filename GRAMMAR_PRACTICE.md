# Grammar Practice Mode with AI

The Grammar Practice Mode uses a local AI model to generate personalized grammar exercises based on your selected grammar rules and vocabulary.

## Features

- **Local AI Processing**: Uses Qwen2.5-0.5B-Instruct model running locally in your browser
- **Custom Exercise Generation**: Creates exercises based on your selected grammar rules
- **Vocabulary Integration**: Optionally incorporates words from your flashcard decks
- **Multiple Exercise Types**:
  - Fill-in-the-blank
  - Multiple choice
  - Sentence transformation
  - Error correction
- **Real-time Feedback**: Immediate explanations for correct/incorrect answers
- **Progress Tracking**: Visual progress and scoring

## How to Use

### 1. Setup Phase

1. **Load AI Model**: Click "Load AI Model" to initialize the local language model
2. **Select Grammar Rules**: Choose one or more grammar rules from your grammar sets
3. **Choose Vocabulary** (Optional): Select a flashcard deck to use specific vocabulary
4. **Set Exercise Count**: Choose how many exercises to generate (5-20)
5. **Start Practice**: Click "Start Grammar Practice"

### 2. Practice Phase

1. **Read the Question**: Each exercise shows a grammar question
2. **Provide Your Answer**:
   - Type your answer for fill-in-the-blank, transformation, and error correction
   - Select from multiple choices for multiple choice questions
3. **Submit**: Click "Submit Answer" or press Enter
4. **Review Feedback**: See if you're correct and read the explanation
5. **Continue**: Move to the next exercise

## Exercise Types

### Fill-in-the-Blank

Complete sentences with the missing word based on the grammar rule.
**Example**: "She **\_** to school every day." (Answer: goes)

### Multiple Choice

Choose the correct option from 4 possibilities.
**Example**: Which sentence uses present perfect correctly?

### Transformation

Change a sentence to demonstrate the grammar rule.
**Example**: Transform "I am happy" to past tense. (Answer: I was happy)

### Error Correction

Find and fix grammatical errors in sentences.
**Example**: "I are student" → "I am a student"

## AI Model Details

- **Model**: Qwen2.5-0.5B-Instruct (Quantized)
- **Size**: ~500MB (downloaded once and cached)
- **Performance**: Optimized for mobile and desktop browsers
- **Privacy**: Runs completely locally - no data sent to external servers
- **Fallback**: CPU execution if WebGPU is not available

## Technical Implementation

The practice mode uses:

- **@huggingface/transformers**: For local AI model inference
- **WebGPU/WebAssembly**: For efficient browser-based computation
- **Smart Fallbacks**: Graceful degradation to pre-made exercises if AI fails
- **Caching**: Models cached for offline use after first download

## Performance Tips

- **First Load**: Initial model download may take a few minutes
- **Subsequent Uses**: Model loads from cache in seconds
- **WebGPU**: Better performance on modern browsers with WebGPU support
- **Memory**: Uses ~1-2GB RAM during generation, then releases

## Future Enhancements

- **Difficulty Adaptation**: Exercises get harder/easier based on performance
- **Grammar Explanations**: Detailed grammar rule explanations
- **Voice Exercises**: Speaking practice for pronunciation
- **Custom Exercise Templates**: User-defined exercise patterns
- **Progress Analytics**: Detailed learning progress tracking
