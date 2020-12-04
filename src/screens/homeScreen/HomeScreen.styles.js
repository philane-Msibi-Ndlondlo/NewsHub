import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: null,
      height: null,
      backgroundColor: "#2E3A49",
      paddingTop: 30,
    },
    searchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#313D4D",
      width: "100%",
      height: 50,
      padding: 10,
      elevation: 1,
    },
    navbar: {
      paddingHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
      width: null,
      height: 50,
    },
    searchInput: {
      color: "#aaa",
      fontSize: 16,
      flexGrow: 1,
      marginLeft: 8,
    },
    searchIcon: {
      alignSelf: "center",
    },
    categoryTitle: {
      marginLeft: 20,
    },
    categoriesList: {
      marginVertical: 20,
    },
    categoriesListItem: {
      color: "#aaa",
      fontSize: 15,
    },
    articleContainer: {
      marginHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
      elevation: 1,
      width: 250,
      backgroundColor: "#313D4D",
    },
    articleImage: {
      width: 240,
      height: 150,
    },
    articleInfoContainer: {
      padding: 10,
    },
    articleTitle: {
      color: "#aaa",
    },
  });

export default styles;