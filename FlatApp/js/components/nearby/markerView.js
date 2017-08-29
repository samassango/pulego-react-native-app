import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  StyleSheet, Image, View, Platform, TouchableOpacity } from 'react-native';

import { Container, Header, Content, Text, Button, Icon, Left, Right, Fab, Body, Thumbnail } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';
import * as actions from '../../actions/nearbyAction';

import theme from '../../themes/base-theme';
import styles from './styles';

const primary = require('../../themes/variable').brandPrimary;

import { MapView } from 'expo';
import { Constants, Location, Permissions } from 'expo';

class MarkerView extends Component {
    
      constructor(props) {
        super(props);
        this.state = {
            title:'',
            description:'',
            currentVicinity:'',
            destinationVicinity:'',
        }
          this._initiateMapNavigation = this._initiateMapNavigation.bind(this);
      }
    
      componentDidMount() {
        this.setState({
            title:this.props.title,
            description:this.props.description,
        });
      }
    _initiateCall(){
        
    }
    _initiateMapNavigation(){
        return this.props.loadGoogleDirectionRequest(this.state.currentVicinity,this.state.destinationVicinity);
    }

  render() {
      
      console.log("currentVicinity",currentVicinity);
     
      return(
          <View>  
          <Image source={require('../../../images/BG-signUp.png')} style={styles.markerCallout} >
              <Content showsVerticalScrollIndicator={false}>
                  <View style={{  alignSelf: 'center',padding:10}}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold'}}>{this.state.title}</Text>
                      <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#FFF'}} note>{this.state.description}</Text>
                  </View>
                    <View style={styles.contentIconsContainer}>
                          <Grid>
                            <Col>
                              <Button transparent style={styles.roundedButton}>
                                <Icon name="ios-call-outline" style={{ fontSize: 30, width: 30, color: '#FFF' }} />
                              </Button>
                            </Col>
                            <Col>
                              <Button transparent style={styles.roundedButton}>
                                <Icon name="ios-arrow-round-up-outline" style={{ fontSize: 30, width: 30, color: '#FFF' }} />
                              </Button>
                            </Col>
                          </Grid>
                    </View>
              </Content>
            </Image>
          </View>  
      );
  }
}


function bindAction(dispatch) {
  return {
      loadGoogleDirectionRequest:(currentVicinity,destinationVicinity) => dispatch(actions.loadGoogleDirectionRequest(currentVicinity,destinationVicinity)),
  };
}
const mapStateToProps = state => ({
    
});
const mapstyles = StyleSheet.create({
toggleMenuButton: {
    top: 30,
    left: 10,
    width: 50,
    position: 'absolute',
    zIndex: 5,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF3B3F',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 1.0
  }
});
export default connect(mapStateToProps, bindAction)(MarkerView);