import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';


const Logo = () => {
    return (
        <div className="ma2 mt2">
            <Tilt
                className="parallax-effect-img Tilt br3 shadow-5"
                tiltMaxAngleX={40}
                tiltMaxAngleY={40}
                perspective={800}
                transitionSpeed={1500}
                scale={1.1}
                gyroscope={true}
                option={{max: 25}}
                style={{width: '150px', height: '150px'}}
            >
                <div className="Tilt-inner">
                    <img src={brain} className="inner-element" alt="logo" />
                </div>
                
            </Tilt>
        </div>
    );
}

export default Logo