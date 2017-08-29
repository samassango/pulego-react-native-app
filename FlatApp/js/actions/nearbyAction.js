import { apiRequest, googleApiRequest, googleApiDirectionsRequest } from '../utils/api';

export function loadGooglePlacesSuccess(responseJson){
     return{
        type:'LOAD_GOOGLE_PLACES_REQUEST_SUCCESS',responseJson,
    }
}

export function loadGooglePlacesError(error){
    return{
        type:'LOAD_GOOGLE_PLACES_REQUEST_ERROR',error
    }
}

export function loadGooglePlaceStarted(){
    return{type:'LOAD_GOOGLE_PLACES_REQUEST_STARTED',}
}

export function loadGooglePlacesRequest(lat, lon, type, radius, keyword){
    
    return function (dispatch){
        dispatch(loadGooglePlaceStarted())
        let googleRequestUrl = googleApiRequest(lat, lon, type, radius, keyword); 
    
        console.log("googlePlacesRequestUrl",googleRequestUrl)
        try{
        
        return fetch(googleRequestUrl, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  }}).then((response) => response.json())
             .then((responseJson)=>{
             console.log('googlePlacesResponse',responseJson)
         
             dispatch(loadGooglePlacesSuccess(responseJson));
         });

        }catch(error){
           dispatch(loadGooglePlacesError(error));
        }
       
    }
}

export function loadGoogleDirectionSuccess(responseJson){
     return{
        type:'LOAD_GOOGLE_DIRECTION_REQUEST_SUCCESS',responseJson,
    }
}

export function loadGoogleDirectionError(error){
    return{
        type:'LOAD_GOOGLE_DIRECTION_REQUEST_ERROR',error
    }
}

export function loadGoogleDirectionStarted(){
    return{type:'LOAD_GOOGLE_DIRECTION_REQUEST_STARTED',}
}

export function loadGoogleDirectionRequest(currentVicinity,destinationVicinity){
    
    return function (dispatch){
        dispatch(loadGoogleDirectionStarted())
        let googleRequestUrl = googleApiDirectionsRequest(currentVicinity,destinationVicinity); 
    
        console.log("googleDirectionRequestUrl",googleRequestUrl)
        try{
        
        return fetch(googleRequestUrl, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  }}).then((response) => response.json())
             .then((responseJson)=>{
             console.log('googleDirectionResponse',responseJson)
         
             dispatch(loadGoogleDirectionSuccess(responseJson));
         });

        }catch(error){
           dispatch(loadGoogleDirectionError(error));
        }
       
    }
}