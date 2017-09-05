import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  StyleSheet, Image, View, Platform, TouchableOpacity } from 'react-native';

import { Container, Header, Content, Text, Button, Icon, Left, Right, Fab, Body, Form, Thumbnail } from 'native-base';
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
            result:'',
        }
          this._initiateMapNavigation = this._handlePressMapNavigationAsync.bind(this);
          this._initiateCall = this._initiateCall.bind(this);
      }
    
      componentDidMount() {
        this.setState({
            title:this.props.title,
            description:this.props.description,
            currentVicinity: this.props.currentVicinity,
            destinationVicinity:this.props.description,
        });
      }
    _initiateCall(){
        console.log("Intiate a call")
    }
    _initiateMapNavigation(){
        console.log("Intiate a Navigation")
        return this.props.loadGoogleDirectionRequest(this.state.currentVicinity,this.state.destinationVicinity);
    }
    
    _handlePressMapNavigationAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://maps.google.com/?saddr=My%20Location&daddr='+this.state.destinationVicinity);
    this.setState({ result });
  };

  render() {
      
      console.log("currentState",this.state);
      
     
      return(  
          <Image source={require('../../../images/BG-signUp.png')} style={styles.markerCallout} >
              <Content showsVerticalScrollIndicator={false}>
                  <View style={{  alignSelf: 'center',padding:10}}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold'}}>{this.state.title}</Text>
                      <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#FFF'}} note>{this.state.description}</Text>
                  </View>
                    <View style={styles.contentIconsContainer}>
                         <Form>
                          <Grid>
                            <Col>
                               <TouchableOpacity  onPress={this._initiateCall.bind(this)}>
                                  <Button transparent style={styles.roundedButton}>
                                    <Icon name="ios-call-outline" style={{ fontSize: 30, width: 30, color: '#FFF' }} />
                                 </Button>
                               </TouchableOpacity>
                            </Col>
                            <Col>
                               <TouchableOpacity onPress={this._onPressButton} onPress={this._handlePressMapNavigationAsync.bind(this)}>
                                  <Button transparent style={styles.roundedButton} >
                                    <Icon name="ios-arrow-round-up-outline" style={{ fontSize: 30, width: 30, color: '#FFF' }} />
                                  </Button>
                               </TouchableOpacity>
                            </Col>
                          </Grid>
                        </Form>
                    </View>
              </Content>
            </Image>
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