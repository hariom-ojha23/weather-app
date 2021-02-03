import React, { useState, useEffect } from 'react';
import { 
    Text, View, StyleSheet, ScrollView, RefreshControl, ImageBackground, Dimensions, Image, PermissionsAndroid } from 'react-native';
import { API_KEY, HOME_URL } from '../src/API';
import { Card, Icon } from 'react-native-elements';
import HomeTemp from '../components/homeTempComponent';
import Hourly from '../components/hourlyComponent';
import Daily from '../components/dailyComponent';
import Detail from '../components/detailComponent';
import Wind_Pressure from '../components/windandpressureComponent';


const Home = ({navigation}) => {

    const [data, setData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;


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
        // navigator.geolocation.getCurrentPosition(
        //     (position) => {
        //         getWeather(position.coords.latitude, position.coords.longitude)
        //     },
        //     (error) => {
        //         console.log(error)
        //     }
        // )
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

    const timeConverter = (data) => {
        if (data != null) {
            var a = new Date(data * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            var year = a.getFullYear();
            var month_str = months[a.getMonth()];
            var month_int = a.getMonth() + 1;
            var date = a.getDate();
            var day = days[a.getDay()]
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();

            var time = hour + ':' + min;
            return ({
                time,
                day,
                year,
                month_str,
                month_int,
                date,
                sec
            })
        }
    }

    const weatherIcon = (code) => {
        if (code == "01d") {return ("day-sunny")}
        else if (code == "01n") {return ("night-clear")}
        else if (code == "02d") {return ("day-cloudy")}
        else if (code == "02n") {return ("night-alt-cloudy")}
        else if (code == "03d") {return ("cloudy")}
        else if (code == "03n") {return ("night-alt-cloudy")}
        else if (code == "04d") {return ("cloudy")}
        else if (code == "04n") {return ("night-alt-cloudy")}
		else if (code == "09d" || code == "09n") {return ("rains")}
        else if (code == "10d") {return ("day-rain")}
        else if (code == "10n") {return ("night-alt-rain")}
        else if (code == "11d") {return ("lightning")}
        else if (code == "11n") {return ("night-alt-lightning")}
        else if (code == "13d") {return ("snow")}
        else if (code == "13n") {return ("night-alt-snow")}
		else if (code == "50d" || code == "50n") {return ("fog")}
		else {return(<View><Text>Harry</Text></View>)}
    }


    const naiveRound = (num, decimalPlaces) => {
		var p = Math.pow(10, decimalPlaces);
		return Math.round(num * p) / p;
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

                            {/* For Wind And Pressure */}

                            

                            {/* For SunRise and SunSet */}

                            <Card containerStyle={[styles.card]}>
                                <Card.Title style={{color: "#fff"}}>Sunrise and Sunset</Card.Title>
                                <Card.Divider style={{backgroundColor: '#fff'}} />
                                <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <View style={{ width: "30%"}}>
                                        <Icon
                                        name="day-sunny" 
                                        type="fontisto" 
                                        color="yellow"
                                        size={50}
                                        />
                                    </View>
                                    <View  style={{ width: "70%"}}>
                                        <View>
                                            <View style={styles.details}>
                                                <View style={styles.details2}>
                                                    <Icon style={styles.icon} name="horizon-alt" type="fontisto" color="white" />
                                                    <Text style={{color: '#fff'}}>Sunrise</Text>
                                                </View>
                                                <Text style={{color: '#fff'}}>{timeConverter(data.current.sunrise).time}</Text>
                                            </View>
                                            <View style={styles.details}>
                                                <View style={styles.details2}>
                                                    <Icon style={styles.icon} name="horizon" type="fontisto" color="white" />
                                                    <Text style={{marginVertical: 7, color: "white"}}>sunset</Text>
                                                </View>
                                                <Text style={{color: '#fff'}}>{timeConverter(data.current.sunset).time}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Card>
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
    temp : {
        fontSize : 60,
        color: "#fff",
        fontFamily: "sans-serif-light"
    },
    container: {
        flex: 1,
        flexDirection: "column",
    },
    container2 : {
        display : "flex",
        flexDirection : "row",
        padding: 10
    },
    details: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    details2 : {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center"
    },
    icon : {
        fontSize: 20,
        marginRight: 8,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    card : {
        backgroundColor: "transparent",
        borderColor: "transparent",
        marginBottom: 5
    }
})

export default Home;