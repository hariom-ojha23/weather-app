import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, ImageBackground, Dimensions, Image, PermissionsAndroid } from 'react-native';
import { API_KEY, HOME_URL } from '../src/API';
import HomeTemp from '../components/homeTempComponent';
import Hourly from '../components/hourlyComponent';
import Daily from '../components/dailyComponent';
import Detail from '../components/detailComponent';
import Wind_Pressure from '../components/windandpressureComponent';
import Sunrise_Sunset from '../components/sunriseAndSetComponent';


const Home = ({navigation}) => {

    const [data, setData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;

    console.log("home screen")

    useEffect(() => {

        if (Platform.OS === 'android') {

            const grant = PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

            if (grant) {
                console.log( "You are accessing ACCESS_FINE_LOCATION" )
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        getWeather(position.coords.latitude, position.coords.longitude)
                    },
                    (error) => {
                        console.log("error: ", error)
                        requestLocationPermission()
                    }
                )
            } 
            else {
                console.log( "ACCESS_DENIED" )
                requestLocationPermission()
            }
        }
        else {
            console.log("not android platform")
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    getWeather(position.coords.latitude, position.coords.longitude)
                },
                (error) => {
                    console.log(error)
                }
            )
        }
        // fetch('http://ip-api.com/json/')
        // .then((res) => res.json())
        // .then((data) => getWeather(data.lat, data.lon))
        // .catch((err) => console.log(err))

    },[]);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                title: "Location Request",
                message:
                    "Clima needs access to your location",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            getWeather(position.coords.latitude, position.coords.longitude)
                        },
                        (error) => {
                            console.log("errors: ", error)
                            requestLocationPermission()
                        }
                    )
            }
            else {
                console.log("Location permission denied");
            }
        } catch (err) {
          console.log("err: ", err);
        }
    };

    const getWeather = (lat, lon) => {
        // console.log(`${HOME_URL}lat=${lat}&lon=${lon}&units=metric${API_KEY}`)
        fetch(`${HOME_URL}lat=${lat}&lon=${lon}&units=metric${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            setData(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    const wait = (timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("refreshing");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeather(position.coords.latitude, position.coords.longitude)
            },
            (error) => {
                console.log("error: ", error)
                requestLocationPermission()
            }
        )
    
        wait(2000).then(() => setRefreshing(false));
    }, []);


    return (
        <ScrollView style={{backgroundColor: '#1560bd'}} 
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View>
                {
                    data !== null ?
                    <View style={styles.container}>
                    <ImageBackground source={require('../123.jpg')} style={styles.image}>
                        <View>
                            <HomeTemp data={data} navigation={navigation} />
                            <Hourly data={data} />
                            <Daily data={data} />
                            <Detail data={data} />
                            <Wind_Pressure data={data} />
                            <Sunrise_Sunset data={data} />
                        </View>
                    </ImageBackground>
                    </View>
                    :
                    <View style={[styles.loading, width={width}, height={height}]}>
                        <Image
                            style={{width: 150, height: 150, top: -50}}
                            source={require('../logo.png')}
                        />
                    </View>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    loading : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        flexDirection: "column",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
})

export default Home;