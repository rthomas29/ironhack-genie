import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Text, Button, FormLabel, FormInput } from 'react-native-elements';
import MainStack from '../App';
import Modal from 'react-native-modal';
import ImageUpload from './ImageUpload';
import { withNavigation } from 'react-navigation';

export default class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishLength: 0,
      modalVisible: false,
      giftName: '',
      imgUrl: '',
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getImageUrl = this.getImageUrl.bind(this);
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }
  showModal() {
    this.setState({ modalVisible: true });
  }
  closeModal() {
    this.setState({
      modalVisible: false,
      giftName: '',
      imgUrl: '',
    });
  }
  getImageUrl(url) {
    this.setState({ imgUrl: url });
  }
  static navigationOptions = {
    title: 'Wish List',
  };
  goToImageUpload = nav => {
    nav('ImageUpload', { getImageUrl: this.getImageUrl });
    this.setState({ modalVisible: false });
  };
  render() {
    const { params } = this.props.navigation.state;
    const navigation = params ? params.navigation : null;

    if (this.state.wishLength === 0) {
      return (
        <View style={styles.container}>
          <Text>
            {this.state.giftName} and {this.state.imgUrl}
          </Text>
          <Text h4>You don't have any wishes.</Text>
          <Button
            onPress={this.toggleModal}
            buttonStyle={{
              borderColor: '#19B5FE',
              backgroundColor: '#fff',
              borderRadius: 5,
            }}
            textStyle={{
              color: '#000',
            }}
            title="Create new wish"
          />
          <Modal isVisible={this.state.modalVisible} avoidKeyboard={true} swipeDirection="down" style={styles.modal}>
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <FormLabel>Wish Name</FormLabel>
                <FormInput
                  style={{ height: 10, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={text => this.setState({ giftName: text })}
                  editable={true}
                  height={60}
                  value={this.state.giftName}
                  autoFocus={true}
                />
                <Button
                  onPress={() => this.goToImageUpload(navigation)}
                  title="Next"
                  buttonStyle={{
                    backgroundColor: '#fff',
                    borderColor: '#19B5FE',
                    borderRadius: 5,
                  }}
                  textStyle={{
                    color: '#000',
                  }}
                />
              </View>
            </View>
          </Modal>
        </View>
      );
    }
    return <Text>WishList</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#ECF0F1',
  },
});
