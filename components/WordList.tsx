import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Word} from '../types';

type Props = {
  word: Word;
  onEdit?: (word: Word) => void;
  onDelete?: (word: Word) => void;
};

const WordList: React.FC<Props> = ({word, onEdit, onDelete}) => (
  <View style={styles.container}>
    <View key={word.id} style={styles.card}>
      <Text style={styles.term}>{word.term}</Text>
      <Text style={styles.meaning}>Nghĩa: {word.meaning}</Text>
      <Text style={styles.example}>Ví dụ: {word.example}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => onEdit?.(word)}>
          <Text style={styles.editText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => onDelete?.(word)}>
          <Text style={styles.deleteText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  term: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  meaning: {
    color: '#555',
    marginBottom: 2,
  },
  example: {
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionBtn: {
    marginLeft: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  editText: {color: '#1976D2', fontWeight: 'bold'},
  deleteText: {color: '#E53935', fontWeight: 'bold'},
});

export default WordList;
