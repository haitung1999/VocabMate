import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Deck} from '../types';

type Props = {
  deck: Deck;
  onPress: () => void;
};

const DeckCard: React.FC<Props> = ({deck, onPress}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.name}>{deck.name}</Text>
    <Text>{deck.words.length} từ</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
});

export default DeckCard;
