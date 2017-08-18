import { apiRequest } from '../utils/api';
import { getAbsoluteApiUrl } from '../utils/utilsHelper';

export function reportIncidents(params,accessToken){
    
    return function (dispatch){
        let requestUrl = apiRequest.sercviceBaseUrl+apiRequest.incidents.postIncident; 
        try{
            body = JSON.stringify(params);
            console.log("body",body)
             console.log("requestUrl",requestUrl)
        return fetch(requestUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                  },
            body: body
        }).then((response) => response.json())
             .then((responseJson)=>{
             console.log('incidentResponse',responseJson)
            dispatch(loadIncidentReportSuccess(reportResponse));
         });

        }catch(error){
             dispatch(loadIncidentReportError(error));
        }
       
    }
}

export function loadIncidentReportSuccess(reportResponse){
    return{
        type:'LOAD_INCIDENTS_REPORT_SUCCESS',reportResponse,
    }
}

export function loadIncidentReportError(error){
    return{
        type:'LOAD_INCIDENTS_REPORT_ERROR',error,
    }
}

export function getRegions(accessToken){
    
    return function (dispatch){
        let requestUrl = apiRequest.sercviceBaseUrl+apiRequest.incidents.regions; 
        try{
             console.log("requestUrl",requestUrl)
        return fetch(requestUrl, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                  },
        }).then((response) => response.json())
             .then((responseJson)=>{
             console.log('regionsResponse',responseJson)
            dispatch(loadRegionsSuccess(reportResponse));
         });

        }catch(error){
             dispatch(loadRegionsError(error));
        }
       
    }
}

export function loadRegionsSuccess(reportResponse){
    return{
        type:'LOAD_REGIONS_SUCCESS',reportResponse,
    }
}

export function loadRegionsError(error){
    return{
        type:'LOAD_REGIONS_ERROR',error,
    }
}

export function getChannels(accessToken){
    
    return function (dispatch){
        let requestUrl = apiRequest.sercviceBaseUrl+apiRequest.incidents.channels; 
        try{
             console.log("requestUrl",requestUrl)
        return fetch(requestUrl, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                  }
        }).then((response) => response.json())
             .then((responseJson)=>{
             console.log('regionsResponse',responseJson)
            dispatch(loadChannelsSuccess(reportResponse));
         });

        }catch(error){
             dispatch(loadChannelsError(error));
        }
       
    }
}

export function loadChannelsSuccess(reportResponse){
    return{
        type:'LOAD_CHANNELS_SUCCESS',reportResponse,
    }
}

export function loadChannelsError(error){
    return{
        type:'LOAD_CHANNELS_ERROR',error,
    }
}

export function getArea(accessToken){
    
    return function (dispatch){
        let requestUrl = apiRequest.sercviceBaseUrl+apiRequest.incidents.area; 
        try{
             console.log("requestUrl",requestUrl)
        return fetch(requestUrl, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                  }
        }).then((response) => response.json())
             .then((responseJson)=>{
             console.log('areasResponse',responseJson)
            dispatch(loadAreaSuccess(reportResponse));
         });

        }catch(error){
             dispatch(loadAreaError(error));
        }
       
    }
}

export function loadAreaSuccess(reportResponse){
    return{
        type:'LOAD_AREAS_SUCCESS',reportResponse,
    }
}

export function loadAreaError(error){
    return{
        type:'LOAD_AREAS_ERROR',error,
    }
}