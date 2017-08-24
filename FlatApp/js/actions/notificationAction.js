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
    dispatch({
        type:'LOAD_NOTIFICATIONS_REQUEST_STARTED'
    });
        console.log("requestUrl",requestUrl)
        try{
        
        return fetch(requestUrl, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + accessToken,
                  }
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

export function loadNotificationDetailsSuccess(responseJson){
     return{
        type:'LOAD_NOTIFICATIONS_DETAIL_REQUEST_SUCCESS',responseJson
    }
}

export function loadNotificationDetailsError(error){
    return{
        type:'LOAD_NOTIFICATIONS_DETAIL_REQUEST_ERROR',error
    }
}

export function loadNotificationDetailsRequest(accessToken,notificationId){
    
    return function (dispatch){
        let requestUrl = apiRequest.sercviceBaseUrl+apiRequest.viewNotification; 
        let requestSource = getAbsoluteApiUrl(requestUrl,{notificationId:notificationId})
    dispatch({
        type:'LOAD_NOTIFICATIONS_DETAIL_REQUEST_STARTED'
    });
        console.log("requestUrldetail",requestSource)
        try{
        
        return fetch(requestSource, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + accessToken,
                  }
        }).then((response) => response.json())
             .then((responseJson)=>{
             console.log('NotificationDetailsResponse',responseJson)
         
             dispatch(loadNotificationDetailsSuccess(responseJson));
         });

        }catch(error){
           dispatch(loadNotificationDetailsError(error));
        }
       
    }
}