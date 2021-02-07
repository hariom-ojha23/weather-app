import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Card, Icon, Avatar } from 'react-native-elements'
import { API_KEY, URL } from '../src/API';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return{
        favorites : state.favorites.favorites
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
    else {return(<View></View>)}
}

const RenderList = (props) => {

    const info = props.info

    if (info !== []) {
        return(
            <View>
                {
                    info.map((item, i) => (
                        <ListItem key={i} bottomDivider>
                            {/* <Icon name={weatherIcon(item.weather[0].icon)} color="red" type='fontisto' /> */}
                            <ListItem.Content >
                                <ListItem.Title style={styles.ListTitle}>{item}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron size={25} color="blue" onPress={() => props.navigation.navigate('Weather', {name: item})} />
                        </ListItem>
                    ))
                }
            </View>
        )
    }
    else {
        return(
            <View><Text>No city added</Text></View>
        )
    }
}

class Favorite extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return(
            <ScrollView>
                <Card containerStyle={styles.card}>
                    <Card.Title style={styles.Title}>Favorite City</Card.Title>
                    <RenderList info={this.props.favorites} navigation={this.props.navigation} />
                </Card>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    card : {
        borderColor: "transparent",
        marginBottom: 5,
        padding: 0
    },
    Title: {
        padding: 20,
        paddingBottom: 0,
        fontSize: 20,
        margin: 0
    },
    Inner: {
        backgroundColor: "transparent"
    },
    Listcontent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ListTitle: {
        fontSize: 20
    },
    Chevron: {
        fontSize: 20
    }
})

export default connect(mapStateToProps)(Favorite);