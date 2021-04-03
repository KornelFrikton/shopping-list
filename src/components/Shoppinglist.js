import React, {useState, useEffect} from 'react';
import '../css/Shoppinglist.css';

export default function Shoppinglist({name, measures, handleReset, ingredientPicture}) {
    
    const [measure, setMeasure] = useState(measures)
    const [picture, setPicture] = useState(ingredientPicture)

    //Jumping to the top of the page after rendering
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    //Collecting the checked ingredients
    let checkedList = [];
    const handleClick = (e) => {  
        if (e.target.checked) {
           checkedList.push(e.target.id);
        } else { 
            checkedList = checkedList.filter(item => item !== e.target.id);
        }
    }

    //Deleting the checked ingredients
    const handleClear = () => {
        let newMeasure = [];
        let newPicture = [...picture];
        let delIndex = [];

        //Getting the index of checked items
        for (let i=checkedList.length-1; i>-1; i--) { 
            delIndex.push(measure.findIndex(item => checkedList[i].includes(item)));
            delIndex.sort((a, b) => b-a);
        }

        //Deleting the checked picture
        for (let i=0; i<checkedList.length; i++) {          
           newPicture.splice(delIndex[i],1);
        }
       
        //Getting the unchecked list
        newMeasure = measure.filter(item => !checkedList.includes(item));

        setPicture(newPicture);
        setMeasure(newMeasure);   
        window.scrollTo(0, 0);
    }

    //Reloading the ingredients
    const handleReload = (e) => {
        e.preventDefault();
        setMeasure(measures);
        setPicture(ingredientPicture);
        window.scrollTo(0, 0);
    }

    return (
        <div>
        <div className="coverpage"></div>
            <form>
                <div className="recName">
                    <h2>Shopping list</h2>
                    {name}
                </div>
                                                         
                <div className="flex">
                    <div className="column1">
                    {measure.map( (x, index) => <div className="ingredient"><input type="checkbox" onClick={handleClick} id={x} key={index}/> <label htmlFor={x}> {x}</label> </div>)}
                    </div>
                    <div className="column2">
                    {picture.map( (x, index) => <div className="ingPicture"><img src={x} alt={x} key={index}/></div>)} 
                    </div>
                </div>
                                                            
                <div>
                    <button type="reset" onClick={handleClear}>Delete selected</button>
                </div>
                <div>    
                    <button type="submit" onClick={handleReload}>Reload the list</button>
                </div>
                <div>
                    <button type="reset" onClick={handleReset}>Delete the list</button>
                </div>                  
            </form>
        </div>
    )
}
