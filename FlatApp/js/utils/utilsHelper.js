import Expo, { SQLite } from 'expo';

export function createTwoDimensionArray(list){
    let twoDArray = [];
    if(list !== undefined){
   
    let size = list.length/2;
    
      for(i=0; i< size ; i++ ){
          
          for(x=0;x<2 ; x++){
              twoDArray[i][x] = list[x];
          }
           list.remove(0);
           list.remove(1);
      }
    console.log("MyTwoDArray",twoDArray);
         
    }
    return twoDArray;
}

export const getAbsoluteApiUrl = (apiUrl, param) =>{

  for (const [k, v] of Object.entries(param)) {
    apiUrl = apiUrl.replace(`:${k}`, v || '')
  }
  return apiUrl;
}

 export function objectToArray(_object){
          var _objArray =[];
          
          var _objectArrayKeys = Object.keys(_object);
          
          for(i=0;i< _objectArrayKeys.length ; i++){
              _objArray.push(_object[_objectArrayKeys[i]]);
          }
       return _objArray;
     }
  export function getTwoDimensionalArray(arrayOfObject){
          var _twoDimensionalArray = [];
              for(x=0; x<arrayOfObject.length;x++){
                  _twoDimensionalArray.push(objectToArray(arrayOfObject[x]))
              }
          return _twoDimensionalArray;
      }
  
  export function generateRefNumbers( _refNumber ){
      let date = new Date();
      
      let _day = date.getDay();
      
      let _month = date.getMonth();
      
      let _year = date.getYear();
      
      let refNum = null;
      
      if(_day >10){
         refNum = "0"+_day
         }
      
  }
  
  export function generateMarkerObject(_arrayOfObject){
      
    let _markerArray = [];
      
      let _results = _arrayOfObject.results;
      
      for(x=0; x < _results.length; x++){
          let _object = _results[x]
          _markerArray.push({
            "LatLng":{
              latitude: _object.geometry.location.lat,
              longitude:  _object.geometry.location.lng,
              },
             "details":_object
                            });
      }
      return _markerArray;
  }
  
//  export function openSQlite(){
//      let db = SQLite.openDatabase("tshwaneMobiSQLite.db");
//      let transaction = db.transaction();
//      let sqlStatement = 'create table tblCaseHistory ( _id integer not null auto_increment, noti_title text,noti_message text, noti_date text)';
//      transaction.excuteSql(sqlStatement, arguments, success, error)
//      db.transaction((transaction)=>{
//          
//      }, (error)=>{
//          
//      }, (success)=>{
//          
//      })
//  }
//  
  
//export const sqLiteDataSorce = SQLite.openDatabase('tshwaneMobi.db');

export function createTBLLogin(sqLiteDataSorce){
   console.log("sqLiteDataSorce", sqLiteDataSorce)
    sqLiteDataSorce.transaction(tx => {
      tx.executeSql(
        'create table if not exists tblLogin (id integer primary key not null, accessToken text, userId text, username text, fullname text, email text, seesionId text);'
      );
    },
      (error) =>{
           console.log( 'error',error);
          return 'error'+error;
      },
      (success) =>{
          console.log('success',success);
         return 'success';
     });
    
}
  
export function insertSuccessfulLogin(params, sqLiteDataSorce){
     sqLiteDataSorce.transaction(
      tx => {
        tx.executeSql('insert into tblLogin (accessToken, userId, username,seesionId ) values (?, ?, ?, ?)', [params.accessToken, params.userId,params.username, params.sessionId]);
        tx.executeSql('select * from tblLogin', [], (_, { rows }) =>{
            return rows;
          console.log(JSON.stringify(rows))
        });
      },
      (error) =>{
           console.log( 'error',error);
          return 'error'+error;
      },
      (success) =>{
          console.log('success',success);
         return 'success';
     }
    );
}

export function  selectCurrentUser(params, sqLiteDataSorce) {
    db.transaction(tx => {
      tx.executeSql(
        `select * from tblLogin where userId = ?;`,
        [params.userId],
        (_, { rows: { _array } }) => {
            return _array;
        }
      );
    });
  }

export function  updateCurrentUser(params, sqLiteDataSorce) {
     db.transaction(
                tx => {
                  tx.executeSql(`update items set fullname = `+params.fullname+`,email =`+params.email+` where userId = ?;`, [
                    params.userId,
                  ]);
                },
                null,
                null
              );
  }
  
export function validateEmail(mail){  
    
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
if(mail.match(mailformat)){
    return (true)  
  }else{
      return (false)  
  }
}  