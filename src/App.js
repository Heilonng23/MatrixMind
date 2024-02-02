import React, { Component } from 'react';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import './App.css';

const initialState = {
    input: '',
    imgUrl: ' ',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////

   
    


class App extends Component {

    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user:{
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }
    
    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box: box })
    }
    
    ClarifaiRequestOptions = (imgUrl) => {
        const PAT = '65994726c8584070ab887847455b1490';
        const USER_ID = 'fver1b6m1eh4';
        const APP_ID = 'test';
        const IMAGE_URL = imgUrl;

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                            // "base64": IMAGE_BYTES_STRING
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };

        return requestOptions;
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onBtnSubmit = () => {
        this.setState({ imgUrl: this.state.input });

        fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", this.ClarifaiRequestOptions(this.state.input))
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count }))
                        })
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    }

    onRouteChange = (route) =>{ 
        if(route === 'signout'){
            this.setState(
                {
                    isSignedIn: false
                }
            )
        }else if(route === 'home'){
            this.setState(
                {
                    isSignedIn: true
                }
            )
        }
        this.setState({route: route});
    }

    render() {
        const {isSignedIn, imgUrl, route, box } = this.state;
        return (
            <div className="App">
                <Particles options={particlesOptions} init={main => { loadFull(main) }} />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                {route === 'home'
                    ?<div>
                        <Logo />
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                        <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit} />
                        <FaceRecognition box={box} imgUrl={imgUrl} />
                     </div>
                    :(route === 'signin' 
                     ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                     :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    )
                }

            </div>
        );
    }
}

export default App;
