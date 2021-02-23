import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { HomeNavigator, FavoriteNavigator} from './Stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Favorite') {
                iconName = focused ? 'heart' : 'heart-outline';
              }
  
              return <Icon name={iconName} type="ionicon" size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'white',
            inactiveTintColor: 'black',
            activeBackgroundColor: '#5d9bd9',
            inactiveBackgroundColor: '#5d9bd9'
          }}
        >
            <Tab.Screen name="Home" component={HomeNavigator} />
            <Tab.Screen name="Favorite" component={FavoriteNavigator} />
        </Tab.Navigator>
    )
}

const Main = () => {

    return(
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    )
}

export default Main