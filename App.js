import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaScreen from './Screen/ListaScreen';
import DetalheScreen from './Screen/DetalheScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#222222' },
          headerTintColor: '#bbb9b9',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Lista"
          component={ListaScreen}
          options={{ title: 'Popcorn Time' }}
        />
        <Stack.Screen
          name="Detalhe"
          component={DetalheScreen}
          options={({ route }) => ({ title: route.params.nome })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
