const initialState = {
   notifications:[],
   notificationsError:'',
    isLoadingNotifications:false,
    detailNotification:'',
    detailNotificationError:'',
    isLoadingDetailNotification: true,
}

export default function notifications(state = initialState, actions){

    switch(actions.type){
        case "LOAD_NOTIFICATIONS_REQUEST_STARTED":
            return {...state,
                   isLoadingNotifications:true}
        case "LOAD_NOTIFICATIONS_REQUEST_SUCCESS":
            return {...state,
                   notifications:actions.responseJson,
                   isLoadingNotifications:false};
        case "LOAD_NOTIFICATIONS_REQUEST_ERROR":
            return {...state,
                   notificationsError:actions.error,
                   isLoadingNotifications:false};
        case "LOAD_NOTIFICATIONS_DETAIL_REQUEST_STARTED":
            return {...state,
                   isLoadingDetailNotification: true};
        case "LOAD_NOTIFICATIONS_DETAIL_REQUEST_SUCCESS":
            return {...state,
                    detailNotification:actions.responseJson,
                   isLoadingDetailNotification: false}
        case "LOAD_NOTIFICATIONS_DETAIL_REQUEST_ERROR":
            return {...state,
                    detailNotificationError:actions.error,
                   isLoadingDetailNotification: false}
        default:
            return state;
           }
}