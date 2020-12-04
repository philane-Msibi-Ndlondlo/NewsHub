import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { WebView} from 'react-native-webview';
 
const ViewScreen = ({ route }) => {

    const { url } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <WebView style={styles.container} source={{uri: url }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default ViewScreen
