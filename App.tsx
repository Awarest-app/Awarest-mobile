/////// 헤더 고정

// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import HomeScreen from './src/screens/HomeScreen';
// import AnswerScreen from './src/screens/AnswerScreen';
// import {Header} from './src/components/Header';
// import ProfileScreen from './src/screens/ProfileScreen';
// import ResultScreen from './src/screens/ResultScreen';
// import TabNavigator from './src/components/Bottom';

// const Stack = createNativeStackNavigator();

// export function HomeStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         header: () => <Header />, // 공통 Header 설정
//       }}>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Anwser" component={AnswerScreen} />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//       <Stack.Screen name="Result" component={ResultScreen} />
//     </Stack.Navigator>
//   );
// }

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="MainTabs"
//           component={TabNavigator}
//           options={{headerShown: false}} // 메인 탭의 헤더 숨기기
//         />
//         <Stack.Screen
//           name="Result"
//           component={ResultScreen}
//           options={{
//             header: () => <Header />,
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AnswerScreen from './src/screens/AnswerScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ResultScreen from './src/screens/ResultScreen';
import TabNavigator from './src/components/Bottom';

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anwser"
        component={AnswerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
