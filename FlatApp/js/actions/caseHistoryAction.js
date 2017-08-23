import { apiRequest } from '../utils/api';
import { getAbsoluteApiUrl } from '../utils/utilsHelper';

export function loadCaseHistorySuccess(responseJson){
     return{
        type:'LOAD_CASE_HISTORY_REQUEST_SUCCESS',responseJson
    }
}

export function loadCaseHistoryError(error){
    return{
        type:'LOAD_CASE_HISTORY_REQUEST_ERROR',error
    }
}

export function loadCaseHistoryRequest(params,accessToken){
    
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
         
             dispatch(loadCaseHistorySuccess(responseJson));
         });

        }catch(error){
           dispatch(loadCaseHistoryError(error));
        }
       
    }
}
