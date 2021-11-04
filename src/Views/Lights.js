import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Slider, View, Pressable} from 'react-native';
import { Switch } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as theme from '../Theme/theme';
import {Block, Text, PanSlider} from '../Components';
import mocks from '../Theme/settings';
import {
  SliderHuePicker,
  SliderSaturationPicker,
  SliderValuePicker,
} from 'react-native-slider-color-picker';

class Lights extends Component {
  static navigationOptions = {
    headerLeft: ({onPress}) => (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <FontAwesome
          size={theme.sizes.font * 1.5}
          color={theme.colors.black}
          name="arrow-left"
        />
      </TouchableWithoutFeedback>
    ),
    headerLeftContainerStyle: {
      paddingLeft: theme.sizes.base * 2,
    },
    headerStyle: {
      borderBottomColor: 'transparent',
    },
  };

  state = {
    lightsOn: true,
    brightness: 5,
    rgbMode: false,
  };

  renderController() {
    return (
      <Block flex={1} right style={styles.controller}>
        <Block center style={styles.controllerValue}>
          <Text color="white">34</Text>
        </Block>
        <Block flex={0.8} style={[styles.controllerOverlay]} />
      </Block>
    );
  }

  toggleLight = () => {
    console.log(!this.state.lightsOn);
    console.log(this.state.brightness);

    this.setState(state => ({
      lightsOn: !state.lightsOn,
      brightness: (!state.lightsOn? (state.brightness > 0 ? state.brightness : 1) : 0),
    }));
    // TODO: Send request to Raspberry-Pi to toggle lights switch
  }

  updatebrightness = (value) => {
    //console.log(!this.state.lightsOn);
    //console.log(this.state.brightness);

    this.setState(() => ({
      brightness: value,
      lightsOn: value>0? true:false,
    }));
    // TODO: Send request to Raspberry-Pi

  }

  changeColor = (colorHsvOrRgb, resType) => {
    //console.log(colorHsvOrRgb, resType);
    // TODO: Send request to Raspberry-Pi

  }

  changeMode = (mode) => {
    this.setState(() => ({
      rgbMode: mode,
    }));
  }

  render() {
    const {navigation, settings} = this.props;
    const name = navigation.getParam('name');
    const Icon = settings[name].icon;

    return (
      <Block flex={1} style={styles.settings}>
        <Block flex={1} center>
          <Block column>
          <Pressable 
            style={({ pressed }) => [{ backgroundColor: pressed? 'rgb(210, 230, 255)': 'white'}]} 
            onPress={this.toggleLight} title={this.state.lightsOn?'ON':'OFF'}>
              <Icon size={theme.sizes.font * 8} color={this.state.lightsOn?'orange':theme.colors.gray2} />
              <Text style={styles.TextStyle} color={this.state.lightsOn?"green":"red"}>{this.state.lightsOn?'ON':'OFF'}</Text>
          </Pressable> 
            <Text h2 size={42} height={80} weight={'600'} spacing={0.1}>Lights</Text>
          </Block>
        </Block>
        <Block flex={1.5} >
          <Block column style={{marginVertical: theme.sizes.base * 2}}>
            <Block row space="between" style={{paddingBottom:20}}>
              <Text welcome color="black">
                RGB mode:
              </Text>
              <Switch disabled={!this.state.lightsOn} value={this.state.rgbMode} onValueChange={this.changeMode} />
            </Block>
            <Block row space="between">
              <Text welcome color="black">
                Brightness
              </Text>
              <Text welcome color="black">
                {this.state.brightness}
              </Text>
            </Block>
            <Slider
              value={this.state.brightness}
              mininumValue={0}
              maximumValue={9}
              step={1}
              thumbTintColor={theme.colors.accent}
              minimumTrackTintColor={theme.colors.accent}
              maximumTrackTintColor={theme.colors.gray2}
              onValueChange={this.updatebrightness}
            />
            {this.state.lightsOn && this.state.rgbMode && <Block style={{paddingTop:10}}>
              <Text welcome color="black" style={{paddingBottom: 30}}>
                Color
              </Text>
              
              <SliderHuePicker
                enabled={this.state.lightsOn}
                trackStyle={[{height: 12}]}
                thumbStyle={styles.thumb}
                onColorChange={this.changeColor}
              />
            </Block>}
            
          </Block>
        </Block>
      </Block>
    );
  }
}

/* above return statement (colorpicker)
return (
      <Block flex={1} style={styles.settings}>
        <ColorPicker
          onColorSelected={color => alert(`Color selected: ${color}`)}
          style={{flex: 1}}
        />
      </Block>
    );
    */

Lights.defaultProps = {
  settings: mocks,
};

export default Lights;

const styles = StyleSheet.create({
  settings: {
    padding: theme.sizes.base * 2,
  },
  slider: {},
 
  TextStyle:{
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },

  thumb: {
    width: 20,
    height: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop:40,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.35,
},
});
