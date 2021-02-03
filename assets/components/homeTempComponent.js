import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Alert, Button } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';

const HomeTemp = (props) => {
    
    const res = props.data
    const navigation = props.navigation

    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');

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
                    <Text style={{fontSize: 15, top: 15, left: 15, color: "#fff" }}>{res.current.weather[0].main}</Text>
                    <View style={styles.container2}>
                        <Text style={ styles.temp }>{naiveRound(res.current.temp, 1)}</Text>
                        <Text style={{top: 10, fontSize: 25, color: "#fff"}}>o</Text>
                        <Text style={{marginTop: 10, fontSize: 18, top: 30, color: "#fff"}}>C</Text>
                    </View>
                    <Text style={{fontSize: 15, top: -10, left: 15, color: "#fff" }}>
                        {timeConverter(res.current.dt).date} {timeConverter(res.current.dt).month_str}  {timeConverter(res.current.dt).year} 
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
                presentationStyle={'overFullScreen'}
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
                                    title="Cancel"
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
    },
    btn : {
        marginHorizontal: 10
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
    }
})

export default HomeTemp;