

import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, StyleSheet, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'; 

import { Container, Header, Content, Text, Button, Icon, Left, Right, Body, Form, Item, Input, Picker, Textarea, Switch, ListItem, CheckBox,Label, Toast } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import { openDrawer } from '../../actions/drawer';

import styles from './styles';

const headerLogo = require('../../../images/Header-Logo.png');
const primary = require('../../themes/variable').brandPrimary;

import { loadCategoriesTypeRequest } from '../../actions/categoryAction';
import { reportIncidents } from '../../actions/incidentsAction';
import { ImagePicker, Constants, Location, Permissions } from 'expo';

class Channel extends Component {

  constructor(props) {
    super(props);
    this.state = {
        showToast: false,
        accessToken:this.props.currentUser.id,
      selectedType: "key1323",
      incidentTypes:[],
      image: null,
        description:null,
        descriptionError:null,
        subCategoryId:null,
        longitude:'',
        latitude:'',
        cantactNo:null,
        cantactNoError:null,
        errorMessage:'',
        locationState:true,
        jsonLocation:null,
        strAddress:null,
        strAddressError:null,
        reportedBy:'',
        reportedByError:'',
    };
  }

    componentWillMount() {
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
    
    componentDidMount(){
        const categoryId = this.props.appState.categoryReducer.selectedCategory.categoryId;
        this.props.loadCategoriesTypeRequest(categoryId);
    }
    
    componentWillReceiveProps(nextProps){
       this.setState({
           selectedType:nextProps.appState.categoryReducer.selectedTypesList[0].subCategoryId,
           subCategoryId: nextProps.appState.categoryReducer.selectedTypesList[0].subCategoryId,
           incidentTypes:nextProps.appState.categoryReducer.selectedTypesList,
       }) 
        if(this.state.strAddress !== null){
            if(this.state.strAddress.length > 3){
                this._getLocationByAddressAsync();
            }
            
        }
        
//        if(this.props.incidents.reportResponse !== null && this.props.incidents.reportResponse.hasOwnProperty("incidentId")){
//            
//        }
    }
    
//    componentDidUpdate(){
//        if(this.state.strAddress !== null){
//            if(this.state.strAddress.length > 3){
//                this._getLocationByAddressAsync();
//            }
//            
//        }
//    }
    
  onValueChange(value: string) {
      console.log("value", value)
    this.setState({
      selectedType: value
    });
  }
    
  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

_pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
        base64:true,
      aspect: [4, 3],
    });
       console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.base64 });
    }
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
      let jsonLocation =location;
      console.log("jsonLocation11",location);
      
    this.setState({ 
        longitude:jsonLocation.coords.longitude,
        latitude:jsonLocation.coords.latitude, jsonLocation:jsonLocation });
  };

_getLocationByAddressAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.geocodeAsync(this.state.strAddress);
      let jsonLocation = location;
      console.log("jsonLocationByAddress",location);
      
    this.setState({
        longitude:jsonLocation.coords.longitude,
        latitude:jsonLocation.coords.latitude, jsonLocation });
  };

