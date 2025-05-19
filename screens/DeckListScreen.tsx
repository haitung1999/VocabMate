import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import DeckCard from '../components/DeckCard';
import {Deck} from '../types';
import {getDecksFromWords} from '../firebase/database';

const DeckListScreen = ({navigation}: any) => {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    getDecksFromWords().then(setDecks);
  }, []);

  return (
    <FlatList
      data={decks}
      renderItem={({item}) => (
        <DeckCard
          deck={item}
          onPress={() => navigation.navigate('Flashcard', {deckId: item.id})}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};

export default DeckListScreen;
