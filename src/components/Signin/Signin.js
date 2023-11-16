import React from "react";

const Signin = ({ onRouteChange }) => {
    return (
        <article className="br3 ba  b--black-10 mv4 w-100 w-5className0-m w-25-l mw7 shadow-5 center">
            <main className="pa3 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f3" htmlFor="email-address">Email</label>
                            <input className="pa2 f4 input-reset ba bg-transparent  w-110" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f3" htmlFor="password">Password</label>
                            <input className="b f4 pa2 input-reset ba bg-transparent  w-110" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div>
                        <input 
                            onClick={() => onRouteChange('home')}
                            className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f3 dib" 
                            type="submit" 
                            value="Sign in" 
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f5 link dim black db pointer">Register</p>
                    </div>
                </form>
            </main>
        </article>
    );
}

export default Signin