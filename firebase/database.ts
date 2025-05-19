import {get, getDatabase, push, ref, remove, set} from 'firebase/database';
import {app} from './config';
import {Deck, Word} from '../types';

const db = getDatabase(app);

export async function getDecksFromWords(): Promise<Deck[]> {
  const snapshot = await get(ref(db, 'words'));

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();

  return Object.keys(data).map(category => ({
    id: category,
    name: category,
    words: Object.values(data[category]).map((w: any) => ({
      id: w.id,
      term: w.word,
      meaning: w.meaning,
      example: w.example,
    })),
    createdAt: Date.now(),
  }));
}

export async function getWordsByDeck(deckId: string): Promise<Word[]> {
  const snapshot = await get(ref(db, `words/${deckId}`));
  if (!snapshot.exists()) {
    return [];
  }
  const data = snapshot.val();
  return Object.values(data).map((w: any) => ({
    id: w.id,
    term: w.word,
    meaning: w.meaning,
    example: w.example,
  }));
}

export async function addWordToDeck(
  deckId: string,
  word: Omit<Word, 'id' | 'remembered'>,
) {
  const newWordRef = push(ref(db, `words/${deckId}`));

  const wordData = {
    id: newWordRef.key,
    word: word.term,
    meaning: word.meaning,
    example: word.example,
  };

  await set(newWordRef, wordData);
}

export async function deleteWordFromDeck(deckId: string, wordId: string) {
  const wordRef = ref(db, `words/${deckId}/${wordId}`);
  await remove(wordRef);
}

export async function updateWordInDeck(
  deckId: string,
  wordId: string,
  data: {term: string; meaning: string; example: string},
) {
  const wordRef = ref(db, `words/${deckId}/${wordId}`);
  const wordData = {
    id: wordId,
    word: data.term,
    meaning: data.meaning,
    example: data.example,
  };
  await set(wordRef, wordData);
}
