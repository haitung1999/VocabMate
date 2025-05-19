export type Word = {
  id: string;
  term: string;
  meaning: string;
  example: string;
};

export type Deck = {
  id: string;
  name: string;
  words: Word[];
  createdAt: number;
};

export type RootStackParamList = {
  Home: undefined;
  DeckList: undefined;
  Flashcard: {deckId: string};
  AddWord: undefined;
  EditWord: {deckId: string; wordId: string; categories: string[]};
};
