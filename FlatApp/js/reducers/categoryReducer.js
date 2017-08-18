
const initialState = {
    selectedCategory:'',
}

export default function categoryReducer(state = initialState, actions){
    console.log(actions);
    switch(actions.type){
   
        case 'LOAD_LIST_CATEGORIES_SUCCESSFUL':
             console.log('success',actions);
              return {...state,
                   categoriesList: actions.response};
        case 'LOAD_SELECTED_CATEGORY':
            console.log("Request",actions)
            return {...state, 
                    selectedCategory:actions.category};
        case 'LOAD_LIST_CATEGORIES_TYPE_SUCCESSFUL':
            return {...state,
                   selectedTypesList:actions.response}
        default:
            return state;
           }
}