import React, {Component} from 'react';
import {Text, Linking, View, SafeAreaView} from 'react-native';
import Player from './Player';

export default class Awesome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: this.props.screenProps.theme
        };
    }

    render() {
        return (
            <SafeAreaView style={this.state.style.container}>
                <Text
                    style={[
                    this.state.style.large, {
                        textAlign: 'left'
                    }
                ]}
                    onPress={() => {
                    Linking.openURL("https://en.wikipedia.org/wiki/Alan_Watts")
                }}>And
                    somehow we think we understand things when we have translated into terms of
                    straight lines and squares. Maybe that’s why they call rather rigid people
                    squares.. But it doesn’t fit nature.
                </Text>
                <Player
                    autoplay={false}
                    numberOfLoops={0}
                    style={{}}
                    buttonStyle={this.state.style.large}
                    text="Alan Watts - Conversation With Myself"
                    audio="conversation_with_myself.mp3"/>
            </SafeAreaView>
        );
    }
}