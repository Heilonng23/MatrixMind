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
    isSignedIn: false
}

class App extends Component {

    constructor() {
        super();
        this.state = initialState;
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bouding_box;

        const image = document.getElementById('inputImage');

        const width = Number(image.width);
        const height = Number(image.height);

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.righ_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }


    displayFaceBox = (box) => {
        this.setState({ box: box })
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onBtnSubmit = () => {
        this.setState({ imgUrl: this.state.input });

        fetch('http://localhost:3000/imgUrl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: this.state.input
            })
        })
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
                        .catch(console.log)
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
                        <Rank />
                        <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit} />
                        <FaceRecognition box={box} imgUrl={imgUrl} />
                     </div>
                    :(route === 'signin' 
                     ?<Signin onRouteChange={this.onRouteChange}/>
                     :<Register onRouteChange={this.onRouteChange}/>
                    )
                }

            </div>
        );
    }
}

export default App;
