import React from 'react';
import Home from './Home';
import Weather from './Weather';
import { View, Text, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeLogoTitle() {
    return (
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="day-cloudy" type="fontisto" color="#fff" style={{marginRight: 5}} />
            <Text style={{fontSize: 20, color: "#fff"}}>Clima</Text>
        </View>
    );
}

function WeatherLogoTitle() {
    return (
        <View>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between"}}>
                <View style={[styles.row]}>
                    <Icon name="day-cloudy" type="fontisto" color="#fff" style={{marginRight: 5}} />
                    <Text style={{fontSize: 20, color: "#fff"}}>Clima</Text>
                </View>
                {/* <View>
                    <Icon name="heart-outline" type="ionicon" size={30} color="#fff" style={{marginRight: 5}} />
                </View> */}
            </View>
        </View>
    );
}

const HomeNavigator = () => {
    return (
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
            headerTitle: props => <HomeLogoTitle {...props} />
        }}
        />
        <Stack.Screen
        name="Weather"
        component={Weather}
        options={{
            headerTitle: props => <WeatherLogoTitle {...props} />,
            headerStyle: {
                backgroundColor: '#800080',
            },
            headerRight: () => (
                <Icon
                  onPress={() => alert('This is a button!')}
                  name="heart-outline" 
                  type="ionicon" size={30} 
                  color="#fff" 
                  style={{marginRight: 5}}
                />
            ),
            headerRightContainerStyle: {
                paddingHorizontal: 25
            }
        }}
        />
      </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    row: {
        display: 'flex', 
        flexDirection: 'row'
    }
})


export default HomeNavigator;