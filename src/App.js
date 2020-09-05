import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import shortid from "shortid";
///Importing components
import Recipe from "./Components/Recipe";
import APP_ID, { APP_KEY } from "./keys";

const App = () => {
  ///States
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  ///Effects
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const newHits = [];
        data.hits.map((item) => {
          newHits.push([
            {
              title: item.recipe.label,
              calories: item.recipe.calories,
              image: item.recipe.image,
              ingredients: item.recipe.ingredients,
              uuid: uuidv4(),
            },
          ]);
        });
        console.log(newHits);
        setRecipes(newHits);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    setQuery(search);
    e.preventDefault();
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form" action="">
        <input
          onChange={handleSearch}
          className="search-bar"
          type="text"
          value={search}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => {
          return (
            <Recipe
              title={recipe[0].title}
              calories={recipe[0].calories}
              image={recipe[0].image}
              ingredients={recipe[0].ingredients}
              key={recipe[0].uuid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
