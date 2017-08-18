import { apiRequest } from '../utils/api';
import { getAbsoluteApiUrl } from '../utils/utilsHelper';

export function loadNotificationsSuccess(responseJson){
     return{
        type:'LOAD_NOTIFICATIONS_REQUEST_SUCCESS',responseJson
    }
}

export function loadNotificationsError(error){
    return{
        type:'LOAD_NOTIFICATIONS_REQUEST_ERROR',error
    }
}

export function loadNotificationsRequest(accessToken){
    
    return function (dispatch){
        let requestUrl = apiRequest.sercviceBaseUrl+apiRequest.notifications; 
    
        console.log("requestUrl",requestUrl)
        try{
        
        return fetch(requestUrl, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(params),
        }).then((response) => response.json())
             .then((responseJson)=>{
             console.log('NotificationsResponse',responseJson)
         
             dispatch(loadNotificationsSuccess(responseJson));
         });

        }catch(error){
           dispatch(loadNotificationsError(error));
        }
       
    }
}