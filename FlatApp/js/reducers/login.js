const initialState = {
   credetials:{
       username:'',
       password:'',
   },
    currentUser:null,
    loginError:'',
    newUser:null,
}

export default function login(state = initialState, actions){

    switch(actions.type){
        case "LOAD_AUTHENTICATION_REQUEST_SUCCESS":
            return {...state,
                   currentUser:actions.currentUser};
        case "LOAD_AUTHENTICATION_REQUEST_ERROR":
            return {...state,
                   loginError:actions.error};
        case "LOAD_SIGNUP_REQUEST_SUCCESS":
            return {...state,
                   newUser:actions.responseJson};
        case "LOAD_SIGNUP_REQUEST_ERROR":
            return {...state,
                   signupError:actions.error};
        default:
            return state;
           }
}