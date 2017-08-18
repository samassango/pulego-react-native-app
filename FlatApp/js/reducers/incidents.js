const initialState = {
   reportResponse:null,
   reportError:null
}

export default function incidents(state = initialState, actions){

    switch(actions.type){
        case "LOAD_INCIDENTS_REPORT_SUCCESS":
            return {...state,
                   reportResponse:actions.reportResponse};
        case "LOAD_INCIDENTS_REPORT_ERROR":
            return  {...state,
                   reportError:actions.error};
        case "LOAD_REGIONS_SUCCESS":
            return {...state,
                   regionsResponse:actions.reportResponse};
        case "LOAD_REGIONS_ERROR":
            return  {...state,
                   regionsError:actions.error};
           case "LOAD_CHANNELS_SUCCESS":
            return {...state,
                   chnnelsResponse:actions.reportResponse};
        case "LOAD_CHANNELS_ERROR":
            return  {...state,
                   chnnelsError:actions.error};
        case "LOAD_AREAS_SUCCESS":
            return {...state,
                   areasResponse:actions.reportResponse};
        case "LOAD_AREAS_ERROR":
            return  {...state,
                   areasError:actions.error};
        default:
            return state;
           }
}