import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, Modal, Alert, Button, ImageBackground, Dimensions, Image } from 'react-native';
import { API_KEY, HOME_URL } from '../src/API';
import { Card, Icon, SearchBar } from 'react-native-elements';


const Home = ({navigation}) => {

    const [data, setData] = useState(null);
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');

    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeather(position.coords.latitude, position.coords.longitude)
            },
            (error) => {
                console.log(error)
            }
        )
        // fetch('http://ip-api.com/json/')
        // .then((res) => res.json())
        // .then((data) => getWeather(data.lat, data.lon))
        // .catch((err) => console.log(err))

    },[]);

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

    const direction = (data) => {
        if (data != null) {
            if (data >= 0 && data < 11.25) { return "N"}
            else if (data >= 11.25 && data < 33.75 ) { return "NNE"}
            else if (data >= 33.75 && data < 56.25) { return "NE"}
            else if (data >= 56.25 && data < 78.75) { return "ENE"}
            else if (data >= 78.75 && data < 101.25) { return "E"}
            else if (data >= 101.25 && data < 123.75) { return "ESE"}
            else if (data >= 123.75 && data < 146.25) { return "SE"}
            else if (data >= 146.25 && data < 168.75) { return "SSE"}
            else if (data >= 168.75 && data < 191.25) { return "S"}
            else if (data >= 191.25 && data < 213.75) { return "SSW"}
            else if (data >= 213.75 && data < 236.25) { return "SW"}
            else if (data >= 236.25 && data < 258.75) { return "WSW"}
            else if (data >= 258.75 && data < 281.25) { return "W"}
            else if (data >= 281.25 && data < 303.75) { return "WNW"}
            else if (data >= 303.75 && data < 326.25) { return "NW"}
            else if (data >= 326.25 && data < 348.75) { return "NNW"}
            else if (data >= 348.75 && data <= 360) { return "N"}
        }
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


    return (
        <ScrollView style={{backgroundColor: '#1560bd'}}>
            <View>
                {
                    data !== null ?
                    <View style={styles.container}>
                    <ImageBackground source={require('../123.jpg')} style={styles.image}>
                        <View>
                            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <View style={{margin: 10}}>
                                    <Text style={{fontSize: 15, top: 15, left: 15, color: "#fff" }}>{data.current.weather[0].main}</Text>
                                    <View style={styles.container2}>
                                        <Text style={ styles.temp }>{naiveRound(data.current.temp, 1)}</Text>
                                        <Text style={{top: 10, fontSize: 25, color: "#fff"}}>o</Text>
                                        <Text style={{marginTop: 10, fontSize: 18, top: 30, color: "#fff"}}>C</Text>
                                    </View>
                                    <Text style={{fontSize: 15, top: -10, left: 15, color: "#fff" }}>
                                        {timeConverter(data.current.dt).date} {timeConverter(data.current.dt).month_str}  {timeConverter(data.current.dt).year} 
                                    </Text>
                                </View>
                                <View style={{ margin: 20, top: 5, right: 15, display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center"  }}>
                                    <Icon name="search-outline" type="ionicon" size={40} reverse color="#800080" onPress={() => {setVisible(true);}} />
                                    <Text style={{color: "#fff"}}>Search city</Text>
                                </View>
                            </View>

                            <Modal
                                animationType={'slide'}
                                transparent={true}
                                visible={visible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <SearchBar
                                            placeholder="Search City"
                                            onChangeText={setSearch}
                                            value={search}
                                            platform="android"
                                        />
                                        <View style={{display: "flex", flexDirection: 'row'}}>
                                            <View style={styles.btn}>
                                                <Button
                                                    title="Search"
                                                    raised={true}
                                                    onPress={() => {
                                                        setVisible(!visible)
                                                        if (search != '') {
                                                            navigation.navigate('Weather', { name: search })
                                                        }
                                                        else {
                                                            Alert.alert(
                                                                'Error', 
                                                                "Invalid City, State, Country or Zip code",
                                                                [
                                                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                                                ],
                                                                { cancelable: true }
                                                            )
                                                        }
                                                        setSearch('')
                                                    }}
                                                    
                                                />
                                            </View>
                                            <View style={styles.btn}>
                                                <Button
                                                    title="Close"
                                                    onPress={() => {
                                                        setVisible(!visible)
                                                    }}
                                                    style={styles.btn}
                                                    color="red"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            {/* For Hourly Forecast */}
                            <View style={{flex: 1, flexDirection: "row-reverse", marginLeft: 20}}>
                                <Text style={{fontSize: 12, color: "#fff"}}>48 Hours</Text>
                            </View>
                            <Card containerStyle={styles.hourly}>
                                <Card.Title style={{color: "#fff"}}>Hourly Forecast</Card.Title>
                                <Card.Divider />
                                <ScrollView horizontal={true} style={{display: "flex", flexDirection: "row"}}>
                                {
                                    data.hourly.map((item) => {
                                        return(
                                            <View key={item.dt} style={{display: "flex", flexDirection: "column", alignItems: "center", paddingHorizontal: 10}}>
                                                <View style={{display: "flex", flexDirection: "row"}}>
                                                    <Text style={{color: '#fff'}}>{naiveRound(item.temp, 1)}</Text>
                                                    <Text style={{fontSize: 8, color: '#fff'}}>o</Text>
                                                </View>
                                                    <Icon name={weatherIcon(item.weather[0].icon)} type="fontisto" size={20} color="aqua" style={{marginVertical: 10}} />
                                                {/* <Card.Image
                                                    source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}}
                                                    style={{ width: 40, height: 40 }}
                                                /> */}
                                                <Text style={{color: '#fff'}}>{timeConverter(item.dt).time}</Text>
                                            </View>
                                        )
                                    })
                                }
                                </ScrollView>
                            </Card>

                            {/* For Daily Forecast */}
                            
                            <View style={{flex: 1, flexDirection: "row-reverse", marginLeft: 20}}>
                                <Text style={{fontSize: 12, color: "#fff"}}>7 Days</Text>
                            </View>
                            <Card containerStyle={styles.daily}>
                                <Card.Title style={{color: '#fff'}}>Daily Forecast</Card.Title>
                                <Card.Divider />
                                {
                                    data.daily.slice(1).map((item) => {
                                    return (
                                        <View key={item.dt}>
                                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View style={{ display: "flex", flexDirection: "row"}}>
                                                    <View style={{width: 50}}>
                                                        <Text style={{color: '#fff'}}>{timeConverter(item.dt).day}</Text>
                                                        <Text style={{fontSize: 12, color: "#fff"}}>{timeConverter(item.dt).date}/{timeConverter(item.dt).month_int}</Text>
                                                    </View>
                                                    <Card.Image
                                                        source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}}
                                                        style={{ width: 50, height: 50 }}
                                                    />
                                                    <Text style={{ top: 10, color: '#fff'}}>{item.weather[0].description}</Text>
                                                </View>
                                                <View style={{ display: "flex", flexDirection: "row"}}>
                                                    <Text style={{color: '#fff'}}>{item.temp.min}</Text>
                                                    <Text style={{fontSize: 8, color: "#fff"}}>o</Text>
                                                    <Text style={{marginLeft: 2, marginRight: 2, color: "#fff" }}>/</Text>
                                                    <Text style={{color: '#fff'}}>{item.temp.max}</Text>
                                                    <Text style={{fontSize: 8, color: "#fff"}}>o</Text>
                                                </View>
                                            </View>
                                            <Card.Divider/>
                                        </View>
                                    );
                                    })
                                }
                            </Card>

                            {/* For more Details */}

                            <Card containerStyle={styles.card}>
                                <Card.Title style={{color: '#fff'}}>Details</Card.Title>
                                <Card.Divider />
                                <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <View style={{width: "30%", right: 10}}>
                                        <Icon name={weatherIcon(data.current.weather[0].icon)} type="fontisto" size={50} color="aqua" />
                                    </View>
                                    <View style={{width: "70%"}}>
                                        <View style={styles.details}>
                                            <View style={styles.details2}>
                                                <Icon style={styles.icon} name="water-outline" type="ionicon" color="white" />
                                                <Text style={{color: '#fff'}}>Humidity</Text>
                                            </View>
                                            <Text style={{color: '#fff'}}>{data.current.humidity}%</Text>
                                        </View>

                                        <View style={styles.details}>
                                            <View style={styles.details2}>
                                                <Icon style={styles.icon} name="sunny-outline" type="ionicon" color="white" />
                                                <Text style={{color: '#fff'}}>UV Index</Text>
                                            </View>
                                            <Text style={{color: '#fff'}}>{data.current.uvi}</Text>
                                        </View>

                                        <View style={styles.details}>
                                            <View style={styles.details2}>
                                                <Icon style={styles.icon} name="eye-outline" type="ionicon" color="white" />
                                                <Text style={{color: '#fff'}}>Visibility</Text>
                                            </View>
                                            <Text style={{color: '#fff'}}>{data.hourly[0].visibility / 1000} km</Text>
                                        </View>

                                        <View style={styles.details}>
                                            <View style={styles.details2}>
                                                <Icon style={styles.icon} name="thermometer-outline" type="ionicon" color="white" />
                                                <Text style={{color: '#fff'}}>Dew Point</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row"}}>
                                                <Text style={{color: '#fff'}}>{data.current.dew_point}</Text>
                                                <Text style={{fontSize: 8, color: "#fff"}}>o</Text>
                                            </View>
                                        </View>

                                        <View style={styles.details}>
                                            <View style={styles.details2}>
                                                <Icon style={styles.icon} name="cloud-outline" type="ionicon" color="white" />
                                                <Text style={{color: '#fff'}}>Cloud Cover</Text>
                                            </View>
                                            <Text style={{color: '#fff'}}>{data.current.clouds}%</Text>
                                        </View>
                                    </View>
                                </View>
                            </Card>

                            {/* For Wind And Pressure */}

                            <Card containerStyle={styles.card}>
                                <Card.Title style={{color: '#fff'}}>Wind and pressure</Card.Title>
                                <Card.Divider />
                                <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <View style={{ width: "30%"}}>
                                        <Icon
                                        name="wind" 
                                        type="fontisto" 
                                        color="aqua"
                                        size={50}
                                        />
                                    </View>
                                    <View  style={{ width: "40%"}}>
                                        <Text style={{color: '#fff'}}>{direction(data.current.wind_deg)}</Text>
                                        <Text style={{marginVertical: 7, color: "white"}}>{(data.current.wind_speed * 2.23694).toFixed(2)} mph</Text>
                                        <Text style={{color: '#fff'}}>Degree:  {data.current.wind_deg}</Text>
                                    </View>
                                    <Card.Divider />
                                    <View  style={{ width: "30%", display: 'flex', flexDirection: "column", alignItems: "center"  }}>
                                        <Text style={{color: '#fff'}}>Pressure</Text>
                                        <Icon
                                        name="tachometer-alt"
                                        type="font-awesome-5"
                                        size={20}
                                        style={{marginVertical: 7}}
                                        color="white"
                                        />
                                        <Text style={{fontSize: 17, color: "white"}}>{data.current.pressure} mbar</Text>
                                    </View>
                                </View>
                            </Card>

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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    btn : {
        marginHorizontal: 10
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
    },
    daily: {
        marginTop: 5,
        backgroundColor: "transparent",
        borderColor: "transparent"
    },
    hourly: {
        marginBottom: 15,
        marginTop: 5,
        backgroundColor: "transparent",
        borderColor: "transparent"
    }
})

export default Home;