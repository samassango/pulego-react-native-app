

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, Thumbnail } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';
import { openDrawer } from '../../actions/drawer';

import theme from '../../themes/base-theme';
import styles from './styles';
import * as actions from '../../actions/profileAction';

class Profile extends Component {
componentDidMount(){
    console.log("currentUser",this.props.currentUser);
    this.props.loadProfileRequest(this.props.currentUser.id);
}
  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  render() {
      console.log("profile",this.props.profile)
      
    return (
      <Container>
        <Image source={require('../../../images/glow2.png')} style={styles.container} >
          <HeaderContent />

          <Content showsVerticalScrollIndicator={false}>
            <View style={styles.profileInfoContainer}>
              <TouchableOpacity style={{ alignSelf: 'center' }}>
                <Thumbnail source={require('../../../images/contacts/sanket.png')} style={styles.profilePic} />
              </TouchableOpacity>
              <View style={styles.profileInfo}>
                <TouchableOpacity>
                  <Text style={styles.profileUser}>Kumar Sanket</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text note style={styles.profileUserInfo}>CEO, GeekyAnts</Text>
                </TouchableOpacity>
              </View>
            </View>

          </Content>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    loadProfileRequest: (accessToken) => dispatch(actions.loadProfileRequest(accessToken))
  };
}

const mapStateToProps = state => ({
  currentUser: state.login.currentUser,
  profile: state.profile,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Profile);
