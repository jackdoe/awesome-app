import React, {Component} from 'react';
import {View, Animated, Dimensions} from 'react-native';

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

export default class Circle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(0),
      fade: new Animated.Value(1),
      iter: 0,
      second: 4
    };
  }

  animate(toValue) {
    let delta = 100;
    let a = Animated.parallel([
      Animated.timing(this.state.scale, {
        toValue: toValue,
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
    ]);

    return a;
  }

  componentDidMount() {
    let a = this.animate(1);
    clearInterval(this.timer);
    let seconds = duration / 1000;
    let count = 1;
    a.start();
    let iter = 1;

    this.timer = setInterval(() => {
      let s = count % seconds;
      let currentSecond = 4 - count % seconds;
      let currentIteration = iter % 4;

      if (s == 0) {
        let from = 0;
        let to = 0;

        if (currentIteration == 0) {
          from = 0;
          to = 1;
        } else if (currentIteration == 1) {
          from = 1;
          to = 1;
        } else if (currentIteration == 2) {
          from = 1;
          to = 0;
        } else {
          from = 0;
          to = 0;
        }
        this.setState({
          iter: iter,
          second: currentSecond,
          scale: new Animated.Value(from)
        }, () => {
          let a = this.animate(to);
          a.start();
        });
        iter++;
      } else {
        this.setState({second: currentSecond});
      }
      count++;
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
        outputRange: [this.props.theme.small.color, this.props.theme.container.backgroundColor]
      });
    const scale = this
      .state
      .scale
      .interpolate({
        inputRange: [
          0, 1
        ],
        outputRange: [0, 1.5]
      });

    return (
      <View style={this.props.theme.container}>
        <Animated.View
          style={{
          position: 'absolute',
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2,
          transform: [
            {
              scale: scale
            }
          ]
        }}/>
        <Animated.Text
          style={[
          this.props.theme.small, {
            opacity: this.state.fade
          }
        ]}>
          {v.text}
        </Animated.Text>
      </View>
    );
  }
}

// circle_text: {   padding: 5,   fontSize: theme.FONT_SIZE_MEDIUM, fontWeight:
// theme.FONT_WEIGHT_MEDIUM,   fontFamily: theme.FONT_FAMILY, color:
// theme.PRIMARY_COLOR }, circle_number: {   padding: 5,   fontSize:
// theme.FONT_SIZE_MEDIUM,   fontWeight: theme.FONT_WEIGHT_MEDIUM,   fontFamily:
// theme.FONT_FAMILY,   color: theme.PRIMARY_COLOR,   backgroundColor:
// theme.BACKGROUND_COLOR_LIGHT },