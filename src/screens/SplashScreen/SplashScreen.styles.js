import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: null,
      height: null,
      alignItems: "center",
    },
    ImageContainer: {
      flex: 1,
      width: null,
      height: null,
    },
    topView: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,.7)",
    },
    appName: {
      fontSize: 40,
      fontWeight: "normal",
      color: "#eee",
    },
    bottomView: {
      flex: 0.7,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    slogan: {
      fontSize: 40,
      alignSelf: "flex-start",
      color: "#ccc",
    },
    getStartedBtn: {
      backgroundColor: '#fff',
      position: 'absolute',
      bottom: 30,
      paddingHorizontal: 60,
      paddingVertical: 16,
      borderRadius: 40,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    getStartedBtnText: {
      fontSize: 20,
    }
  });

export default styles;