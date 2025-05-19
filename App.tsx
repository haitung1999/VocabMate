import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DeckListScreen from './screens/DeckListScreen';
import FlashcardScreen from './screens/FlashcardScreen';
import AddWordScreen from './screens/AddWordScreen';
import {RootStackParamList} from './types';
import EditWordScreen from './screens/EditWordScreen';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'VocabMate'}}
        />
        <Stack.Screen
          name="DeckList"
          component={DeckListScreen}
          options={{
            title: 'Danh sách bộ từ',
            headerBackTitle: 'Quay lại',
          }}
        />
        <Stack.Screen
          name="Flashcard"
          component={FlashcardScreen}
          options={{
            title: 'Học Flashcard',
            headerBackTitle: 'Quay lại',
          }}
        />
        <Stack.Screen
          name="AddWord"
          component={AddWordScreen}
          options={{
            title: 'Thêm từ mới',
            headerBackTitle: 'Quay lại',
          }}
        />
        <Stack.Screen
          name="EditWord"
          component={EditWordScreen}
          options={{
            title: 'Sửa từ',
            headerBackTitle: 'Quay lại',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
