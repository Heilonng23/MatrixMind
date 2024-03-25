import React from "react";

const Navigation = ({onRouteChange , isSignedIn}) => {

    if(isSignedIn){
        return (
            <nav style={{ display: 'flex', justifyContent: 'center' }}>
                <p onClick={() => onRouteChange('signout')} className="f3 link dim white pa4 pointer">
                    Sign Out
                </p>
            </nav>
        );
    }else{
        return (
            <nav style={{ display: 'flex', justifyContent: 'center' }}>
                <p onClick={() => onRouteChange('register')} className="f3 link dim white pa3 pointer">
                    Register
                </p>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim white pa3 mr3 pointer">
                    Sign In
                </p>
            </nav>
        );
    }
    
}
export default Navigation