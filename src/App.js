import React, { Component } from 'react';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import './App.css';

// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '65994726c8584070ab887847455b1490';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'fver1b6m1eh4';
const APP_ID = 'test';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';  
    
const setupClarifaiRequest =(imgUrl) => {
    const IMAGE_URL = imgUrl;
    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

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

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    return requestOptions;
}

class App extends Component {
    
    constructor() {
        super();
        this.state ={
            input: '',
            imgUrl: ' '
        }
    }

    onInputChange= (event) =>{
        this.setState({input : event.target.value});
    }

    onBtnSubmit = () =>{
        this.setState({
            imgUrl: this.state.input
        })

        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID  + "/outputs", setupClarifaiRequest(this.state.input))
        .then(response => response.json())
        .then(response => {
            if(response){
                fetch('http://localhost:3000/image',{
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                .then(response => response.json())
                .then(count => {
                    this.setState(Object.assign(this.state.user, {entries: count}))
                })
            }
        })
        .catch(error => console.log('error', error));
    }

    render (){
        return (
            <div className="App">
                <Particles options={particlesOptions} init={ main => {loadFull(main)} }/>
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit}/>
                <FaceRecognition  imgUrl={this.state.imgUrl}/>
            </div>
        );
    }   
}

export default App;
