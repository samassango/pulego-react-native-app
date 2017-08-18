

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Platform } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Text, Left, Right, Body, Button, Icon, View } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';
import ProgressBar from './../loaders/ProgressBar';

import theme from '../../themes/base-theme';
import styles from './styles';


const headerLogo = require('../../../images/Header-Logo.png');

class Overview extends Component {

  render() {
      let catagoriesList = ['Contact Crime','Drug/Guns','Corruption','Property Crime','Vehicle Crime','Protest Action','Traffic Incident','Bylaw Infringement'];
    return (
      <Container>
        <Image source={require('../../../images/glow2.png')} style={styles.container} >
          <Header>
            <Left>
              <Button transparent style={styles.btnHeader} onPress={() => Actions.pop()}>
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
          <View style={styles.overviewHeaderContainer}>
            <Text style={styles.overviewHeader}>OVERVIEW</Text>
            <Text note style={styles.overviewHead}>What you are reading the most</Text>
          </View>

          <Content showsVerticalScrollIndicator={false}>
            <View style={styles.overviewContent}>
              <View style={styles.overviewTopicsBox}>
                <Grid style={Platform.OS === 'android' ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
                  <Col>
                    <Text style={styles.overviewInfoHeader}>{catagoriesList[0]}</Text>
                  </Col>
                  <Col>
                    <Text style={styles.overviewInfoPerc}>26%</Text>
                  </Col>
                </Grid>
                <ProgressBar color="#fff" progress={34} />
              </View>

              <View style={styles.overviewTopicsBox}>
                <Grid style={Platform.OS === 'android' ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
                  <Col>
                    <Text style={styles.overviewInfoHeader}>{catagoriesList[1]}</Text>
                  </Col>
                  <Col>
                    <Text style={styles.overviewInfoPerc}>20%</Text>
                  </Col>
                </Grid>
                <ProgressBar color="#fff" progress={28} />
              </View>

              <View style={styles.overviewTopicsBox}>
                <Grid style={Platform.OS === 'android' ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
                  <Col>
                    <Text style={styles.overviewInfoHeader}>{catagoriesList[2]}</Text>
                  </Col>
                  <Col>
                    <Text style={styles.overviewInfoPerc}>15%</Text>
                  </Col>
                </Grid>
                <ProgressBar color="#fff" progress={12} />
              </View>

              <View style={styles.overviewTopicsBox}>
                <Grid style={Platform.OS === 'android' ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
                  <Col>
                    <Text style={styles.overviewInfoHeader}>{catagoriesList[3]}</Text>
                  </Col>
                  <Col>
                    <Text style={styles.overviewInfoPerc}>12%</Text>
                  </Col>
                </Grid>
                <ProgressBar color="#fff" progress={10} />
              </View>

              <View style={styles.overviewTopicsBox}>
                <Grid style={Platform.OS === 'android' ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
                  <Col>
                    <Text style={styles.overviewInfoHeader}>{catagoriesList[4]}</Text>
                  </Col>
                  <Col>
                    <Text style={styles.overviewInfoPerc}>9%</Text>
                  </Col>
                </Grid>
                <ProgressBar color="#fff" progress={8} />
              </View>

              <View style={styles.overviewTopicsBox}>
                <Grid style={Platform.OS === 'android' ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
                  <Col>
                    <Text style={styles.overviewInfoHeader}>{catagoriesList[5]}</Text>
                  </Col>
                  <Col>
                    <Text style={styles.overviewInfoPerc}>7%</Text>
                  </Col>
                </Grid>
                <ProgressBar color="#fff" progress={5} />
              </View>

              <View style={styles.overviewTopicsBox}>
                <Grid style={Platform.OS === 'android' ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
                  <Col>
                    <Text style={styles.overviewInfoHeader}>{catagoriesList[6]}</Text>
                  </Col>
                  <Col>
                    <Text style={styles.overviewInfoPerc}>5%</Text>
                  </Col>
                </Grid>
                <ProgressBar color="#fff" progress={3} />
              </View>

              <View style={styles.overviewTopicsBox}>
                <Grid style={Platform.OS === 'android' ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
                  <Col>
                    <Text style={styles.overviewInfoHeader}>{catagoriesList[7]}</Text>
                  </Col>
                  <Col>
                    <Text style={styles.overviewInfoPerc}>3%</Text>
                  </Col>
                </Grid>
                <ProgressBar color="#fff" progress={5} />
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
  };
}

export default connect(null, bindAction)(Overview);
