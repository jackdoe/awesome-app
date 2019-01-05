import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

export default class Awesome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: this.props.screenProps.style
        };
    }

    render() {
        return (
            <SafeAreaView style={this.state.style.container}>
                <Text style={this.state.style.awesome_title}>You are awesome!</Text>
                <Text style={this.state.style.awesome_text}>How are things going right now?</Text>
                <Text style={this.state.style.awesome_text}>It doesnt fucking matter.</Text>
                <Text style={this.state.style.awesome_text}>Go and have a great day!</Text>
            </SafeAreaView>
        );
    }
}