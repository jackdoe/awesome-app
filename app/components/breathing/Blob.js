import React, {Component} from 'react';
import {View, Animated, Image, Dimensions} from 'react-native';

export default class Blob extends Component {
    render() {
        return <Image source={require('./gif/breathe-black.gif')}/>
    }
}