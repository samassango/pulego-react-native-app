export const apiRequest ={
    sercviceBaseUrl:'https://tshwanesafetyapi.herokuapp.com/api',
    authenticate:{
        login:'/TshwaneUsers/login',
        logout:'/TshwaneUsers/logout',
        profile:'/TshwaneUsers/:id'
    },
    createUserAccount:'/TshwaneUsers',
    createOrReplaceUserAccount:'/TshwaneUsers/replaceOrCreate',
    passwortReset:{
        resetWithEmail:'/TshwaneUsers/reset',
        resetwithResetToken:'/TshwaneUsers/reset-password'
    },
    categories:{
    list:'/Categories',
        subCategories:{
            list:'/Categories/:categoryId/subCategories'
        }
    },
    incidents:{
        postIncident:'/Incidents',
        area:'/Areas',
        channels:'/Channels',
        regions: '/Regions',
    },
    enquiries:{
        postEnquiry:'/Enquiries',
        types:"/InquiryTypes",
    },
    reqisterDevice:'/RegisteredDevices',
    tokenRequest:'/Users/:userId/accessTokens',
   notifications: '/Notifications',
    viewNotification: '/Notifications/:notificationId',
};

export function googleApiRequest(lat, lon, type, radius, keyword){
//    let googlePlaces = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lon+'&radius='+radius+'&type='+type+'&keyword='+keyword+'&key=AIzaSyBlPw7OtX7_n2qXvJjGpztklBM52okqRkE';
        let googlePlaces = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lon+'&radius='+radius+'&type='+type+'&key=AIzaSyBlPw7OtX7_n2qXvJjGpztklBM52okqRkE';
    return googlePlaces;
}

