import { apiRequest } from '../utils/api';
import { getAbsoluteApiUrl } from '../utils/utilsHelper';

export function loadSignupSuccess(responseJson){
     return{
        type:'LOAD_SIGNUP_REQUEST_SUCCESS',responseJson
    }
}

export function loadSignupError(error){
    return{
        type:'LOAD_SIGNUP_REQUEST_ERROR',error
    }
}

export function loadSignupRequest(params){
    
    return function (dispatch){
        let requestUrl = apiRequest.sercviceBaseUrl+apiRequest.createUserAccount; 
    
        console.log("requestUrl",requestUrl)
        try{
        
        return fetch(requestUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(params),
        }).then((response) => response.json())
             .then((responseJson)=>{
             console.log('signupResponse',responseJson)
         
             dispatch(loadSignupSuccess(responseJson));
         });

        }catch(error){
           dispatch(loadSignupError(error));
        }
       
    }
}