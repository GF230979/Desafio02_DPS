
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlatilloList from './components/PlatillosList';
import { MaterialIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Platillos Típicos') {
              iconName = focused ? 'restaurant' : 'restaurant-menu';
            } else if (route.name === 'Sopas') {
              iconName = focused ? 'soup-bowl' : 'local-dining';
            } else if (route.name === 'Carnes/Mariscos') {
              iconName = focused ? 'fish' : 'local-grocery-store';
            }

           
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#6200EE',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#eee',
          },
          labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen name="Platillos Típicos" initialParams={{ categoria: 'Plato Tipico' }} component={PlatilloList} />
        <Tab.Screen name="Sopas" initialParams={{ categoria: 'Sopas' }} component={PlatilloList} />
        <Tab.Screen name="Carnes/Mariscos" initialParams={{ categoria: 'Carnes/Mariscos' }} component={PlatilloList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
