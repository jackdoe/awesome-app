import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  Easing
} from 'react-native';
const {width, height} = Dimensions.get('window');
const size = Math.min(width, height) - 1;
const duration = 4000;
const keep_calm = [
  {
    text: 'inhale'
  }, {
    text: 'hold'
  }, {
    text: 'exhale'
  }, {
    text: 'wait'
  }
];

class Circle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(0),
      fade: new Animated.Value(1),
      iter: 0
    };
  }
  animate() {
    Animated.loop(Animated.sequence([
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: duration
      }),
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: duration
      }),
      Animated.timing(this.state.scale, {
        toValue: 0,
        duration: duration
      }),
      Animated.timing(this.state.scale, {
        toValue: 0,
        duration: duration
      })
    ]), {}).start()

  }

  componentDidMount() {
    this.animate();
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.setState({
        iter: this.state.iter + 1,
        fade: new Animated.Value(0)
      }, () => {
        Animated.sequence([
          Animated.timing(this.state.fade, {
            toValue: 0,
            duration: 200
          }),
          Animated.timing(this.state.fade, {
            toValue: 1,
            duration: 200
          })
        ]).start()
      })

    }, duration)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    let v = keep_calm[this.state.iter % keep_calm.length];
    const color = this
      .state
      .scale
      .interpolate({
        inputRange: [
          0, 1
        ],
        outputRange: ['#bbb', '#fff']
      });

    var text = this
      .state
      .scale
      .interpolate({
        inputRange: [
          0, 1
        ],
        outputRange: ['#000', '#fff']
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
        }}></Animated.View>
        <Animated.Text
          style={{
          fontSize: 30,
          top: 0,
          opacity: this.state.fade,
          fontFamily: 'Menlo',
          color: 'black'
        }}>
          {v.text}
        </Animated.Text>
      </View>
    );
  }
}

class Awesome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          You are awesome!
        </Text>
        <Text style={styles.weather}>
          How are things going right now?
        </Text>
        <Text style={styles.weather}>
          It doesnt fucking matter.
        </Text>
        <Text style={styles.weather}>
          Go and have a great day!
        </Text>

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
    fontFamily: "Menlo",
    textAlign: 'center',
    margin: 40
  },
  weather: {
    fontSize: 20,
    fontFamily: "Menlo",
    textAlign: 'center',
    margin: 10
  }
})

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'awesome'
    }
  }

  _onPress = () => {
    this.setState({
      mode: this.state.mode === 'awesome'
        ? 'calm'
        : 'awesome'
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._onPress}>
          {this.state.mode === 'awesome'
            ? <Awesome/>
            : <Circle/>}
        </TouchableOpacity>
      </View>
    );
  }
}