_postIncidentReport(){
    Alert.alert(
  'Alert Title',
  'My Alert Msg',
  [
    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }
)
    
        let accessToken = this.state.accessToken;
        //"refNumber":'',
        let params = {"refNumber":'09898',
                      "areaId":'0',
                      "regionId":'0',
                      "channelId":'5981c1bada29000011ee94bc',
                      "categoryId":  this.props.appState.categoryReducer.selectedCategory.categoryId,
                      "subCategoryId": this.state.subCategoryId,
                      "description": this.state.description,
                      "mobile": 0,
                      "deviceId": Constants.deviceId,
                      "location": this.state.strAddress,
                      "lat": this.state.latitude,
                      "lot": this.state.longitude,
                      "mobileno": this.state.cantactNo,
                      reportedBy: this.state.reportedBy,
                    }
        if(this._validateInputsFields()){
            this.props.reportIncidents(params,accessToken);
        }

    
    return ;
}
_validateInputsFields(){
    let _isValidInputs = false;
    if(!this.state.description){
        alert('Error:>>> Details cannot be empty.');
    }else{
        if(!this.state.cantactNo){
            alert('Error:>>> Phone number cannot be empty.');
        }else{
            if(this.state.cantactNo.length !== 10){
                alert('Error:>>> Phone number cannot be more or less than 10 digits.');
             }else{
               if(this.state.locationState ===false && this.state.strAddress!== null){
                   alert('Error:>>> Address cannot be empty.');
                }else{
                     _isValidInputsv = true;
                }
            }
         
        } 
    }
    return _isValidInputs;
}
_onChangeLocationState(){
    
    // this._getLocationAsync();
    let isChecked =(this.state.locationState)? false : true;
    console.log("is check againS",isChecked )
    this.setState({locationState: isChecked}); 
    
}

  render() {
      
       let { image } = this.state;
      
        console.log('ChannelState', this.state);
     console.log('ChannelProps', this.props.incidents.reportResponse);
//      
//      console.log("Incident Types", this.state.incidentTypes);
//      
      let category = this.props.appState.categoryReducer.selectedCategory;
      let selectedTypesList = this.state.incidentTypes
      
      let typeRows = selectedTypesList.map((row) => renderTypesRows(row));
      function renderTypesRows(row){
         return(
            <Item label={row.name} key={row.subCategoryId} value={row.subCategoryId} />
         ) 
      }
      
      let locationfield = <View>{this.state.locationState ===false ? 
                                 <Item rounded >
                        <Input placeholder="Specify incident location"  onChangeText={location => this.setState({ location })} />
                      </Item>
                        :
                      <Text style={{ color: '#000000' }}> 
                         Use my current location.
                    </Text>
                                } </View>
     //onPress={() => Actions.story()} <TouchableOpacity style={{ flexDirection: 'row' }} >
         // style={Platform.OS === 'android' ? styles.achannelHeader : styles.ioschannelHeader}
    return (
      <Container>
        <Image source={require('../../../images/glow2.png')} style={styles.container} >
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
              <Button transparent onPress={this.props.openDrawer} >
                <Icon active name="menu" />
              </Button>
            </Right>
          </Header>
            <View style={styles.categoryTitle} >
                <Text style={{ fontWeight: 'bold',  alignSelf: 'center'}}>{category.name}</Text>
            </View>
          <Content showsVerticalScrollIndicator={false}>
        

            <View foregroundColor={'white'} style={{ backgroundColor: '#fff' }}>
        
                <View style={styles.newsContentWrap}>
                    <Form>
                  <Text numberOfLines={2} style={styles.newsHeader}>Select Type</Text>                
                        <Picker
                        style={styles.formItem}
                          iosHeader="Select type"
                          mode="dropdown"
                          selectedValue={this.state.selectedType}
                          onValueChange={this.onValueChange.bind(this)} rounded>
                              {typeRows}
                        </Picker>
                     <Item rounded style={{ backgroundColor: '#fff' }} style={styles.formItem} inlineLabel>
                        <Input  placeholder="Provide details here"  onChangeText={description => this.setState({ description,descriptionError:null })}
                       value={this.state.description} multiline={true} style={{height: 70, paddingBottom:20}}/>
                        <Label style={{ color: '#ff0000' }}>{this.state.descriptionError}</Label>
                      </Item>
                   
                        <Button rounded
                          onPress={this._pickImage}
                        style={styles.formItem}><Text >Select an image</Text></Button>
                            <View style={styles.formItem}>
                        {image &&
                          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                        }
                        </View>
   
                    <ListItem style={styles.formItem}>

                        <Left>
                          <Text  style={{ color: '#000000' }}>At the scene. </Text>
                        </Left>
                            <Right>
                             <CheckBox checked={this.state.locationState} onPress={this._onChangeLocationState.bind(this)} />
                            </Right>
                      </ListItem>
                   <View style={styles.formItem}>
                    {(this.state.locationState ===false) ? 
                    <Item style={styles.formItem} rounded inlineLabel>
                        <Input placeholder="Specify incident location"  onChangeText={strAddress => this.setState({ strAddress:strAddress, strAddressError:null })} value={this.state.strAddress} />
                     <Label style={{ color: '#ff0000' }}>{this.state.strAddressError}</Label>
                      </Item>
                        :
                      <Text style={{ color: '#000000' }}> 
                         
                    </Text>
                                } 
                    </View>
                     <Item style={styles.formItem} rounded inlineLabel>
                        <Input  placeholder="Your name (optional)" onChangeText={reportedBy => this.setState({ reportedBy:reportedBy, reportedByError:null })} value={this.state.reportedBy} />
                          <Label style={{ color: '#ff0000', fontSize: 10 }}>{this.state.cantactNoError}</Label>
                      </Item>
                     <Item style={styles.formItem} rounded inlineLabel>
                        <Input  keyboardType = 'numeric' maxLength={10}  minLength={10} placeholder="Your contact number" onChangeText={cantactNo => this.setState({ cantactNo:cantactNo, cantactNoError:null })} value={this.state.cantactNo} />
                          <Label style={{ color: '#ff0000', fontSize: 10 }}>{this.state.cantactNoError}</Label>
                      </Item>
        
                    <Button
                        rounded primary block large
                        style={styles.loginBtn} onPress={this._postIncidentReport.bind(this)}>
                        <Text style={Platform.OS === 'android' ? { fontSize: 16, textAlign: 'center', top: -5 } : { fontSize: 16, fontWeight: '900' }}>Report</Text>
                      </Button>
                  </Form>
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
      loadCategoriesTypeRequest: (categoryId) => dispatch(loadCategoriesTypeRequest(categoryId)),
      reportIncidents: (incidentsObject,accessToken) => dispatch(reportIncidents(incidentsObject,accessToken)),
  };
}
const mapStateToProps = state => ({
  appState: state,
  incidents:state.incidents,
  currentUser:state.login,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Channel);
