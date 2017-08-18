import React, { Component } from 'react';
import { Image, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';

import { Container, Content, Text, Button, Icon, Item, Input, View } from 'native-base';

import styles from './styles';
import commonColor from '../../../native-base-theme/variables/commonColor';

import { loadSignupRequest } from '../../actions/signupAction';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: {
        x: 0,
        y: 0,
      },
        username:'',
        email:'',
        password:'',
        errorMessage:'',
        isloading:false,
    };
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
  }

_createAccount(){
    if(this.state.username){
        if(this.state.email){
              if(this.state.password){
                  this.setState({isloading: true});
               return this.props.loadSignupRequest({username: this.state.username, password: this.state.password, email: this.state.email })
              } else
                this.setState({errorMessage: 'please enter your password.'})
        }else{
             this.setState({errorMessage: 'please enter your email.'})
        }
    }else{
             this.setState({errorMessage: 'please enter your username.'})
    }           
         
}
  render() {
    if(this.props.state.newUser !== null){
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
                  placeholder="Username" style={styles.input}
                  placeholderTextColor="#FFF"
                  onChangeText={username => this.setState({ username })}
                />
              </Item>

              <Item rounded style={styles.inputGrp}>
                <Icon name="mail-open" />
                <Input
                  placeholder="Email" style={styles.input}
                  placeholderTextColor="#FFF"
                  onChangeText={email => this.setState({ email })}
                />
              </Item>

              <Item rounded style={styles.inputGrp}>
                <Icon name="unlock" />
                <Input
                  placeholder="Password" secureTextEntry style={styles.input}
                  placeholderTextColor="#FFF"
                  onChangeText={password => this.setState({ password })}
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
