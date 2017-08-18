const initialState = {
   googlePlaces:null,
   googleError:null,
   googleLoading: false,
   statusRequest:"unactive",
   
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
        default:
            return state;
           }
}