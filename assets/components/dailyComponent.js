import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const Daily = (props) => {

    const data = props.data;

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
        </View>
    )
}

const styles = StyleSheet.create({
    daily: {
        marginTop: 5,
        backgroundColor: "transparent",
        borderColor: "transparent"
    }
})

export default Daily;