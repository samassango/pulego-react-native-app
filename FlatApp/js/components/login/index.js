import React, { Component } from 'react';
import { Image, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, Item, Input, Button, Icon, View, Left, Right,  Toast, Spinner  } from 'native-base';

import styles from './styles';
import commonColor from '../../../native-base-theme/variables/commonColor';

const bg = require('../../../images/BG.png');
const logo = require('../../../images/logo.png');

import { loadAuthenticationRequest } from '../../actions/loginAction';
import { Constants, SQLite } from 'expo';

import { createTBLLogin, insertSuccessfulLogin } from '../../utils/utilsHelper';

const sqLiteDataSorce = SQLite.openDatabase('tshwaneMobi.db');

class Login extends Component {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    errorMessage:'',
    isLogging:'unActive',
    deviceId:''
    };
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
  }
componentWillMount(){
    this.setState({deviceId:Constants.deviceId});
    
   createTBLLogin(sqLiteDataSorce);
}
    authenticateUser(){
        let isLoading = 'Active';
       // console.log("IsLoading",isLoading)
        this.setState({
            isLogging: isLoading, 
        });
//        console.log("LocalState1",this.state)
        if(this.validateInputs()){
            
            console.log("user logging in!!!!",this.props.login.currentUser);
            
           this.props.loadAuthenticationRequest(this.state.username, this.state.password,this.state.deviceId);
           //this.setState({isLogging:false});
                this.setState({
                   errorMessage:(this.props.login.loginError.hasOwnProperty("error"))?this.props.login.loginError.error.message :'',
                });
           
        }
        
        
    }
addCurrentLoginUser(params){
  return insertSuccessfulLogin(params, sqLiteDataSorce);
}
validateInputs(){
    this.setState({isLogging:'Active'});
//    console.log("IsLoading22",this.state.isLogging)
    if(this.state.username){
       if(this.state.password){
           return true;
       }else{
            this.setState({isLogging:'unActive'});
       }
    }else{
         this.setState({isLogging:'unActive'});   
    }
    return false;
}

  render() {
      
       if(this.props.login.currentUser !== null){
           let params = {
               userId:this.props.login.currentUser.userId,
               accessToken:this.props.login.currentUser.id,
               username:this.state.username,
               seesionId:''
               
           }
           addCurrentLoginUser(params)
            Actions.walkthrough({ username: this.state.username, password: this.state.password }); 
        }
      
//      console.log("login",this.props.login);
//       console.log("DEVICE_ID", Constants.deviceId, Constants.deviceName);
//      console.log('localState', this.state)
//      console.log("this.state.isLogging ",this.state.isLogging )
      let errorMessage = (this.props.login.loginError.hasOwnProperty("error"))? this.props.login.loginError.error.message : '';
    return (
      <Container>
        <StatusBar
          backgroundColor={commonColor.statusBarColor}
          barStyle="light-content"
        />
        <Content scrollEnabled={true} bounces={false}>
          <Image source={bg} style={styles.background} >
            <Image source={logo} style={Platform.OS === 'android' ? styles.aShadow : styles.iosShadow} />

            <View style={styles.bg}>
              <Item rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="Username"
                  onChangeText={username => this.setState({ username })}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>

              <Item rounded style={styles.inputGrp}>
                <Icon name="unlock" />
                <Input
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor="#FFF"
                  onChangeText={password => this.setState({ password })}
                  style={styles.input}
                />
              </Item>
              
                <Text style={Platform.OS === 'android' ? { fontSize: 16, textAlign: 'center',color:'red', top: -5 } : { fontSize: 16, fontWeight: '900' }}>{this.state.errorMessage}</Text>
         
              <Button
                rounded primary block large
                style={styles.loginBtn}
                onPress={this.authenticateUser.bind(this)}>
                <Text style={Platform.OS === 'android' ? { fontSize: 16, textAlign: 'center', top: -5 } : { fontSize: 16, fontWeight: '900' }}>Login</Text>
              </Button>
     
           <View>
              {( this.state.isLogging === 'Active')? <Spinner />:<Text>{errorMessage}</Text>
              }
           </View>
              <View style={styles.otherLinksContainer}>
                <Left>
                  <Button transparent style={{ alignSelf: 'flex-start' }} onPress={() => Actions.signUp()}>
                    <Text style={styles.helpBtns}>
                          Sign up
                      </Text>
                  </Button>
                </Left>
                <Right>
                  <Button transparent style={{ alignSelf: 'flex-end' }} onPress={() => Actions.needhelp()}>
                    <Text style={styles.helpBtns}>
                          forgot password?
                      </Text>
                  </Button>
                </Right>
              </View>
            </View>

          </Image>

        </Content>
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    loadAuthenticationRequest: (username, password, deviceId) => dispatch(loadAuthenticationRequest(username, password, deviceId)),
  };
}

const mapStateToProps = state => ({
  login:state.login,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
