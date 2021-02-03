import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Card, Icon } from 'react-native-elements';

const Detail = (props) => {

    const data = props.data;

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
		else {return(<View></View>)}
    }

    return(
        <View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    card : {
        backgroundColor: "transparent",
        borderColor: "transparent",
        marginBottom: 5
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
})

export default Detail;