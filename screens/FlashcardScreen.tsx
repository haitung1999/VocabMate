/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from 'react';
import {View, Button, ActivityIndicator, FlatList, Alert} from 'react-native';
import {Word} from '../types';

import WordList from '../components/WordList';
import {deleteWordFromDeck, getWordsByDeck} from '../firebase/database';
import {useFocusEffect} from '@react-navigation/native';

const FlashcardScreen = ({route, navigation}: any) => {
  const {deckId} = route.params;
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWords = () => {
    setLoading(true);
    getWordsByDeck(route.params.deckId).then(ws => {
      setWords(ws);
      setLoading(false);
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchWords();
    }, [deckId]),
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!words.length) {
    return (
      <View>
        <Button title="Quay lại" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const handleEdit = (word: Word) => {
    navigation.navigate('EditWord', {
      deckId,
      wordId: word.id,
      categories: [deckId],
    });
  };

  const handleDelete = (word: Word) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa từ này', [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          deleteWordFromDeck(deckId, word.id);
          fetchWords();
        },
      },
    ]);
  };

  return (
    <View>
      <FlatList
        data={words}
        renderItem={({item}) => (
          <WordList word={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        keyExtractor={item => item.id}
      />
      <Button title="Quay lại" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default FlashcardScreen;
