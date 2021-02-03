import React from 'react';
import Home from './Home';
import Weather from './Weather';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function LogoTitle() {
    return (
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="day-cloudy" type="fontisto" color="#fff" style={{marginRight: 5}} />
            <Text style={{fontSize: 20, color: "#fff"}}>Clima</Text>
        </View>
    );
  }

const Main = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                backgroundColor: '#1560bd',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
                },
            }}
        >
            <Stack.Screen
            name="Home"
            component={Home}
            options={{ 
                headerTitle: props => <LogoTitle {...props} />
            }}
            />
            <Stack.Screen
            name="Weather"
            component={Weather}
            options={{
                title: 'Clima',
                headerStyle: {
                    backgroundColor: '#800080',
                },
                headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center',
                right: 25
                },
        }}
            />
        </Stack.Navigator>
    )
}

export default Main;