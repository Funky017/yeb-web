import { getRequest } from './api'


export const initMenu = (router, store) => {
    if(store.state.routes.length>0) {
        return;
    } 
    getRequest('/sy')
}