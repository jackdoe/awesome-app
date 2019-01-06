import React, {Component} from 'react';
import {
    Linking,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    View,
    ScrollView
} from 'react-native';
import Player from './Player';

var items = [
    {
        title: 'Breathing Meditation (5 mins)',
        resource: '01_Breathing_Meditation.mp3'
    }, {
        title: 'Breath, Sound, Body Meditation (12 mins)',
        resource: '02_Breath_Sound_Body_Meditation.mp3'
    }, {
        title: 'Complete Meditation Instructions (19 mins)',
        resource: '03_Complete_Meditation_Instructions.mp3'
    }
]
export default class Meditation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoplay: false,
            theme: props.screenProps.theme,
            current: items[0],
            files: items.map((e, i) => {
                return {
                    key: '' + i,
                    item: e
                }
            })
        }
    }

    _renderItem = ({item}) => {
        let e = item.item

        let style = [this.state.theme.small];
        if (this.state.current.resource === e.resource) {
            style = [this.state.theme.small_bold]
        }

        return (
            <TouchableOpacity
                onPress={() => {
                console.log(e);
                this.setState({
                    current: e
                }, () => {
                    this
                        .refs
                        .player
                        .stop();
                    this
                        .refs
                        .player
                        .play();
                })
            }}
                style={this.props.style}>
                <Text style={style}>{e.title}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        var footer = <Player
            autoplay={this.state.autoplay}
            numberOfLoops={0}
            style={{
            alignItems: 'center'
        }}
            buttonStyle={this.state.theme.large}
            ref={"player"}
            audio={this.state.current.resource}/>;

        var header = <Text
            style={this.state.theme.small}
            onPress={() => {
            Linking.openURL("https://www.uclahealth.org/marc/mindful-meditations")
        }}>Downloaded from:{"\n"}https://www.uclahealth.org/marc/mindful-meditations</Text>
        return (
            <SafeAreaView style={this.state.theme.container}>
                <FlatList
                    ListFooterComponent={footer}
                    ListHeaderComponent={header}
                    data={this.state.files}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderItem}/>
            </SafeAreaView>
        )
    }
}
