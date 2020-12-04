
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StatusBar
} from "react-native";

import styles from './SplashScreen.styles';

export default function SplashScreen({navigation}) {
  return (
    <ImageBackground
      source={require("../../../assets/bg.jpg")}
      resizeMode="cover"
      style={styles.ImageContainer}
    >
    <StatusBar barStyle="light-content" backgroundColor="#2E3A49"></StatusBar>
      <View style={styles.overlay}>
        <View style={styles.topView}>
          <Text style={styles.appName}>NewsHUB</Text>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.slogan}>Get the</Text>
          <Text style={styles.slogan}>latest SA News</Text>
          <TouchableOpacity style={styles.getStartedBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.getStartedBtnText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
