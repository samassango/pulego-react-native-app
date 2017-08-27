import React, { Component } from 'react';
import { Image, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';

import { Container, Content, Text, Button, Icon, Item, Input, View, Spinner } from 'native-base';

import styles from './styles';
import commonColor from '../../../native-base-theme/variables/commonColor';

import { loadSignupRequest } from '../../actions/signupAction';

import { validateEmail } from '../../utils/utilsHelper';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: {
        x: 0,
        y: 0,
      },
        fullname:'',
        mobileNo:'',
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
        errorMessage:'',
        isloading:false,
    };
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
  }

_createAccount(){
if(this.state.fullname){
        if(this.state.mobileNo){
               if(this.state.email){
                    if(validateEmail(this.state.email)){
                        if(this._confirmPassword()){
                            this.setState({isloading: true});
                            return this.props.loadSignupRequest({fullname: this.state.fullname,username: this.state.email, password: this.state.password, email: this.state.email,mobileno: this.state.mobileNo })
                        } 
                    }else{
                            Alert.alert("Error: Invalid Email",
                               "Please enter your valid email.",
                               [
                                 {text:'ok'},
                               ]);
                    }
                                //this.setState({errorMessage: 'please enter your password.'})
                }else{
                         Alert.alert("Error: Email",
                               "Please enter your email.",
                               [
                                 {text:'ok'},
                               ]);
                             //this.setState({errorMessage: 'please enter your email.'})
                        }
                     
               }else{
                          Alert.alert("Error: Contact number",
                           "Please enter your cantact number.",
                           [
                             {text:'ok'},
                           ]);
               }
          
       }else{
             Alert.alert("Error: fullname",
                           "Please enter your fullname.",
                           [
                             {text:'ok'},
                           ]);
       }
   
         
}
    _confirmPassword(){
        let passwordMatch = false;
        if(this.state.password=== this.state.confirmPassword)
            passwordMatch=true;
        else 
            Alert.alert("Error",
           "Password missmatch!",
           [
             {text:'ok'},
           ]);
        
        return passwordMatch;
    }
  render() {
    if(this.props.state.newUser === null){
     console.log("newUser",this.props.state.newUser)
    Actions.login();
    }
     
    return (
      <Container>
        <StatusBar
          backgroundColor={commonColor.statusBarColor}
          barStyle="light-content"
        />
        <Image source={require('../../../images/BG-signUp.png')} style={styles.background} >
          <Content padder>
            <Text style={styles.signupHeader}>
                                    CREATE ACCOUNT
                                </Text>
            <View style={styles.signupContainer}>
            <Item rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="Enter your fullname" style={styles.input}
                  placeholderTextColor="#FFF"
                  onChangeText={fullname => this.setState({ fullname })}
                />
              </Item>
             
             <Item rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="Enter mobile number" style={styles.input}
                  keyboardType = 'numeric' maxLength={10}  minLength={10}
                  placeholderTextColor="#FFF"
                  onChangeText={mobileNo => this.setState({ mobileNo })}
                />
              </Item>

              <Item rounded style={styles.inputGrp}>
                <Icon name="mail-open" />
                <Input
                  placeholder="Enter your email" style={styles.input}
                  placeholderTextColor="#FFF"
                  onChangeText={email => this.setState({ email })}
                />
              </Item>

              <Item rounded style={styles.inputGrp}>
                <Icon name="unlock" />
                <Input
                  placeholder="Enter password" secureTextEntry style={styles.input}
                  placeholderTextColor="#FFF"
                  onChangeText={password => this.setState({ password })}
                />
              </Item>

             <Item rounded style={styles.inputGrp}>
                <Icon name="unlock" />
                <Input
                  placeholder="Confirm password" secureTextEntry style={styles.input}
                  placeholderTextColor="#FFF"
                  onChangeText={confirmPassword => this.setState({ confirmPassword })}
                />
              </Item>

              <Button
                rounded bordered block
                onPress={() => Actions.pop()}
                style={styles.signupBtn}
                onPress={this._createAccount.bind(this)}
              >
                <Text style={{ color: '#FFF' }}>Continue</Text>
              </Button>
<View>{this.state.isloading && <Spinner /> }</View>
              <Button block transparent style={{ marginTop: 10 }} >
                <Text style={styles.termsText}>Terms & Conditions</Text>
              </Button>
              <Text style={{ color: '#FFF' }}>{this.state.errorMessage}</Text>
            </View>
          </Content>
        </Image>
      </Container>
    );
  }
}
function bindActions(dispatch) {
  return {
    loadSignupRequest: (params) => dispatch(loadSignupRequest(params)),
  };
}

const mapStateToProps = state => ({
  state: state.login,
});

export default connect(mapStateToProps, bindActions)(SignUp);
