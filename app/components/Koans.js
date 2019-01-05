import React, {Component} from 'react';
import {Text, FlatList, SafeAreaView, View, ScrollView} from 'react-native';

import koansData from './KoansData.json';

class Koan extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={this.props.theme.koan_container}>
                <Text
                    style={[
                    this.props.theme.large, {
                        textAlign: 'center'
                    }
                ]}>{this.props.koan.title}</Text>
                <Text style={this.props.theme.small}>{this.props.koan.body}</Text>
            </ScrollView>
        );
    }
}

export default class Koans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: props.screenProps.theme,
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
            <SafeAreaView style={this.state.theme.container}>

                <FlatList
                    data={this.state.koans}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <Koan theme={this.state.theme} koan={item.koan}/>}/>
            </SafeAreaView>
        );
    }
}