
import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Content, Text, Button, Icon, Card, Left, Body, Right, List, ListItem, Thumbnail, Spinner  } from 'native-base';

import { Grid, Col } from 'react-native-easy-grid';
import Swiper from 'react-native-swiper';
import { openDrawer } from '../../actions/drawer';


import styles from './styles';

const deviceWidth = Dimensions.get('window').width;
const headerLogo = require('../../../images/Header-Logo.png');

import { loadNotificationsRequest }  from '../../actions/notificationAction';

class Home extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props){
      super(props);
      this.state ={
          accessToken: this.props.currentUser.id,
      };
  }
componentDidMount(){
    this.props.loadNotificationsRequest(this.state.accessToken)
}


  render() {
      let isLoading = 
      console.log("notifications", this.props.notifications)
      let notificationsListItem = this.props.notifications
      let rowListItems =[];
      if(this.props.notifications.notifications.length > 0){
         rowListItems = this.props.notifications.notifications.map((rowItem)=> renderRowItem(rowItem));
          function renderRowItem(rowItem){
              return(
              <ListItem key={rowItem.id} avatar>
                  <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.story({notificationId:rowItem.id})}>
                  <View style={styles.newsContent}>
                       <Left>
                         <Thumbnail square size={80} source={{ uri:rowItem.image}} />
                       </Left>
                      <Body>
                        <Text style={{color: '#666', fontWeight: 'bold',}}>{rowItem.title}</Text>
                        <Text note>{rowItem.message}</Text>
                      <Right>
                        <Text note>Captured by : {rowItem.sentBy}</Text>
                      </Right>
                      </Body>
                      <Right>
                        <Text note>{new Date(rowItem.datecaptured).toDateString()}</Text>
                      </Right>
      </View>
                   </TouchableOpacity>
                </ListItem>
              );
          }
      }
   
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <Header>
          <Left>
        <Button transparent onPress={() => Actions.channels()}>
              <Icon active name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Image source={headerLogo} style={styles.imageHeader} />
          </Body>
          <Right>
            <Button transparent style={styles.btnHeader} onPress={this.props.openDrawer} >
              <Icon active name="menu" />
            </Button>
          </Right>
        </Header>

        <Content showsVerticalScrollIndicator={false}>
        {this.props.notifications.isLoadingNotifications && <Spinner />}
          <List>
            {rowListItems}
          </List>
          
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    loadNotificationsRequest: (accessToken) => dispatch(loadNotificationsRequest(accessToken)),
  };
}

