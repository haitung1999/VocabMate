import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import WordForm from '../components/WordForm';
import {RootStackParamList} from '../types';
import {addWordToDeck, getDecksFromWords} from '../firebase/database';

const AddWordScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'AddWord'>) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDecksFromWords().then(decks => {
      setCategories(decks.map(deck => deck.id));
    });
  }, []);

  const handleAddWord = async (
    term: string,
    meaning: string,
    example: string,
    category: string,
  ) => {
    if (!term || !meaning || !example || !category) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);

    try {
      await addWordToDeck(category, {
        term,
        meaning,
        example,
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm từ');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm từ mới</Text>
      <WordForm onSubmit={handleAddWord} categories={categories} />
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

export default AddWordScreen;
