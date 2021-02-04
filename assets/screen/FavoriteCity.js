import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import { API_KEY, URL, HOME_URL } from '../src/API';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    return{
        favorites : state.favorites
    }
}

const Favourite = ({favorites}) => {

    const [data, setData] = useState([])

    useLayoutEffect(() => {
        favorites.map((item) => {
            fetch(`${URL}${item}${API_KEY}`)
            .then((res) => res.json())
            .then((result) => {
                setData(result)
            })
        })

    }, [])

    const renderFavorite = ({item, index}) => {
        return(
            <ListItem 
            key={index}
            title={item}
            subtitle={data.main.temp}
            onPress={() => navigate('Weather', { city: data.name })}
            />
        )
    }

    return(
        // <FlatList
        //     data={data}
        //     renderItem={renderFavorite}
        //     keyExtractor={item => data.name}
        // />
        <View>
            <Text>Harry</Text>
        </View>
    )
}

export default connect(mapStateToProps)(Favourite);