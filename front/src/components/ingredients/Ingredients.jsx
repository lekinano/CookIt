import React, { useState } from "react";
import PropTypes from "prop-types";
import { Loader, Button } from "../../ui/index";
import log from "tailwindcss/lib/util/log";
import { CreateIngredient } from "../index";
export default function Ingredients({
  ingredients,
  onDelete,
  toggleNewIngredient,
}) {
  return (
    <div className="flex flex-col p-3 items-center m-w-full">
      <h1 className="text-3xl font-bold">Ingredients</h1>
      {ingredients && ingredients.length > 0 ? (
        <>
          <IngredientsList ingredients={ingredients} onDelete={onDelete} />
          <CreateIngredient toggleNewIngredient={toggleNewIngredient} />
        </>
      ) : ingredients && ingredients.length === 0 ? (
        `No ingredients`
      ) : (
        <Loader />
      )}
    </div>
  );
}
Ingredients.propTypes = {
  ingredients: PropTypes.array,
};

// TODO: fix le bug des ingrédients (pb d'async)
function IngredientsList({ ingredients, onDelete }) {
  console.log({ ingredients });
  return (
    <ul>
      {ingredients.map((ing) => (
        <Ingredient key={ing.id} ingredient={ing} onDelete={onDelete} />
      ))}
    </ul>
  );
}
export function Ingredient({ ingredient, onDelete }) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onDelete(ingredient);
    setLoading(false);
  };
  return (
    <li className="">
      {ingredient.title}
      <Button onClick={handleDelete} disabled={loading} loading={loading}>
        Delete
      </Button>
    </li>
  );
}
