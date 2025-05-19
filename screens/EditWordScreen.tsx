import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import WordForm from '../components/WordForm';
import {RootStackParamList, Word} from '../types';
import {getWordsByDeck, updateWordInDeck} from '../firebase/database';

type Props = StackScreenProps<RootStackParamList, 'EditWord'>;

const EditWordScreen: React.FC<Props> = ({route, navigation}) => {
  const {deckId, wordId, categories} = route.params;
  const [word, setWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWordsByDeck(deckId).then(words => {
      const word = words.find(w => w.id === wordId);
      if (word) {
        setWord(word);
        setLoading(false);
      }
    });
  }, [deckId, wordId]);

  const handleEditWord = async (
    term: string,
    meaning: string,
    example: string,
  ) => {
    if (!term || !meaning || !example) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);

    try {
      await updateWordInDeck(deckId, wordId, {
        term,
        meaning,
        example,
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể sửa từ');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !word) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sửa từ</Text>
      <WordForm
        onSubmit={handleEditWord}
        categories={categories}
        initialTerm={word.term}
        initialMeaning={word.meaning}
        initialExample={word.example}
        initialCategory={deckId}
        isEdit
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 16,
    letterSpacing: 1,
  },
});

export default EditWordScreen;
