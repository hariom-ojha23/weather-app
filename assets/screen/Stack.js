import React from 'react';
import { Icon } from 'react-native-elements';
import Home from './Home';
import Weather from './Weather';
import Favorite from './FavoriteCity';
import { View, Text, StyleSheet } from "react-native";
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
        options={({ navigation }) => ({
            headerTitle: props => <WeatherLogoTitle {...props} />,
            headerStyle: {
                backgroundColor: '#800080',
            },
            headerRightContainerStyle: {
                paddingHorizontal: 25
            }
        })}
        />
      </Stack.Navigator>
    );
}

const FavoriteNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Favorite"
                component={Favorite}
                options={{ 
                    headerTitle: props => <HomeLogoTitle {...props} />,
                    headerStyle: {
                        backgroundColor: '#800080',
                    },
                }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    row: {
        display: 'flex', 
        flexDirection: 'row'
    }
})


export {HomeNavigator, FavoriteNavigator};
