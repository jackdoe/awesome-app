import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
const Sound = require('react-native-sound');

Sound.setCategory('Playback');

export default class Player extends Component {
    constructor(props) {
        super(props);
        let playlist = [
            'Kai_Engel_-_04_-_Moonlight_Reprise.mp3', 'Chris_Zabriskie_-_06_-_That_Kid_in_Fourth_Grade_Who_Really_Liked_the_Denver_Bron' +
                    'cos.mp3'
        ];

        this.state = {
            playlist: playlist,
            index: 0,
            playing: true
        };
    }

    componentWillMount() {
        this.play();
    }

    play = () => {
        if (this.state.player) {
            this
                .state
                .player
                .stop();
            this
                .state
                .player
                .release();
        }

        let url = this.state.playlist[this.state.index % this.state.playlist.length];
        let player = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            player.play();
            player.setNumberOfLoops(-1);
            player.setVolume(1);
        });

        this.setState({player: player});
    };

    componentWillUnmount() {
        let playing = this.state.playing;
        if (playing) {
            this.stop();
        }
    }
    current = () => {
        return this.state.playlist[this.state.index];
    };

    stop = () => {
        this
            .state
            .player
            .stop();
    }
    _next = () => {
        this.setState({
            index: this.state.index + 1
        }, () => {
            this.play();
        });
    };

    _startStop = () => {
        let playing = this.state.playing;
        if (playing) {
            this.stop();
            playing = false;
        } else {
            this.play();
            playing = true;
        }
        this.setState({playing: playing});
    };

    render() {
        return (
            <TouchableOpacity
                style={this.props.styles.player_container}
                onPress={this._startStop}
                onLongPress={this._next}>
                <Text style={this.props.styles.player_button}>{this.state.playing
                        ? '◼'
                        : '▶'}</Text>
            </TouchableOpacity>
        );
    }
}