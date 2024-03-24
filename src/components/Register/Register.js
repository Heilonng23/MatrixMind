import React, {Component} from "react";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onNameChange = (event) =>{
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) =>{
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({password: event.target.value});
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render(){
        const { onRouteChange } = this.props;

        return (
            <article className="br3 ba  b--black-10 mv4 w-100 w-5className0-m w-25-l mw7 shadow-5 center">
                <main className="pa3 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 center">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f3" htmlFor="email-address">Name</label>
                                <input 
                                onChange={this.onNameChange}
                                className="pa2 f4 input-reset ba bg-transparent  w-110" 
                                type="text" 
                                name="name" 
                                id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f3" htmlFor="email-address">Email</label>
                                <input 
                                onChange={this.onEmailChange}
                                className="pa2 f4 input-reset ba bg-transparent  w-110" 
                                type="email" 
                                name="email-address" 
                                id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f3" htmlFor="password">Password</label>
                                <input 
                                onChange={this.onPasswordChange}
                                className="b f4 pa2 input-reset ba bg-transparent  w-110" 
                                type="password" 
                                name="password" 
                                id="password" />
                            </div>
                        </fieldset>
                        <div>
                            <input
                                onClick={this.onSubmitRegister}
                                className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f3 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register