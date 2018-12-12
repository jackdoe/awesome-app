import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions, Easing } from 'react-native';
const Sound = require('react-native-sound');
Sound.setCategory('Playback');

class Player extends Component {
	constructor(props) {
		super(props);
		let playlist = [
			'Chris_Zabriskie_-_06_-_That_Kid_in_Fourth_Grade_Who_Really_Liked_the_Denver_Broncos.mp3',
			'Kai_Engel_-_04_-_Moonlight_Reprise.mp3'
		];
		this.state = {
			playlist: playlist,
			index: 0,
			playing: true
		};
	}

	componentDidMount() {
		this.play();
	}
	play = () => {
		if (this.state.player) {
			this.state.player.stop();
			this.state.player.release();
		}

		let url = this.state.playlist[this.state.index % this.state.playlist.length];
		let player = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
			if (error) {
				console.log('failed to load the sound', error);
				return;
			}
			player.play();
			player.setPan(1);
			player.setNumberOfLoops(-1);
			player.setVolume(1);
		});

		this.setState({
			player: player
		});
	};

	current = () => {
		return this.state.playlist[this.state.index];
	};

	_next = () => {
		this.setState(
			{
				index: this.state.index + 1
			},
			() => {
				this.play();
			}
		);
	};

	_startStop = () => {
		let playing = this.state.playing;
		if (playing) {
			this.state.player.stop();
			playing = false;
		} else {
			this.play();
			playing = true;
		}
		this.setState({ playing: playing });
	};

	render() {
		return (
			<View style={{ margin: 5, opacity: 0.5 }}>
				<TouchableOpacity onPress={this._startStop} onLongPress={this._next}>
					<Text>{this.state.playing ? '◼' : '▶'}</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const { width, height } = Dimensions.get('window');
const size = Math.min(width, height) - 1;
const duration = 4000;
const keep_calm = [
	{
		text: 'inhale'
	},
	{
		text: 'hold'
	},
	{
		text: 'exhale'
	},
	{
		text: 'wait'
	}
];

class Circle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scale: new Animated.Value(0),
			fade: new Animated.Value(1),
			iter: 0,
			second: 4
		};
	}
	animate() {
		let delta = 100;
		let a = Animated.loop(
			Animated.sequence([
				Animated.parallel([
					Animated.timing(this.state.scale, {
						toValue: 1,
						duration: duration
					}),
					Animated.sequence([
						Animated.timing(this.state.fade, {
							toValue: 1,
							duration: delta
						}),
						Animated.timing(this.state.fade, {
							toValue: 0,
							duration: duration - delta * 5
						})
					])
				]),
				Animated.parallel([
					Animated.timing(this.state.scale, {
						toValue: 1,
						duration: duration
					}),
					Animated.sequence([
						Animated.timing(this.state.fade, {
							toValue: 1,
							duration: delta
						}),
						Animated.timing(this.state.fade, {
							toValue: 0,
							duration: duration - delta * 5
						})
					])
				]),

				Animated.parallel([
					Animated.timing(this.state.scale, {
						toValue: 0,
						duration: duration
					}),
					Animated.sequence([
						Animated.timing(this.state.fade, {
							toValue: 1,
							duration: delta
						}),
						Animated.timing(this.state.fade, {
							toValue: 0,
							duration: duration - delta * 5
						})
					])
				]),
				Animated.parallel([
					Animated.timing(this.state.scale, {
						toValue: 0,
						duration: duration
					}),
					Animated.sequence([
						Animated.timing(this.state.fade, {
							toValue: 1,
							duration: delta
						}),
						Animated.timing(this.state.fade, {
							toValue: 0,
							duration: duration - delta * 5
						})
					])
				])
			]),
			{}
		);
		return a;
	}

	componentDidMount() {
		let a = this.animate();
		clearInterval(this.timer);
		let seconds = duration / 1000;
		let count = 1;
		a.start();
		this.timer = setInterval(() => {
			if (count % seconds == 0) {
				a.stop();
				this.setState(
					{
						iter: this.state.iter + 1,
						second: 4 - count % seconds
					},
					() => {
						a.start();
					}
				);
			} else {
				this.setState({
					second: 4 - count % seconds
				});
			}
			count++;
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		let v = keep_calm[this.state.iter % keep_calm.length];
		const color = this.state.scale.interpolate({
			inputRange: [ 0, 1 ],
			outputRange: [ '#bbb', '#fff' ]
		});
		const fadeSecond = this.state.fade.interpolate({
			inputRange: [ 0, 1 ],
			outputRange: [ '#ccc', '#000' ]
		});

		return (
			<View style={styles.container}>
				<Animated.View
					style={{
						position: 'absolute',
						backgroundColor: color,
						width: size,
						height: size,
						borderRadius: size / 2,
						transform: [
							{
								scale: this.state.scale
							}
						]
					}}
				/>
				<Animated.Text
					style={{
						fontSize: 30,
						top: 0,
						opacity: this.state.fade,
						fontFamily: 'Menlo',
						color: 'black'
					}}
				>
					{v.text}
				</Animated.Text>
				<Animated.Text
					style={{
						fontSize: 20,
						top: 0,
						fontFamily: 'Menlo',
						color: fadeSecond
					}}
				>
					{this.state.second}
				</Animated.Text>
				<Player />
			</View>
		);
	}
}

class Awesome extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>You are awesome!</Text>
				<Text style={styles.weather}>How are things going right now?</Text>
				<Text style={styles.weather}>It doesnt fucking matter.</Text>
				<Text style={styles.weather}>Go and have a great day!</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff'
	},

	title: {
		fontSize: 40,
		fontFamily: 'Menlo',
		textAlign: 'center',
		margin: 40
	},
	weather: {
		fontSize: 20,
		fontFamily: 'Menlo',
		textAlign: 'center',
		margin: 10
	}
});

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mode: 'awesome'
		};
	}

	_onPress = () => {
		this.setState({
			mode: this.state.mode === 'awesome' ? 'calm' : 'awesome'
		});
	};
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this._onPress}>
					{this.state.mode === 'awesome' ? <Awesome /> : <Circle />}
				</TouchableOpacity>
			</View>
		);
	}
}
