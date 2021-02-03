import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';

const Sunrise_Sunset = (props) => {
    
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
    }
})

export default Sunrise_Sunset;