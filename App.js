import React, { Component } from "react";
import { database } from "./config/firebase";
import { auth } from "./config/firebase";
import { Button, SocialIcon, Text, Icon } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { StackNavigator } from "react-navigation";
import firebase from "./config/firebase";
import WishList from "./components/WishList";
import NameForm from "./components/NameForm";
import ImageUpload from "./components/ImageUpload";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import WishDetail from "./components/WishDetail";
import Edit from "./components/Edit";

class Landing extends Component {
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    try {
      const user = await firebase.auth().onAuthStateChanged();
      if (user) {
        this.props.navigation.navigate("WishList", { user: user, nav: this.props.navigation });
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text h2>genie</Text>
        <Button
          rounded
          buttonStyle={{
            borderColor: "#19B5FE",
            backgroundColor: "#3498DB",
            marginBottom: 10,
          }}
          title="Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <Button
          rounded
          buttonStyle={{
            borderColor: "#19B5FE",
            backgroundColor: "#3498DB",
            marginBottom: 10,
          }}
          title="Sign Up"
          onPress={() => this.props.navigation.navigate("SignUp")}
        />
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  social: {
    padding: 10,
  },
});

export const MainStack = StackNavigator(
  {
    initialRouteName: Landing,
    Landing: {
      screen: Landing,
    },
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
    },
    WishList: {
      screen: WishList,
    },
    ImageUpload: {
      screen: ImageUpload,
    },
    NameForm: {
      screen: NameForm,
    },
    WishDetail: {
      screen: WishDetail,
    },
    Edit: {
      screen: Edit,
    },
  },
  {
    headerMode: "float",
    navigationOptions: {
      headerBackTitle: "Back",
      headerStyle: {
        backgroundColor: "#3498DB",
      },
    },
  },
);
export default class App extends Component {
  render() {
    return <MainStack />;
  }
}
