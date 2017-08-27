

import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Container, Header, Left, Body, Right, Button, Icon } from 'native-base';
import { openDrawer } from '../../actions/drawer';

import styles from './styles';

import TabOne from './tabOne';
import TabTwo from './tabTwo';
import TabThree from './tabThree';

import CustomTabBar from './CustomTabBar';

const headerLogo = require('../../../images/Header-Logo.png');

import { loadCategoriesRequest } from '../../actions/categoryAction';
import * as actions from '../../actions/profileAction';

class Channels extends Component {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
componentDidMount(){
    console.log("currentUser",this.props.currentUser);
    this.props.loadProfileRequest(this.props.currentUser.id,this.props.currentUser.userId);
}
  render() {
clearInterval();
    return (
      <Container>
        <Header>
          <Left>
        <Button
              transparent
              style={styles.btnHeader}
              onPress={() => Actions.login({ type: ActionConst.RESET  })}
            >
              <Icon active name="power" />
            </Button>
           
          </Left>
          <Body>
            <Image source={headerLogo} style={styles.imageHeader} />
          </Body>
          <Right>
            <Button transparent onPress={this.props.openDrawer} >
              <Icon active name="menu" />
            </Button>
          </Right>
        </Header>
        <View style={styles.bgHead}>
            
          <TabOne tabLabel="Incidents" />
        
        </View>
      </Container>
    );
  }
}

// <Button transparent onPress={() => Actions.pop()}>
//              <Icon active name="arrow-back" />
//            </Button>
//  <ScrollableTabView renderTabBar={() => <CustomTabBar someProp={'here'} />}>
//            <TabOne tabLabel="Incidents" />
//         
//          </ScrollableTabView>
function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    loadProfileRequest: (accessToken, userId) => dispatch(actions.loadProfileRequest(accessToken, userId)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
     currentUser: state.login.currentUser,
});

export default connect(mapStateToProps, bindAction)(Channels);
