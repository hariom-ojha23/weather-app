import React, { useEffect, useState, useLayoutEffect } from 'react';
import { API_KEY, URL, HOME_URL } from '../src/API';
import { Text, View, StyleSheet, ScrollView, ImageBackground, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import WeatherTemp from '../components/weatherTempComponent';
import Hourly from '../components/hourlyComponent';
import Daily from '../components/dailyComponent';
import Detail from '../components/detailComponent';
import Wind_Pressure from '../components/windandpressureComponent';
import Sunrise_Sunset from '../components/sunriseAndSetComponent';
import { connect } from 'react-redux';
import { addFavorite, deleteFavorite } from '../redux/ActionCreator';

const mapStateToProps = (state) => {
	return{
		favorites: state.favorites
	}
}

const mapDispatchToProps = (dispatch) => ({
	addFavorite: (obj) => dispatch(addFavorite(obj)),
	deleteFavorite: (obj) => dispatch(deleteFavorite(obj))
})


const Weather = ({route, navigation, favorites, addFavorite, deleteFavorite}) => {

	const [data, setData] = useState(null);
	const [city, setCity] = useState('');

	const AddFavorite = (city) => {
		addFavorite(city)
	}

	const DeleteFavorite = (city) => {
		deleteFavorite(city)
	}


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
			console.log("Error: ", error);
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

	useLayoutEffect(() => {

		const SetIcon = () => {
			if (favorites.favorites.some((el) => el == city)) {
				return(
					<Icon
						onPress={() => DeleteFavorite(city)}
						name="heart"
						type="ionicon" size={30} 
						color="#f00" 
						style={{marginRight: 5}}
					/>
				)
			}
			else {
				return(
					<Icon
						onPress={() => AddFavorite(city)}
						name="heart-outline"
						type="ionicon" size={30} 
						color="#fff" 
						style={{marginRight: 5}}
					/>
				)
			}
		}
	
		navigation.setOptions({
			headerRight: () => (
				<SetIcon />
			),
		})
	})


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



export default connect(mapStateToProps, mapDispatchToProps)(Weather);