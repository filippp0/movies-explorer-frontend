import React from 'react'
import './Preloader.css'

const Preloader = ({name}) => {
    return (
        <div className={`preloader ${name === 'button' ? 'preloader_type_button' : ''}`}>
            <div className={`preloader__container ${name === 'button' ? 'preloader__container_type_button' : ''}`}>
                <span className={`preloader__round ${name === 'button' ? 'preloader__round_type_button' : ''}`}></span>
            </div>
        </div>
    )
};

export default Preloader
