import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import styles from './SearchScreen.styles';

let articlesAPIUrl = `https://newsapi.org/v2/everything?apiKey=2891d613125844a8a11fa6abbcf138cd`;

export default function SearchResultScreen({navigation, route}) {
  const { searchItem } = route.params;
  console.log(searchItem);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const _getArticles = async () => {
    setLoading(true);
    
    try {
      let articlesReq = await fetch(`${articlesAPIUrl}&q=${searchItem}`);

      const {
        status,
        articles: jsonArticles,
        message,
      } = await articlesReq.json();

      if (status === "ok") {
          console.log(jsonArticles)
        setArticles(jsonArticles);
        setLoading(false);
        return;
      }

      throw new Error(message);
    } catch (error) {
      Alert.alert("Error", error. message);
      setLoading(false);
    }
  };

  useEffect(() => {
      _getArticles();
      return () => {
          setArticles([]);
      };
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3A49"></StatusBar>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' color='#fff'></ActivityIndicator>
            <Text style={{color: '#aaa', fontSize: 22, marginTop: 20}}>Please wait...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#2E3A49"></StatusBar>
    <View style={styles.navbar}>
          <View style={styles.searchContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
            name="back"
            size={24}
            color="#aaa"
            style={styles.searchIcon}
          />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: "#eee" }}>Search Results for {searchItem}</Text>
          </View>
        </View>
        <FlatList
          style={[styles.categoriesList, { marginTop: 10 }]}
          showsHorizontalScrollIndicator={false}
          data={articles}
          keyExtractor={(article) => { article.id = article.title + new Date().getTime().toString(); return article.id }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('View', { url: item.url })} >
            <View
              style={[
                styles.articleContainer,
                {
                  width: "100%",
                  height: null,
                  justifyContent: "center",
                  paddingRight: 20,
                  marginBottom: 20,
                },
              ]}
            >
              <Image
                style={[
                  styles.articleImage,
                  { height: 250, width: "100%", alignSelf: "center" },
                ]}
                source={{
                  uri: item.urlToImage
                    ? item.urlToImage
                    : "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                }}
                resizeMode="cover"
              />
              <View style={styles.articleInfoContainer}>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <View style={styles.articleDetailsContainer}>
                  <Text style={styles.articleTitle}>Author: {item.author}</Text>
                </View>
              </View>
            </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={() => (
              <View style={{paddingHorizontal: 10, paddingVertical: 8, justifyContent: 'center', alignItems: 'center', backgroundColor:'#313D4D'}}>
                <Text style={{fontSize: 12, color: '#aaa'}}>SA News &copy; {new Date().getFullYear()}. Developed By Philane Msibi</Text>
              </View>
          )}
        />
    </SafeAreaView>
  );
}


