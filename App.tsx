// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AnswerScreen from './src/screens/AnswerScreen';
import {Header} from './src/components/Header';
import ProfileScreen from './src/screens/ProfileScreen';
import ResultScreen from './src/screens/ResultScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{headerShown: false}}> */}
      <Stack.Navigator
        screenOptions={{
          header: () => <Header />, // 커스텀 Header 컴포넌트 설정
          headerTransparent: false, // 헤더 투명 설정 비활성화
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Anwser" component={AnswerScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
