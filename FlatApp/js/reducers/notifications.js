const initialState = {
   notifications:[],
   notificationsError:''
}

export default function notifications(state = initialState, actions){

    switch(actions.type){
        case "LOAD_NOTIFICATIONS_REQUEST_SUCCESS":
            return {...state,
                   notifications:actions.responseJson};
        case "LOAD_NOTIFICATIONS_REQUEST_ERROR":
            return {...state,
                   notificationsError:actions.error};
        default:
            return state;
           }
}