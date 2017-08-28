
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  StyleSheet, Image, View, Platform, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Text, Button, Icon, Left, Right, Body, Thumbnail, Fab, Toast, Spinner } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';

import { Actions, ActionConst } from 'react-native-router-flux';

import theme from '../../themes/base-theme';
import styles from './styles';

const primary = require('../../themes/variable').brandPrimary;

import { MapView,  Constants, Location, Permissions  } from 'expo';

import { generateMarkerObject } from '../../utils/utilsHelper';

import { mapDataObject } from './mocker';

import * as actions from '../../actions/nearbyAction';

import MarkerView from './markerView';

const police = require('../../../images/mapIcon/police.png');
const hospital = require('../../../images/mapIcon/hospital.png');
const fire = require('../../../images/mapIcon/fire.png');

const stylesMap = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 50,
    justifyContent: 'flex-end'
  },
  map: {
     ...StyleSheet.absoluteFillObject,
  },
});

class Nearby extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            locationIsUpdated:false,
            active: true,
            longitude:0,
            latitude:0,
            accuracy:0,
            errorMessage:'',
            accessToken:'',
            type:'police',
            radius:10000,
            keyword:'metro',
             markers: [],
            region:null,
            accessToken:'',
        }
        
        this._moveBackButton_ClickEvent = this._moveBackOnClick.bind(this);
      }
    
   componentDidMount() {
       console.log(" componentDidMount",this.props.currentUser);
       let access_token = this.props.currentUser.currentUser.id;
       this.setState({
            accessToken: access_token,
        });
       const context = this;
       const locIsUpdated = this.state.locationIsUpdated;
       const locationAsync =  this._getLocationAsync;
       const updateMap = this._updateMapSelectedType
       const places = this.props.nearbyState.googlePlaces
       console.log("locIsUpdated",locIsUpdated)
      setInterval(function(){
          context.props.nearbyState.statusRequest
           if(!context.state.locationIsUpdated){
            if (Platform.OS === 'android' && !Constants.isDevice) {
              context.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
              });
            } else {
                //load the user's current location.
             locationAsync();

            }
        }else{
            console.log("stateInter",context.state)
            if(context.state.latitude !==0){
                if(context.props.nearbyState.googlePlaces === null){
                   updateMap(context);
                }else{
                    context.setState({
                        markers: places,
                    });
                }
            }
         
        }
          if(context.props.nearbyState.statusRequest=== "active"){
              clearInterval();
          }
          
           console.log("setInterval",context.state);
      },3000);
       
      }
    componentWillReceiveProps(nextProps){
        console.log("nextProps",nextProps)
    }
//    componentDidUpdate(){
//     const locIsUpdated = this.state.locationIsUpdated;
//        const context = this;
//       const locationAsync =  this._getLocationAsync;
//       const updateMap = this._updateMapSelectedType
//       const places = this.props.nearbyState.googlePlaces
//       console.log("locIsUpdated",locIsUpdated)
//      setInterval(function(){
//           if(!locIsUpdated){
//            if (Platform.OS === 'android' && !Constants.isDevice) {
//              context.setState({
//                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
//              });
//            } else {
//                //load the user's current location.
//             locationAsync();
//
//            }
//        }else{
//            if(context.state.latitude !==0){
//                if(context.props.nearbyState.googlePlaces === null){
//                   updateMap(context);
//                }else{
//                    context.setState({
//                        markers: places,
//                    });
//                }
//            }
//         
//        }
//           console.log("setInterval",context.state);
//      },300);
//   }
    
     _getLocationAsync = async () => {
         console.log("_getLocationAsync");
           this.setState({ 
            locationIsUpdated:true});
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
            accuracy:location.coords.accuracy});
 

  };
    
_updateMapSelectedType(context){
    clearInterval();
    console.log("stateUpdate",this.state)
   return (context.state.latitude !== undefined) ?context.props.loadGooglePlacesRequest(context.state.latitude, context.state.longitude, context.state.type, context.state.radius , context.state.keyword): '';
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
    this.setState({type:'police',keyword:'metro'});
    
   return this._updateMapSelectedType(this);
}
_updateMapByHospital(){
    this.setState({type:'hospital',keyword:'hospital'});
    
   return this._updateMapSelectedType(this);
}
_updateMapByFireStation(){
    this.setState({type:'fire_station',keyword:'fi'});
    
   return this._updateMapSelectedType(this);
}

