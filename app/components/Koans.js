import React, {Component} from 'react';
import {Text, FlatList, SafeAreaView, View, ScrollView} from 'react-native';

import koansData from './KoansData.json';

class Koan extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={this.props.style.koan_container}>
                <Text style={this.props.style.koan_title}>{this.props.koan.title}</Text>
                <Text style={this.props.style.koan_body}>{this
                        .props
                        .koan
                        .body
                        .replace("\n", "\n\n")}</Text>
            </ScrollView>
        );
    }
}

var getKoan = function () {
    return koansData[Math.floor((Math.random() * koansData.length))];
}

export default class Koans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: props.screenProps.style,
            koans: koansData.map((e, i) => {
                return {
                    key: '' + i,
                    koan: e
                }
            })
        }
    }

    render() {

        return (
            <SafeAreaView style={this.state.style.container}>

                <FlatList
                    data={this.state.koans}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <Koan style={this.state.style} koan={item.koan}/>}/>
            </SafeAreaView>
        );
    }
}