import Cookies from 'js-cookie';

export function saveTokenInCookie(token : string){
    Cookies.set('token', token);
}

export function saveUserIdInCookie(id : string){
    Cookies.set('userId', id);
}

// export function saveUserInCookie(userAuth : userAuth){
//     Cookies.set('user', userAuth);
// }

export function getItemFromContext(context: any, item: string) : string {
    const allCookiesStr = context.req.headers.cookie as string
    const keyValuePairs: string[] = allCookiesStr.split('; ');

    const dataMap: { [key: string]: string } = {};
    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split('=');
      dataMap[key] = value;
    });

    const itemValue = dataMap[item];

    return itemValue 
}