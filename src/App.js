import React, { useEffect, useState }  from "react";
import  Recipe  from "./Recipe";
import "./App.css"
import Logo from "./logo1.jpg";

function  App ()  {

  const APP_ID = "1c3f8b3b";
  const APP_KEY = "16d70038957db8ddd5d5de98d2936ba9";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
   
  useEffect ( () => {
    getRecipes();
  },[query]);


  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}s&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  
  

  return (
    <div className="App"> 
    <br />
      <img className="logo" src={Logo} alt="website logo" />
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit" placeholder="search recipes">
          Search
        </button> 
      </form>
      <div className="Recipes">
      {recipes.map(recipe => (
      <Recipe className="recipe"
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
      />
      ))}
      </div>
    </div>

  );
}





export default App;
