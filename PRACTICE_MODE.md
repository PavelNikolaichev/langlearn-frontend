# Flashcard Practice Mode

The following document describes the practice mode. This document is more like a reference document that should be used to describe the features and usage of the practice mode in the application, as well as any future enhancements that could be made to the practice mode.

The practice mode provides an Anki-style learning experience for your flashcard decks.

## Features

- **Card Shuffling**: Cards are randomly shuffled at the start of each practice session
- **Progressive Reveal**: See the question first, then reveal the answer
- **Spaced Repetition Buttons**: Four difficulty levels (Again, Hard, Good, Easy)
- **Keyboard Shortcuts**: For faster practice
- **Progress Tracking**: Visual progress bar and completion status
- **Session Management**: Complete sessions with restart option

## How to Use

1. **Start Practice**: Click the green "Practice" button from any deck detail page
2. **Study Cards**:
   - Read the question/front of the card
   - Think of your answer
   - Click "Show Answer" or press **Space**
3. **Rate Difficulty**:
   - **Again** (1): You didn't know it - review in <1 min
   - **Hard** (2): Difficult - review in 6 min
   - **Good** (3): You knew it - review in 1 day
   - **Easy** (4): Very easy - review in 4 days
4. **Continue**: The session continues until you've gone through all cards

## Keyboard Shortcuts

- **Space**: Reveal answer
- **1**: Mark as "Again"
- **2**: Mark as "Hard"
- **3**: Mark as "Good"
- **4**: Mark as "Easy"

## Future Enhancements

The current implementation provides the basic Anki-style interface. Future versions could include:

- **Spaced Repetition Algorithm**: Implement actual SRS scheduling
- **Statistics**: Track learning progress and retention rates
- **Daily Reviews**: Show cards due for review
- **Custom Study Sessions**: Filter by difficulty, date, etc.
- **Audio Support**: Text-to-speech for language learning
- **Timer**: Track time spent on each card