onRegionChange(region) {
    console.log("region",region)
  this.setState({ region });
}
_moveBackOnClick(e){
    console.log("this._moveBackButton_ClickEvent")
    return Actions.channels();
}

onMarkerListener(e){
    console.log("this.onMarkerListener")
}

  render() {
    
      
    //console.log("CurrentUser",this.props.currentUser)
   let googlePlaces = this.props.nearbyState.googlePlaces;
     // console.log("googlePlaces",googlePlaces)
      //console.log("mapDataObject",mapDataObject)
      
      let markerlist=[];
    if(googlePlaces)  
      markerlist = generateMarkerObject(googlePlaces);
      
      //console.log("markerlist",markerlist)

      //console.log("State",this.state);
      let regionsObject = this._regionFrom(this.state.latitude,this.state.longitude,this.state.accuracy);
      
      let isUpdated = this.state.locationIsUpdated ;
//       {(isUpdated === false) ?
//         <Content>
//         <Spinner color='green'/></Content>
//         :
//         <Content>
//       </Content>
//}
      
//        <Fab
//            direction="down"
//            containerStyle={{ marginTop: 5}}
//            style={{ backgroundColor: '#00b383' }}
//            position="topLeft"
//            onPress={this._moveBackButton_ClickEvent}>
//            <Icon name="arrow-back" />
//          </Fab>
//          <View transparent>
//          <Fab
//            direction="down"
//            containerStyle={{ marginTop: 5}}
//            style={{ backgroundColor: '#00b383' }}
//            position="topLeft"
//            onPress={this._moveBackOnClick.bind(this)}>
//            <Icon name="arrow-back" />
//          </Fab>
//      
//        </View>
      
    return (
        <Container>
           <Header>
            <Left>
              <Button transparent onPress={() => Actions.channels()}>
                <Icon active name="arrow-back" />
              </Button>
            </Left>
           
            <Right>
              <Button transparent onPress={this.props.openDrawer} >
                <Icon active name="menu" />
              </Button>
            </Right>
          </Header>
    <View style={stylesMap.container}>
         <MapView
          provider={undefined}
                    style={stylesMap.map}
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
              
         {googlePlaces !== null && markerlist.map((marker,i) => {
         // console.log("marker",marker)
            return(
            <MapView.Marker
              coordinate={marker.LatLng}
             pinColor={"#990000"} key={i}>
            <MapView.Callout>
                    <MarkerView   
                      title={marker.details.name}
                      description={marker.details.vicinity}/>
             </MapView.Callout>
           </MapView.Marker> 
       );})}
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
            <Button style={{ backgroundColor: '#34A34F' }} onPress={this._updateMapByPolice.bind(this)}>
              <Icon name="md-star-outline" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }} onPress={this._updateMapByFireStation.bind(this)}>
              <Icon name="ios-bonfire-outline" />
            </Button>
         
          <TouchableOpacity style={{ alignSelf: 'flex-end', backgroundColor: '#DD5144' }} onPress={this._updateMapByHospital.bind(this)}>
            <Thumbnail source={hospital} style={styles.iconPic} />
          </TouchableOpacity>
          </Fab>
       
      
       </View>
</View>

 </Container>
    );
  }
}
//require('../../../images/contacts/sanket.png')
//   <Button style={{ backgroundColor: '#DD5144' }} onPress={this._updateMapByHospital.bind(this)}>
//              <Icon name="ios-add-outline" />
//            </Button>
//          <TouchableOpacity style={{ alignSelf: 'flex-end', backgroundColor: '#ff6600' }} onPress={this._updateMapByFireStation.bind(this)}>
//            <Thumbnail source={fire} style={styles.iconPic} />
//          </TouchableOpacity>

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    loadGooglePlacesRequest: (lat, lon, type, radius, keyword) => dispatch(actions.loadGooglePlacesRequest(lat, lon, type, radius, keyword)),
  };
}



const mapStateToProps = state => ({
  nearbyState: state.nearby,
  currentUser:state.login,
});

export default connect(mapStateToProps, bindAction)(Nearby);

