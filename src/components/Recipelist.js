import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import Shoppinglist from './Shoppinglist';
import '../css/Recipelist.css';

export default function Recipelist() {
    const [recipes, setRecipes] = useState([]);
    const [ingredientsAll, setIngredientsAll] = useState([]);

    const url = "https://www.themealdb.com/api/json/v1/1/random.php";
    
    //Getting a new meal
    const handleNewMeal = (e) => {
        e.preventDefault();
        setRecipes([]);
    }
    
    useEffect(() => {
        if (recipes.length === 0) {
          fetch(url)
            .then((resp) => resp.json())
            .then((recipes) => {
                //const meal = recipes.meals[0];
                function getRecipe(meal) {
                    return {
                        name: meal.strMeal,
                        id: meal.idMeal,
                        picture: meal.strMealThumb,
                        ingredients: collectIng(meal),
                        measures: collectMes(meal),
                        instruction: meal.strInstructions,
                        video: replaceLink(meal),
                        ingredientPicture: pictureIng(meal),
                    };
                }
                const recipeSum = recipes.meals.map(getRecipe);
                setRecipes(recipeSum);               
            });
        };
    });
    
    //Gnerating the link of the ingredient picture
    const pictureIng = (meal) => {
        const picIng = [];
            for (let ingredients in meal) {
                for (let i=1; i<21; i++){
                    if (ingredients === `strIngredient${i}` && `${meal[ingredients]}` !== "" && `${meal[ingredients]}` !== "null") {
                        picIng.push(`https://www.themealdb.com/images/ingredients/${meal[ingredients]}.png`);
                    }  
                }
            }   
        return picIng;
    }

    //Correcting the Youtube link
    const replaceLink = (meal) => {
        const oldYoutube = meal.strYoutube;
        const newYoutube = oldYoutube.replace("watch?v=","embed/");
        return newYoutube;
    }

    //Collecting the ingredients
    const collectIng = (meal) => {
        const allIng = [];
        for (let ingredients in meal) {
            for (let i=1; i<21; i++){
                if (ingredients === `strIngredient${i}` && `${meal[ingredients]}` !== "" && `${meal[ingredients]}` !== "null" ) {
                    allIng.push(`${meal[ingredients]}`);
                }  
            }
        }
        return allIng;
    }

    //Collecting the measures
    const collectMes = (meal) => {
        const allMes = [];
        for (let measures in meal) {
            for (let i=1; i<21; i++){
                if (measures === `strMeasure${i}` && `${meal[measures]}` !== " " && `${meal[measures]}` !== "" && `${meal[measures]}` !== "null" ) {
                    allMes.push(`${meal[measures]} ${meal[`strIngredient${i}`]}`);
                }  
            }
        }
        return allMes;
    }

    //Adding all ingredients to the shopping list
    const handleAdd = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);  
        alert('You have added all ingredients to the shopping list.');
        setIngredientsAll(ingredientsList);
    }

    //Deleting the shopping list
    const handleReset = (e) => {
        e.preventDefault();
        setIngredientsAll(ingredientsAll);
    }

    const recipeList = recipes.map((recipe) => (
        <Recipe 
        name={recipe.name}
        id={recipe.id}
        key={recipe.id}
        picture={recipe.picture}
        handleAdd={handleAdd}
        instruction={recipe.instruction}
        video={recipe.video}
        />
    ));

    const ingredientsList = recipes.map((recipe) => (
        <Shoppinglist 
        name={recipe.name}
        id={recipe.id}
        key={recipe.id}
        picture={recipe.picture}  
        measures={recipe.measures}
        handleReset={handleReset}
        ingredientPicture={recipe.ingredientPicture}
        />
    ));

    return (
        <div>
            <button type="submit" onClick={handleNewMeal}>
            Get a random meal
            </button>
            {recipeList}
            {ingredientsAll}
        </div>
    )
}
