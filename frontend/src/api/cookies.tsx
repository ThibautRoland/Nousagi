import Cookies from 'js-cookie';

export function saveTokenInCookie(token : string){
    Cookies.set('token', token);
}

export function saveUserIdInCookie(id : string){
    Cookies.set('userId', id);
}