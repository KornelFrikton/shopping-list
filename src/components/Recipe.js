import React, { useState } from 'react'
import '../css/Recipe.css';

export default function Recipe({name, instruction, picture, video, handleAdd}) {
    
    const [noInst, setNoInst] = useState([]);
    const [showInst, setShowInst] = useState(true);

    //Show/hide the instruction
    const details = showInst ? noInst : instruction;
    const handleShow = () => {
        setShowInst((oldState) => !oldState);
    }

    return (
        <div className="recipe" >
            <h2>{name}</h2>
            <div className="media">
                <img className="pic" src={picture} alt={name} />
                
                <div className="vid">
                <iframe className="respvid" title={name} src={video}></iframe>
                </div>
            
            </div>

            <div className="buttons">
                <button type="button" onClick={handleShow}>
                Show or hide the instructions</button>
                <button type="submit" onClick={handleAdd}>
                Add all ingredients to the shopping list
                </button>
            </div>

            <div className="details">
                <h3>Instructions for {name}</h3> 
                {details}
            </div>
        </div>
    )
}
