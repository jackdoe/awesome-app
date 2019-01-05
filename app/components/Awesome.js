import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

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
                        textAlign: 'center'
                    }
                ]}>You are awesome!</Text>
                <Text
                    style={[
                    this.state.style.small, {
                        textAlign: 'center'
                    }
                ]}>How are things going right now?</Text>
                <Text
                    style={[
                    this.state.style.small, {
                        textAlign: 'center'
                    }
                ]}>It doesnt fucking matter.</Text>
                <Text
                    style={[
                    this.state.style.small, {
                        textAlign: 'center'
                    }
                ]}>Go and have a great day!</Text>
            </SafeAreaView>
        );
    }
}