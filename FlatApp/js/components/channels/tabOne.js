

import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actionsMethod  from '../../actions/categoryAction';


import { Container, Content, Text, Spinner } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import styles from './styles';

import { createTwoDimensionArray } from '../../utils/utilsHelper';
import { loadCategoriesRequest } from '../../actions/categoryAction';

class TabOne extends Component {
 constructor(props){
     super(props);
         const categories =
     this.state = {
         selectedCategory :'',
         categories :  [{name:'Contact Crime', categoryIcon:require('../../../images/NewsIcons/Icons_0018_Fight_Icon.png')},
                        {name:'Drugs / Guns', categoryIcon:require('../../../images/NewsIcons/Icons_0011_Gun_Icon.png')}, 
                        {name:'Corruption', categoryIcon:require('../../../images/NewsIcons/Icons_0017_Bribe_Icon.png')},
                        {name:'Property Crime', categoryIcon:require('../../../images/NewsIcons/Icons_0016_Building_Icon.png')},
                        {name:'Other', categoryIcon:require('../../../images/NewsIcons/Icons_0015_Break_In_Icon.png')},
                        {name:'Protest Action', categoryIcon:require('../../../images/NewsIcons/Icons_0014_Protest_Icon.png')},
                        {name:'Traffic and Road', categoryIcon:require('../../../images/NewsIcons/Icons_0013_Traffic_Icon.png')}, 
                        {name:'Bylaw Infringement', categoryIcon:require('../../../images/NewsIcons/Icons_0012_By_Law_Infrigement_Icon.png')}],
         lstCategories: [],
     }
 }

componentDidMount(){
     // console.log("UpdateV23", this.state.lstCategories)
    if(this.state.lstCategories.length ===0){
       this.props.loadCategoriesRequest();
    }
}   
     

componentWillReceiveProps(nextProps){
    //console.log("nextProps", nextProps.appChannelsState.categoriesList)
    this.updateCategoryWithImage(nextProps.appChannelsState.categoriesList);
   //console.log("lstCat",this.state.lstCategories)
}
    updateCategoryWithImage(newCategoriesWithIds){
        newCategories = [];
        const context = this;
        newCategories = newCategoriesWithIds.map((category) => updatesCategory(category));
        function updatesCategory(category){
            let index = context.state.categories.findIndex((item) => item.name === category.name );
           // console.log("IndexCategory",context.state.categories[index])
            return(
              {...category,
               categoryIcon: (index >-1 ? context.state.categories[index].categoryIcon : null)}
            )
        }
       let newArr =[]
         while(newCategories.length) newArr.push(newCategories.splice(0,2));
        //console.log("newArr",newArr)
        this.setState({
        lstCategories:newArr,
        })
    }
  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

_handleOnClickCategory(category){
//    this.setState({
//        selectedCategory : category,
//    });
    this.props.selectedCategory(category);
    Actions.channel();
}

  render() {
      let isLoading = false;
      // console.log("state", this.state);
     // console.log("list Categories", this.state.lstCategories,this.state.lstCategories.length);

      let rowsCategories = this.state.lstCategories;
      let rows = <View ><Spinner  color='blue'/></View>;

      //if(rowsCategories !== null && rowsCategories !== undefined){
      if(this.state.lstCategories.length !==0){
          //console.log("TwoDArray",rowsCategories[0]);
          isLoading = false;
          var newArr = [];
          
          const context = this;
          
          rows = rowsCategories.map((row, n) => renderRows(row, n));
          function renderRows(row, n){
             // console.log("row", row, n);

              let col = row.map((item) =>renderRow(item));
              
              function renderRow(item){
                                 return (  <Col key={item.categoryId}>
                                              <TouchableOpacity key={item.categoryId} onPress={context._handleOnClickCategory.bind(context,item)}>
                                                <Image key={item.categoryId} source={item.categoryIcon} style={styles.channelImg}>
                                                  <Text style={Platform.OS === 'android' ? styles.achannelImgText : styles.ioschannelImgText}>{item.name}</Text>
                                                </Image>
                                              </TouchableOpacity>
                                            </Col>
                                  )
                                 }
          //console.log("col", col)
              
              return (
                  <Row key={n}>
                  {col}
                  </Row>
              );
          }
          
    //  console.log('Row',rows);
          
       }else{
            isLoading =true;
        }
    //console.log('Row-react',rows);
//console.log("lstRow-react", this.state.lstCategories.length)
    return (
      <Container>
        <Content showsVerticalScrollIndicator={false} style={styles.contentChannel}>
          <View>
        
            {(this.state.lstCategories.length !==0)?
              ( <Grid>
               {rows}
    
            </Grid>
              ) :<View >
                <Spinner  color='blue'/>
            </View>
           }
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
appChannelsState:state.categoryReducer,
  navigation: state.cardNavigation,
});

function bindAction(dispatch) {
  return {
    loadCategoriesRequest: () => dispatch(actionsMethod.loadCategoriesRequest()),
    selectedCategory: (category) => dispatch(actionsMethod.selectedCategory(category)),
  };
}

export default connect(mapStateToProps, bindAction)(TabOne);
