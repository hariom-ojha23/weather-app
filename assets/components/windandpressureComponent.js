import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';

const Wind_Pressure = (props) => {

    const data = props.data;

    console.log(data)

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

    return(
        <View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    card : {
        backgroundColor: "transparent",
        borderColor: "transparent",
        marginBottom: 5
    }
})

export default Wind_Pressure;