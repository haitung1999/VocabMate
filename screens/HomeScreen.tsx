/* eslint-disable react-native/no-inline-styles */
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RootStackParamList} from '../types';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation}) => (
  <View style={styles.container}>
    <Text style={styles.title}>VocabMate</Text>
    <TouchableOpacity
      style={[styles.button, {backgroundColor: '#4FC3F7'}]}
      onPress={() => navigation.navigate('DeckList')}>
      <Text style={styles.buttonText}>📚 Danh sách bộ từ</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, {backgroundColor: '#81C784'}]}
      onPress={() => navigation.navigate('AddWord')}>
      <Text style={styles.buttonText}>➕ Thêm bộ từ mới</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 40,
    letterSpacing: 2,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  // image: {
  //   width: 120,
  //   height: 120,
  //   marginBottom: 32,
  // },
});

export default HomeScreen;
