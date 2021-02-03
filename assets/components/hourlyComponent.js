import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card, Image, Icon } from 'react-native-elements';

const Hourly = (props) => {

    const data = props.data

    const naiveRound = (num, decimalPlaces) => {
		var p = Math.pow(10, decimalPlaces);
		return Math.round(num * p) / p;
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

    return(
        <View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    hourly: {
        marginBottom: 15,
        marginTop: 5,
        backgroundColor: "transparent",
        borderColor: "transparent"
    }
})

export default Hourly;