import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from '../screens/HomeScreen';
import AddPetScreen from '../screens/AddPetScreen';
import PetListScreen from '../screens/PetListScreen';
import PetDetailsScreen from '../screens/PetDetailsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitleVisible: false,
          headerBackground: () => (
            <LinearGradient
              colors={['#FF512F', '#DD2476']}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        }}
      >

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddPet"
          component={AddPetScreen}
          options={{ title: 'Add New Friend' }}
        />

        <Stack.Screen
          name="PetList"
          component={PetListScreen}
          options={{ title: 'My Pets' }}
        />

        <Stack.Screen
          name="PetDetails"
          component={PetDetailsScreen}
          options={{ title: 'Pet Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;