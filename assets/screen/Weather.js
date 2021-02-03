import React, { useEffect, useState } from 'react';
import { API_KEY, URL, HOME_URL } from '../src/API';
import { Text, View, StyleSheet, ScrollView, ImageBackground, ActivityIndicator, Alert, Dimensions } from 'react-native';
import WeatherTemp from '../components/weatherTempComponent';
import Hourly from '../components/hourlyComponent';
import Daily from '../components/dailyComponent';
import Detail from '../components/detailComponent';
import Wind_Pressure from '../components/windandpressureComponent';
import Sunrise_Sunset from '../components/sunriseAndSetComponent';


const Weather = ({route, navigation}) => {

	const [data, setData] = useState(null);
	const [city, setCity] = useState('');

	const {name} = route.params;
	var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;

	useEffect(() => {
		fetch(`${URL}${name}${API_KEY}`)
		.then((res) => res.json())
		.then((result) => {
			console.log(result.name)
			setCity(result.name)
			getWeather(result.coord.lat, result.coord.lon)
		})
		.catch((error) => { 
			console.log("Error");
			Alert.alert(
				'Not Found', 
				"Invalid City, State, Country or Zip code",
				[
					{ text: "OK", onPress: () => console.log("OK Pressed") }
				],
				{ cancelable: true }
			);
			navigation.navigate('Home')

		})
	}, [])

	const getWeather = (lat, lon) => {

		fetch(`${HOME_URL}lat=${lat}&lon=${lon}&units=metric${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            setData(data)
        })
        .catch((err) => {
            console.log(err)
        })

	}


	return (
        <ScrollView style={styles.container}>
            <View>
                {
					data !== null ?
					<ImageBackground source={require('../weather.jpg')} style={styles.image}>
						<View>
							<WeatherTemp data={data} city={city} />
							<Hourly data={data} />
                            <Daily data={data} />
                            <Detail data={data} />
                            <Wind_Pressure data={data} />
                            <Sunrise_Sunset data={data} />
						</View>
					</ImageBackground>
                    :
                    <View style={[styles.loading, width={width}, height={height}]}>
						<ActivityIndicator size={50} color="yellow" />
                        <Text style={{fontSize: 30, color: "blue"}}></Text>
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
		backgroundColor: '#800080',
		flex: 1,
        flexDirection: "column"
    },
	image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    }
})



export default Weather;