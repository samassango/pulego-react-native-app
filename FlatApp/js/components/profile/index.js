

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
    this.props.loadProfileRequest(this.props.currentUser.id,this.props.currentUser.userId);
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
                <Thumbnail source={require('../../../images/contacts/profilePicture.png')} style={styles.profilePic} />
              </TouchableOpacity>
              <View style={styles.profileInfo}>
                <TouchableOpacity>
                  <Text style={styles.profileUser}>{this.props.profile.profile !==null ? this.props.profile.profile.fullname: ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text note style={styles.profileUserInfo}>Contact no: {this.props.profile.profile !==null ? this.props.profile.profile.mobileno: ''}</Text>
                </TouchableOpacity>
                 <TouchableOpacity>
                  <Text note style={styles.profileUserInfo}>Email address : {this.props.profile.profile !==null ? this.props.profile.profile.email: ''}</Text>
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
    loadProfileRequest: (accessToken, userId) => dispatch(actions.loadProfileRequest(accessToken, userId))
  };
}

const mapStateToProps = state => ({
  currentUser: state.login.currentUser,
  profile: state.profile,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Profile);
