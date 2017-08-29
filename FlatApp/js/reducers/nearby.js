const initialState = {
   googlePlaces:null,
   googleError:null,
   googleLoading: false,
   statusRequest:"unactive",
   googleDirections:null,
    googleDirectionsLoading:false,
    statusDirectionsRequest:'unactive',
}

export default function nearby(state = initialState, actions){

    switch(actions.type){
        case "LOAD_GOOGLE_PLACES_REQUEST_STARTED":
             return {...state,statusRequest:"active"};
        case "LOAD_GOOGLE_PLACES_REQUEST_SUCCESS":
            return {...state,
                   googlePlaces:actions.responseJson,
                   googleLoading:true,statusRequest:"unactive"};
        case "LOAD_GOOGLE_PLACES_REQUEST_ERROR":
            return {...state,
                   googleError:actions.error,
                    googleLoading:false,statusRequest:"unactive"};
            
        case "LOAD_GOOGLE_DIRECTION_REQUEST_STARTED":
             return {...state,statusDirectionsRequest:"active"};
        case "LOAD_GOOGLE_DIRECTION_REQUEST_SUCCESS":
            return {...state,
                   googleDirections:actions.responseJson,
                   googleDirectionsLoading:true,statusDirectionsRequest:"unactive"};
        case "LOAD_GOOGLE_DIRECTION_REQUEST_ERROR":
            return {...state,
                   googleError:actions.error,
                    googleDirectionsLoading:false,statusDirectionsRequest:"unactive"};
        default:
            return state;
           }
}