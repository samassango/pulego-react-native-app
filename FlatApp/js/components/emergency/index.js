import React, { Component } from 'react';
import { Image, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import { Container, Content, Text, Icon, List, ListItem, Left, Body, Right, Thumbnail,Item } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';
import HeaderContent from './../headerContent/';

import styles from './styles';

class Emergency extends Component {

  render() {
    return (
      <Container style={styles.bg} >
        <Image source={require('../../../images/glow2.png')} style={styles.container} >
          <HeaderContent />
        <View style={{backgroundColor:"#00cc99", margin:5, marginLeft:5}}>
          <Text style={{color:"#ffffff"}} note>Select to dial any of the following emergency numbers. Normal call rates apply.</Text>
        </View>
          <Content>
      
         <List style={styles.list}>
            <ListItem style={styles.contact} avatar>
              <Left>
                <Thumbnail source={require('../../../images/NewsIcons/pulego-icon/imageedit_9_8004238203.png')} />
              </Left>
              <Body>
                <Text style={styles.contactText}>METRO POLICE - 012 358 7095</Text>
              </Body>
              <Right>
                <Thumbnail source={require('../../../images/NewsIcons/pulego-icon/imageedit_1_7314057037.png')} />
              </Right>
            </ListItem>
            <ListItem style={styles.contact} avatar>
              <Left>
                <Thumbnail source={require('../../../images/NewsIcons/pulego-icon/imageedit_9_8004238203.png')} />
              </Left>
              <Body>
                <Text style={styles.contactText}>METRO POLICE - 012 358 7096</Text>
              </Body>
              <Right>
                <Thumbnail source={require('../../../images/NewsIcons/pulego-icon/imageedit_1_7314057037.png')} />
              </Right>
            </ListItem>
           <ListItem style={styles.contact} avatar>
              <Left>
                <Thumbnail source={require('../../../images/NewsIcons/pulego-icon/imageedit_6_8983319193.png')} />
              </Left>
              <Body>
                <Text style={styles.contactText}>POLICE - 10111</Text>
              </Body>
              <Right>
                <Thumbnail source={require('../../../images/NewsIcons/pulego-icon/imageedit_1_7314057037.png')} />
              </Right>
            </ListItem>
           <ListItem style={styles.contact} avatar>
              <Left>
                <Thumbnail source={require('../../../images/NewsIcons/pulego-icon/imageedit_4_3421122826.png')}  />
              </Left>
              <Body>
                <Text style={styles.contactText}>EMERGENCY SERVICES - 10177</Text>
              </Body>
              <Right>
                <Thumbnail source={require('../../../images/NewsIcons/pulego-icon/imageedit_1_7314057037.png')} />
              </Right>
            </ListItem>
           <ListItem style={styles.contact} avatar>
              <Left>
                <Thumbnail source={require('../../../images/NewsIcons/pulego-icon/imageedit_4_3421122826.png')} />
              </Left>
              <Body>
                <Text style={styles.contactText}>EMERGENCY SERVICES - 012 310 6300</Text>
              </Body>
              <Right>
                <Thumbnail source={require('../../../images/NewsIcons/pulego-icon/imageedit_1_7314057037.png')} />
              </Right>
            </ListItem>
            <ListItem style={styles.contact} avatar>
              <Left>
                <Thumbnail source={require('../../../images/NewsIcons/pulego-icon/imageedit_4_3421122826.png')} />
              </Left>
              <Body>
                <Text style={styles.contactText}>EMERGENCY SERVICES - 012 310 6400</Text>
              </Body>
              <Right>
                <Thumbnail source={require('../../../images/NewsIcons/pulego-icon/imageedit_1_7314057037.png')} />
              </Right>
            </ListItem>
          </List>
          </Content>
        </Image>
      </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer())
    }
}

export default connect(null, bindAction)(Emergency);