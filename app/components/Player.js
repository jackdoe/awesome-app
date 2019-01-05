import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
const Sound = require('react-native-sound');

Sound.setCategory('Playback');

export default class Player extends Component {

    constructor(props) {
        super(props)
        this.state = {};
    }
    componentWillMount() {
        if (this.props.autoplay) {
            this.play();
        }
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

        let url = this.props.audio;
        let player = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }

            player.play();
            player.setNumberOfLoops(this.props.numberOfLoops);
            player.setVolume(1);
        });

        this.setState({player: player, playing: true});
    }

    componentWillUnmount() {
        this.stop();
    }

    stop = () => {
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
    }

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
        var button = this.state.playing
            ? '.'
            : '>';
        var innerView = <Text style={this.props.buttonStyle}>{this.props.text || ''}{button}</Text>

        return (
            <TouchableOpacity
                style={this.props.style}
                onPress={this._startStop}
                onLongPress={this.props.onLongPress}>
                {innerView}
            </TouchableOpacity>
        );
    }
}