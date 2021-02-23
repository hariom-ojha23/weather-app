import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';


const mapStateToProps = (state) => {
    return{
        favorites : state.favorites
    }
}


const RenderList = ({favorites, navigation}) => {

    return(
        <View>
            {
                favorites.map((item, i) => (
                    <ListItem key={i} bottomDivider onPress={() => navigation.navigate('Weather', { name: item })}>
                        <ListItem.Content>
                        <ListItem.Title style={styles.Items}>{item}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))
            }
        </View>
    )
}

const Favorite = ({favorites, navigation}) => {

    return(
        <View>
            <Card containerStyle={styles.Card}>
                <Card.Title style={styles.Title}>Favorite Cities</Card.Title>
                <Card.Divider />
                <RenderList favorites={favorites} navigation={navigation} />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    Card: {
        paddingHorizontal: 0,
        paddingBottom: 0,
        marginTop: 30,
    },
    Title: {
        padding: 10,
        fontSize: 20
    },
    Items: {
        fontSize: 20,
        paddingVertical: 7
    }
})

export default connect(mapStateToProps)(Favorite);