import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Weather from './Weather';
import Home from './Home';
import Favorite from './FavoriteCity';

const Stack = createStackNavigator();

const Title = () => {
    return(
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="day-cloudy" type="fontisto" color="white" />
            <Text style={{ fontSize: 25, color: '#fff', marginHorizontal: 5}}>Clima</Text>
        </View>
    )
}


const HomeNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} 
            options={{
                headerTitle: props => <Title />,
                headerStyle: {
                    backgroundColor: '#5d9bd9',
                },
                headerTitleAlign: 'center',

            }}
            />
            <Stack.Screen name="Weather" component={Weather} 
            options={{
                headerTitle: props => <Title />,
                headerStyle: {
                    backgroundColor: '#5d9bd9',
                },
                headerTintColor: 'white',
                headerRightContainerStyle: {
                    paddingHorizontal: 25
                }
            }}
            />
        </Stack.Navigator>
    )
}

const FavoriteNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Favorite City" component={Favorite} 
            options={{
                headerTitle: props => <Title />,
                headerStyle: {
                    backgroundColor: '#5d9bd9',
                },
                headerTitleAlign: 'center',

            }}
            />
        </Stack.Navigator>
    )
}

export {HomeNavigator, FavoriteNavigator};