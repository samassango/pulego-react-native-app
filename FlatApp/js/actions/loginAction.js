import { apiRequest } from '../utils/api';
import { getAbsoluteApiUrl } from '../utils/utilsHelper';

export function loadLoginSuccess(currentUser){
    return{type:'LOAD_AUTHENTICATION_REQUEST_SUCCESS',currentUser}
}

export function loadLoginError(error){
    return{type:'LOAD_AUTHENTICATION_REQUEST_ERROR',error}
}

export function loadAuthenticationRequest(username, password, deviceId){
    
    return function (dispatch){
        let requestUrl = apiRequest.sercviceBaseUrl+apiRequest.authenticate.login; 
        let reqisterDeviceUrl = apiRequest.sercviceBaseUrl+apiRequest.reqisterDevice;
    let requestAccessTokenUrl = apiRequest.sercviceBaseUrl+apiRequest.tokenRequest;
        console.log("requestUrl",requestUrl)
        console.log("NowDate",new Date().getDate());
        try{
            let data = {"username":username, "password":password};
            console.log("data",data)
            let deviceInfo = {"registeredDevicesId": deviceId}
            console.log("deviceInfo",deviceInfo)
        return fetch(requestUrl, {
                  method: "POST",
                  body: JSON.stringify(data),
                  headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  }}).then((response) => response.json())
             .then((responseJson)=>{
             console.log('loginResponse',responseJson)
                      if(responseJson.hasOwnProperty("userId")){

                dispatch(loadLoginSuccess(responseJson));
            }else{
              
                dispatch(loadLoginError(responseJson));
            }
                
             });

        }catch(error){
           dispatch(loadLoginError(error));
        }
       
    }
}
export function loadLogoutSuccess(){
     return{
        type:'LOAD_LOGOUT_REQUEST_SUCCESS',
    }
}

export function loadLogoutError(error){
    return{
        type:'LOAD_LOGOUT_REQUEST_ERROR',error
    }
}

export function loadLogoutRequest(accessToken){
    
    return function (dispatch){
        let requestUrl = apiRequest.sercviceBaseUrl+apiRequest.authenticate.logout; 
    
        console.log("requestUrl",requestUrl)
        try{
        
        return fetch(requestUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + accessToken,
                  }}).then((response) => response.json())
             .then((responseJson)=>{
             console.log('logoutResponse',responseJson)
         
             dispatch(loadLogoutSuccess());
         });

        }catch(error){
           dispatch(loadLogoutError(error));
        }
       
    }
}
