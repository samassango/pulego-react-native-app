import { apiRequest } from '../utils/api';
import { getAbsoluteApiUrl } from '../utils/utilsHelper';

export function loadProfileSuccess(responseJson){
    return{type:'LOAD_PROFILE_REQUEST_SUCCESS',responseJson}
}

export function loadProfileError(error){
    return{type:'LOAD_PROFILE_REQUEST_ERROR',error}
}

export function loadProfileRequest(accessToken, userId){
    
    return function (dispatch){
        let requestUrl = apiRequest.sercviceBaseUrl+apiRequest.authenticate.profile; 
      // "Authorization": "Bearer " + accessToken,+'?access_token='+accessToken
        let sourceRequestUrl = getAbsoluteApiUrl(requestUrl,{id:userId})+'?access_token='+accessToken;
        try{
           console.log("sourceRequestUrl",sourceRequestUrl)
             console.log("accessToken",accessToken)
        return fetch(sourceRequestUrl, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  }}).then((response) => response.json())
             .then((responseJson)=>{
             console.log('Profile',responseJson)
                     
                dispatch(loadProfileSuccess(responseJson));
           
             });

        }catch(error){
           dispatch(loadProfileError(error));
        }
       
    }
}