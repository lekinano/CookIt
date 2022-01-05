// @flow
import React from "react";
import PropTypes from "prop-types";

export default function Recipe({ recipe }) {
  return (
    <div>
      <h1>Recipe Details</h1>
      <h1>{recipe.title}</h1>
    </div>
  );
}

Recipe.propTypes = {
  recipes: PropTypes.object.isRequired,
};
