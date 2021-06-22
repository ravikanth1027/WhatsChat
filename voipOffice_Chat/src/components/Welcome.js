import React from 'react'
import introImg from '../assets/intro-whatsapp.jpg'
import voipImg from '../assets/SVG.png'

export default function Welcome() {
    return (
        <div className="welcome">
            <img src={voipImg} alt="" />
            <h2>Keep your phone connected</h2>
        </div>
    )
}
