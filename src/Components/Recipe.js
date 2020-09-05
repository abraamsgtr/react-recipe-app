import React from "react";
import style from "./recipe.module.css";

const Recipe = (props) => {
  return (
    <div className={`${style.recipe} col-lg-4 col-md-6`}>
      <h1 style={{ color: "#ffa372" }}>{props.title}</h1>
      <h2 className={style.ingredientsTitle}>Ingredients</h2>
      <ul className={style.ingredientsUl}>
        {props.ingredients.map((ingredient) => {
          return <li className={style.ingredientsLi}>{ingredient.text}</li>;
        })}
      </ul>
      <p className={style.calorie}>
        Calories : {Math.round(props.calories * 100) / 100}
      </p>
      <img className={style.image} src={`${props.image}`} alt="Food" />
    </div>
  );
};

export default Recipe;
