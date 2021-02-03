import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const WeatherTemp = (props) => {
    
    const data = props.data;
    const city = props.city;

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

    return(
        <View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{margin: 10}}>
                    <Text style={{fontSize: 15, top: 15, left: 15, color: "#fff" }}>{data.current.weather[0].main}</Text>
                    <View style={styles.container2}>
                        <Text style={ styles.temp }>{naiveRound(data.current.temp, 1)}</Text>
                        <Text style={{top: 10, fontSize: 25, color: "#fff"}}>o</Text>
                        <Text style={{marginTop: 10, fontSize: 18, top: 30, color: "#fff"}}>C</Text>
                    </View>
                    <View style={{ top: -10, display: 'flex', flexDirection: 'row', justifyContent: "space-evenly" }}>
                        <View>
                            <Icon name="angle-dobule-up" type="fontisto" size={15} color="yellow" />
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <Text style={{color: "#fff"}}>{data.daily[0].temp.max}</Text>
                                <Text style={{color: "#fff", fontSize: 8}}>o</Text>
                            </View>
                        </View>
                        <View>
                            <Icon name="angle-dobule-down" type="fontisto" size={15} color="yellow" />
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <Text style={{color: "#fff"}}>{data.daily[0].temp.min}</Text>
                                <Text style={{color: "#fff", fontSize: 8}}>o</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ margin: 20, right: 15, display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
                        <Icon name="location-outline" type="ionicon" color="aqua" size={30} />
                        <View style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
                            <Text style={{fontSize: 21.5, color: "#fff"}}>{city}</Text>
                        </View>
                    <Text style={{color: "#fff"}}>{timeConverter(data.current.dt).date} {timeConverter(data.current.dt).month_str}  {timeConverter(data.current.dt).year}, {timeConverter(data.current.dt).day}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    temp : {
        fontSize : 60,
        color: "#fff",
        fontFamily: "sans-serif-light"
    },
    container2 : {
        display : "flex",
        flexDirection : "row",
        padding: 10
    }
})

export default WeatherTemp;