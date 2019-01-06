import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Circle from './breathing/Circle';
import Blob from './breathing/Blob';

import Player from './Player';

import KeepAwake from 'react-native-keep-awake';

export default class Breathe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.screenProps.theme,
            mode: 'blob',
            playlist: [
                'Kai_Engel_-_04_-_Moonlight_Reprise.mp3', 'Chris_Zabriskie_-_06_-_That_Kid_in_Fourth_Grade_Who_Really_Liked_the_Denver_Bron' +
                        'cos.mp3'
            ],
            index: 0
        };
    }

    _onPress = () => {
        this.setState({
            mode: this.state.mode === 'blob'
                ? 'circle'
                : 'blob'
        })
    }
    render() {

        return (
            <View
                style={[
                this.state.theme.container, {
                    flexDirection: 'column'
                }
            ]}>
                <TouchableOpacity onPress={this._onPress}>
                    {this.state.mode === 'blob'
                        ? <Blob theme={this.state.theme}/>
                        : <Circle theme={this.state.theme}/>}
                </TouchableOpacity>
                <View
                    style={{
                    position: 'absolute',
                    bottom: 30
                }}>
                    <Player
                        autoplay={true}
                        numberOfLoops={-1}
                        style={{
                        padding: 20
                    }}
                        buttonStyle={this.state.theme.large}
                        ref={"player"}
                        onLongPress={() => {
                        this.setState({
                            index: this.state.index + 1
                        }, () => {
                            this
                                .refs
                                .player
                                .play();
                        })
                    }}
                        audio={this.state.playlist[this.state.index % this.state.playlist.length]}/>
                </View>
                <KeepAwake/>
            </View>
        );
    }
}