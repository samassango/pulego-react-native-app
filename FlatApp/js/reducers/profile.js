const initialState = {
   profile:null,
   profileError:''
}

export default function profile(state = initialState, actions){

    switch(actions.type){
        case "LOAD_PROFILE_REQUEST_SUCCESS":
            return {...state,
                   profile:actions.responseJson};
        case "LOAD_PROFILE_REQUEST_ERROR":
            return {...state,
                  profileError:actions.error};
        default:
            return state;
           }
}