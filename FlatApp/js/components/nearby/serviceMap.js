import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  StyleSheet, Image, View, Platform, TouchableOpacity } from 'react-native';

import { Container, Header, Content, Text, Button, Icon, Left, Right, Fab, Body, Thumbnail } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';

import theme from '../../themes/base-theme';
import styles from './styles';

const primary = require('../../themes/variable').brandPrimary;
import { generateMarkerObject } from '../../utils/utilsHelper';

import { MapView } from 'expo';
import { Constants, Location, Permissions } from 'expo';

import { mapDataObject } from './mocker';
const police = require('../../../images/mapIcon/police.png');
const hospital = require('../../../images/mapIcon/hospital.png');
const fire = require('../../../images/mapIcon/fire.png');

class ServiceMap extends Component {
    
      constructor(props) {
        super(props);
        this.state = {
            active: true,
            longitude:0,
            latitude:0,
            accuracy:0,
            errorMessage:'',
            accessToken:'',
            type:'police',
            radius:10000,
            keyword:'metro',
          x: {
                  latitude: 0,
                  longitude: 0,
                },
             markers: [],
        }
      }
    
      componentDidMount() {
        this.setState({
            accessToken: this.props.currentUser.id,
        });
        
        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
            console.log("Yoh yoh yoh I can see the data")
          this._getLocationAsync();
         
        }
      }
//    componentDidMount(){
//        this._updateMapSelectedType();
//    }
//   componentWillReceiveProps(nextProps){
//        this._updateMapSelectedType();
//    }
//    
//    componentDidUpdate(prevProps, prevState){
//       // console.log("prevProps",prevProps);
//       // console.log("prevState",prevState)
//       // setInterval(function(){
//            if(this.props.nearbyState.googlePlaces ===null)
//            if(this.state.latitude!==0 && this.state.longitude!==0)
//               this._updateMapSelectedType();
//       // },2000);
//        
//    }
//    
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
      //let jsonLocation = JSON.stringify(location);
      console.log("jsonLocation",location);
      
    this.setState({ 
        longitude:location.coords.longitude,
        latitude:location.coords.latitude,
        accuracy:location.coords.accuracy,x:{ latitude: location.coords.longitude,
                  longitude: location.coords.latitude}});
      
  };

_updateMapSelectedType(){
    
   return this.props.loadGooglePlacesRequest(this.state.latitude, this.state.longitude, this.state.type, this.state.radius, this.state.keyword)
}

_regionFrom(lat, lon, accuracy) {
    const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
    const circumference = (40075 / 360) * 1000;

    const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
    const lonDelta = (accuracy / oneDegreeOfLongitudeInMeters);

    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta: Math.max(0, latDelta),
      longitudeDelta: Math.max(0, lonDelta)
    };
  }

onMapPress(e){
    console.log("event",e);
}

_updateMapByPolice(){
    this.setState({type:'police'});
    
   return this._updateMapSelectedType();
}
_updateMapByHospital(){
    this.setState({type:'hospital'});
    
   return this._updateMapSelectedType();
}
_updateMapByFireStation(){
    this.setState({type:'fire_station'});
    
   return this._updateMapSelectedType();
}

onRegionChange(region) {
    console.log("region",region)
  this.setState({ region });
}

  render() {
      
      console.log("CurrentUser",this.props.currentUser)
   let googlePlaces = this.props.nearbyState.googlePlaces;
      console.log("googlePlaces",googlePlaces)
      console.log("mapDataObject",mapDataObject)
      
      let markerlist=[]
    if(mapDataObject)  
      markerlist = generateMarkerObject(mapDataObject);
      
      console.log("markerlist",markerlist)

      console.log("State",this.state);
      let regionsObject = this._regionFrom(this.state.latitude,this.state.longitude,this.state.accuracy);
      return(
          <Container>  
      <MapView
          provider={undefined}
                    style={{ flex: 1 }}
                    initialRegion={{
                      latitude: regionsObject.latitude,
                      longitude: regionsObject.longitude,
                      latitudeDelta: regionsObject.latitudeDelta,
                      longitudeDelta: regionsObject.longitudeDelta,
                    }}
           onRegionChange={this.onRegionChange.bind(this)}
          minZoomLevel ={0}
          loadingEnabled = {true}
          mapType={"standard"}
          showsUserLocation={true}
          showsPointsOfInterest={true}
          showsCompass={true}
          showsTraffic={true}
          loadingIndicatorColor={"#606060"} onPress={(e) => this.onMapPress(e)}>
         {googlePlaces !== null && markerlist.map(marker => {
            return(
            <MapView.Marker
              coordinate={marker.LatLng}
              title={marker.details.name}
              description={marker.details.vicinity}
             pinColor={"#990000"}
             image ={marker.details.icon}
            >
                                   
           </MapView.Marker> 
       );
})}
          </MapView>
      <View transparent>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="menu" />
            <Button style={{ backgroundColor: '#34A34F' }} onPress={this._updateMapByPolice(this)}>
              <Icon name="icon-police" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }} onPress={this._updateMapByFireStation(this)}>
              <Icon name="icon-fire" />
            </Button>
            <Button style={{ backgroundColor: '#DD5144' }} onPress={this._updateMapByHospital(this)}>
              <Icon name="icon-hospital" />
            </Button>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }} >
            <Thumbnail source={require('../../../images/contacts/sanket.png')} style={styles.iconPic} />
          </TouchableOpacity>
          </Fab>
       </View>
</Container>  
      );
  }
}


function bindAction(dispatch) {
  return {
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
export default connect(mapStateToProps, bindAction)(ServiceMap);