const mapStateToProps = state => ({
  currentUser: state.login.currentUser,
  notifications: state.notifications,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Home);

//<Card style={{ backgroundColor: '#fff', marginTop: 0, marginRight: 0 }}>
//            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.story()}>
//              <View style={styles.newsContent}>
//                <Text numberOfLines={2} style={styles.newsHeader}>
//                      Flat App is focused on a minimal use of simple elements, typography and flat colors.
//                  </Text>
//                <Grid style={styles.swiperContentBox}>
//                  <Col style={{ flexDirection: 'row' }}>
//                    <TouchableOpacity>
//                      <Text style={styles.newsLink}>CDC</Text>
//                    </TouchableOpacity>
//                    <Icon name="ios-time-outline" style={styles.timeIcon} />
//                    <Text style={styles.newsLink}>1h ago</Text>
//                  </Col>
//                  <Col>
//                    <TouchableOpacity style={styles.newsTypeView}>
//                      <Text style={styles.newsTypeText}>ENVIRONMENT</Text>
//                    </TouchableOpacity>
//                  </Col>
//                </Grid>
//              </View>
//            </TouchableOpacity>
//
//            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.story()}>
//              <View style={styles.newsContent}>
//                <Text numberOfLines={2} style={styles.newsHeader}>
//                      Highly customizable widgets are part of our never ending mission.
//                  </Text>
//                <Grid style={styles.swiperContentBox}>
//                  <Col style={{ flexDirection: 'row' }}>
//                    <TouchableOpacity>
//                      <Text style={styles.newsLink}>SPACE.com</Text>
//                    </TouchableOpacity>
//                    <Icon name="ios-time-outline" style={styles.timeIcon} />
//                    <Text style={styles.newsLink}>5h ago</Text>
//                  </Col>
//                  <Col>
//                    <TouchableOpacity style={styles.newsTypeView}>
//                      <Text style={styles.newsTypeText}>SCIENCE</Text>
//                    </TouchableOpacity>
//                  </Col>
//                </Grid>
//              </View>
//            </TouchableOpacity>
//
//            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.story()}>
//              <View style={styles.newsContent}>
//                <Text numberOfLines={2} style={styles.newsHeader}>
//                      Ready to use components built using NativeBase.
//                  </Text>
//                <Grid style={styles.swiperContentBox}>
//                  <Col style={{ flexDirection: 'row' }}>
//                    <TouchableOpacity>
//                      <Text style={styles.newsLink}>SKY.com</Text>
//                    </TouchableOpacity>
//                    <Icon name="ios-time-outline" style={styles.timeIcon} />
//                    <Text style={styles.newsLink}>2days ago</Text>
//                  </Col>
//                  <Col>
//                    <TouchableOpacity style={styles.newsTypeView}>
//                      <Text style={styles.newsTypeText}>WORLD</Text>
//                    </TouchableOpacity>
//                  </Col>
//                </Grid>
//              </View>
//            </TouchableOpacity>
//
//            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.story()}>
//              <View style={styles.newsContent}>
//                <Text numberOfLines={2} style={styles.newsHeader}>
//                      Theme your app with one single file.
//                  </Text>
//                <Grid style={styles.swiperContentBox}>
//                  <Col style={{ flexDirection: 'row' }}>
//                    <TouchableOpacity>
//                      <Text style={styles.newsLink}>ESPN</Text>
//                    </TouchableOpacity>
//                    <Icon name="ios-time-outline" style={styles.timeIcon} />
//                    <Text style={styles.newsLink}>12days ago</Text>
//                  </Col>
//                  <Col>
//                    <TouchableOpacity style={styles.newsTypeView}>
//                      <Text style={styles.newsTypeText}>SPORTS</Text>
//                    </TouchableOpacity>
//                  </Col>
//                </Grid>
//              </View>
//            </TouchableOpacity>
//
//
//            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.story()}>
//              <View style={styles.newsContent}>
//                <Text numberOfLines={2} style={styles.newsHeader}>
//                      It is easier with Flat App design to quickly convey information while still looking visually appealing and approachable.
//                  </Text>
//                <Grid style={styles.swiperContentBox}>
//                  <Col style={{ flexDirection: 'row' }}>
//                    <TouchableOpacity>
//                      <Text style={styles.newsLink}>ART.com</Text>
//                    </TouchableOpacity>
//                    <Icon name="ios-time-outline" style={styles.timeIcon} />
//                    <Text style={styles.newsLink}>23days ago</Text>
//                  </Col>
//                  <Col>
//                    <TouchableOpacity style={styles.newsTypeView}>
//                      <Text style={styles.newsTypeText}>ART</Text>
//                    </TouchableOpacity>
//                  </Col>
//                </Grid>
//              </View>
//            </TouchableOpacity>
//
//            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.story()}>
//              <View style={styles.newsContent}>
//                <Text numberOfLines={2} style={styles.newsHeader}>
//                      NativeBase builds a layer on top of React Native that provides, basic set of components for mobile application development.
//                  </Text>
//                <Grid style={styles.swiperContentBox}>
//                  <Col style={{ flexDirection: 'row' }}>
//                    <TouchableOpacity>
//                      <Text style={styles.newsLink}>Money.com</Text>
//                    </TouchableOpacity>
//                    <Icon name="ios-time-outline" style={styles.timeIcon} />
//                    <Text style={styles.newsLink}>2months ago</Text>
//                  </Col>
//                  <Col>
//                    <TouchableOpacity style={styles.newsTypeView}>
//                      <Text style={styles.newsTypeText}>FINANCE</Text>
//                    </TouchableOpacity>
//                  </Col>
//                </Grid>
//              </View>
//            </TouchableOpacity>
//          </Card>