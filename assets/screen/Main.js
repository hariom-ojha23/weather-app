import React from 'react';
import Favorite from './FavoriteCity';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './Stack';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
    return(
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <View style={styles.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('../icon.png')}
                            style={styles.drawerImage} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.drawerHeaderText}>Clima</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    )
}

const MyDrawer = () => {
    return(
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
        drawerStyle={{
            backgroundColor: '#d1c4e9'
        }}
        initialRouteName={HomeNavigator} >
            <Drawer.Screen name="Home" component={HomeNavigator} />
            <Drawer.Screen name="Favorite Cities" component={Favorite} />
        </Drawer.Navigator>
    )
}

const Main = () => {
    return(
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        height: 60,
        margin: 10,
        width: 80
    }
});

export default Main;