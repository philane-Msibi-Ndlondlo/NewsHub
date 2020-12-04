import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import styles from './HomeScreen.styles';

import { categories } from '../../../config';

let articlesAPIUrl = `https://newsapi.org/v2/top-headlines?country=za&apiKey=2891d613125844a8a11fa6abbcf138cd`;

export default function HomeScreen({navigation}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articleCategory, setArticleCategory] = useState('General');
  const [searchItem, setsearchItem] = useState(null);

  const _getArticles = async () => {
    setLoading(true);
    setsearchItem(null)
    console.log(articleCategory);

    try {
      let articlesReq = await fetch(`${articlesAPIUrl}&category=${articleCategory}`);

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
  }, [articleCategory]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3A49"></StatusBar>
        <View style={styles.navbar}>
          <View style={styles.searchContainer}>
            <AntDesign
              name="search1"
              size={24}
              color="#aaa"
              style={styles.searchIcon}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.searchInput}
              placeholder="Search Here..."
              placeholderTextColor="#aaa"
              value={searchItem}
              onChangeText={(val) => setsearchItem(val)}
              onSubmitEditing={() => {
                _getArticles();
              }}
            />
          </View>
        </View>
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
          <AntDesign
            name="search1"
            size={24}
            color="#aaa"
            style={styles.searchIcon}
          />
          <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.searchInput}
              placeholder="Search Here..."
              placeholderTextColor="#aaa"
              value={searchItem}
              onChangeText={(val) => setsearchItem(val)}
              onSubmitEditing={ async () => {
                navigation.navigate('SearchResults', { searchItem });
                return;
              }}
            />
        </View>
      </View>
      <FlatList
        style={[styles.categoriesList, { maxHeight: 30, marginRight: 10 }]}
        horizontal={true}
        data={categories}
        keyExtractor={(category) => category.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryTitle} onPress={ async () => { await setArticleCategory(item.name.toLowerCase()); return; }}>
            <Text style={styles.categoriesListItem}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <ScrollView style={{ marginTop: 0, alignSelf: "flex-start", flex: 1 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, color: "#eee" }}>Top 5 {articleCategory[0].toUpperCase() + articleCategory.slice(1)} Latest News</Text>
        </View>
        <FlatList
          horizontal={true}
          style={[styles.categoriesList, { maxHeight: 350, marginTop: 5 }]}
          showsVerticalScrollIndicator={false}
          data={articles.slice(0, 5)}
          keyExtractor={(article) => article.title}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('View', { url: item.url })}>
            <View style={styles.articleContainer}>
              <Image
                style={styles.articleImage}
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
        />
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, color: "#eee" }}>Latest News</Text>
        </View>
        <FlatList
          style={[styles.categoriesList, { marginTop: 5 }]}
          showsHorizontalScrollIndicator={false}
          data={articles.slice(5)}
          keyExtractor={(article) => article.title}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('View', { url: item.url })}>
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
      </ScrollView>
    </SafeAreaView>
  );
}
