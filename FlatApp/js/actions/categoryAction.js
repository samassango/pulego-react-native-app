import type { Action } from './types';
export const LOAD_LIST_CATEGORIES_SUCCESSFUL = 'LOAD_LIST_CATEGORIES_SUCCESSFUL';
export const LOAD_LIST_CATEGORIES_TYPE_SUCCESSFUL = 'LOAD_LIST_CATEGORIES_TYPE_SUCCESSFUL';
import { apiRequest } from '../utils/api';
import { getAbsoluteApiUrl } from '../utils/utilsHelper';

export function selectedCategory(category){
    return{
        type:'LOAD_SELECTED_CATEGORY',category,
    }
}

export function loadCategories(){
    return{
        type:'LOAD_LIST_CATEGORIES',
    }
}

export function loadCategoriesSuccess(response){
    return{
        type: LOAD_LIST_CATEGORIES_SUCCESSFUL,response,
    }
}

export function loadCategoriesError(error){
    return{
        type:'LOAD_LIST_CATEGORIES_ERROR',error,
    }
}

export function loadCategoriesTypeSuccess(response){
    return{
        type: LOAD_LIST_CATEGORIES_TYPE_SUCCESSFUL,response,
    }
}

export function loadCategoriesTypeError(error){
    return{
        type:'LOAD_LIST_CATEGORIES_TYPE_ERROR',error,
    }
}


export function loadCategoriesRequest(){
    return function (dispatch){
        let requestUrl = apiRequest.sercviceBaseUrl+apiRequest.categories.list; 
        try{
            
        return fetch(requestUrl)
             .then((response) => response.json())
             .then((responseJson)=>{
             console.log('categoriesResponse',responseJson)
            dispatch(loadCategoriesSuccess(responseJson));
         });

        }catch(error){
             dispatch(loadCategoriesError(error));
        }
       
    }
}

export function loadCategoriesTypeRequest(categoryId){
    
    return function (dispatch){
        let sourceUrl = apiRequest.sercviceBaseUrl+apiRequest.categories.subCategories.list; 
        let requestUrl = getAbsoluteApiUrl(sourceUrl, {categoryId:categoryId})
        console.log("requestUrl",requestUrl)
        try{
            
        return fetch(requestUrl)
             .then((response) => response.json())
             .then((responseJson)=>{
             console.log('categoriesTypeResponse',responseJson)
         
             dispatch(loadCategoriesTypeSuccess(responseJson));
         });

        }catch(error){
           dispatch(loadCategoriesTypeError(error));
        }
       
    }
}