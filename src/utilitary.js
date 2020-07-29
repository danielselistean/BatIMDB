import React from 'react';
import Bounce from './Theme/Styledcomponents/Bounce';
import { themeDark, themeLight } from './Theme/Theme';


//fcts for sync-ing global state and locaStorage at /reg/rogin/logout
export function storeGlobalState(isAuth, token, user){
    localStorage.setItem('auth', isAuth);
    localStorage.setItem('token', token);
    localStorage.setItem('user', user)
}
export function getGlobalState(){
    const isAuth = localStorage.getItem('auth');
    const userToken = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const themeA = localStorage.getItem('themeA') ?
            JSON.parse(localStorage.getItem('themeA')) :
            themeLight

    return {
        auth: isAuth,
        token: userToken,
        user: user,
        setTheme: themeA
    }
}
export function clearLocalstorage(){
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}
//fct to create className based on theme
export const createClassName =(theme, className) =>{
    return `${className} ${theme}`
}
//fct to dispel batman infidels
export function NoBatman(theme){
    return(
        <div className={createClassName(theme, 'errorContainer')}>
            <Bounce>
                <h4>Batman Forever</h4>
            </Bounce> 
               <p>This is not a <span>Batman</span> movie!</p>
        </div>
    )
}
