import { apiRequest } from '../utils/api';
import { getAbsoluteApiUrl } from '../utils/utilsHelper';

export function loadEnquiriesSuccess(responseJson){
     return{
        type:'LOAD_ENQUIRIES_REQUEST_SUCCESS',responseJson
    }
}

export function loadEnquiriesError(error){
    return{
        type:'LOAD_ENQUIRIES_REQUEST_ERROR',error
    }
}

export function loadEnquiriesRequest(params,accessToken){
    
    return function (dispatch){
        let requestUrl = apiRequest.sercviceBaseUrl+apiRequest.enquiries.postEnquiry; 
    
        console.log("requestUrl",requestUrl)
        try{
        
        return fetch(requestUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                  },
                  body: JSON.stringify(params),
        }).then((response) => response.json())
             .then((responseJson)=>{
             console.log('enquiriesResponse',responseJson)
         
             dispatch(loadEnquiriesSuccess(responseJson));
         });

        }catch(error){
           dispatch(loadEnquiriesError(error));
        }
       
    }
}

export function loadEnquiriesTypeSuccess(responseJson){
     return{
        type:'LOAD_ENQUIRY_TYPE_REQUEST_SUCCESS',responseJson
    }
}

export function loadEnquiriesTypeError(error){
    return{
        type:'LOAD_ENQUIRY_TYPE_REQUEST_ERROR',error
    }
}

export function loadEnquiriesRequest(params,accessToken){
    
    return function (dispatch){
        let requestUrl = apiRequest.sercviceBaseUrl+apiRequest.enquiries.type; 
    
        console.log("requestUrl",requestUrl)
        try{
        
        return fetch(requestUrl, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                  },
                  body: JSON.stringify(params),
        }).then((response) => response.json())
             .then((responseJson)=>{
             console.log('enquiriesResponse',responseJson)
         
             dispatch(loadEnquiriesTypeSuccess(responseJson));
         });

        }catch(error){
           dispatch(loadEnquiriesTypeError(error));
        }
       
    }
}