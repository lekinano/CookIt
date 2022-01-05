import React from "react";
import PropTypes from "prop-types";
import { Loader } from "../../ui";
export default function Recipes({ recipes, onClick }) {
  if (recipes === null) {
    return <Loader />;
  }
  return (
    <div className="flex flex-row flex-wrap content-start min-w-full justify-center my-4 min-h-screen">
      {recipes.map((recipe) => (
        <Recipe recipe={recipe} key={recipe.id} onClick={onClick} />
      ))}
    </div>
  );
}
Recipes.propTypes = {
  recipes: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};
function Recipe({ recipe, onClick }) {
  return (
    <div className="flex flex-col m-9 border shadow p-6 rounded bg-gray-300 items-center">
      <h2 className="text-xl caret-gray-800">{recipe.title}</h2>
      <p className="">{recipe.short}</p>
      <a
        href="#"
        className="inline-flex my-2 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => onClick(recipe)}
      >
        Discover
      </a>
    </div>
  );
}
