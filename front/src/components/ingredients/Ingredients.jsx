import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { Loader, Button } from "../../ui/index";
import { CreateIngredient } from "../index";
import { TrashIcon, UploadIcon } from "@heroicons/react/solid";
import { ApiErrors } from "../../utils/api";
import { Field } from "../../ui";
export default function Ingredients({
  ingredients,
  onDelete,
  onAdd,
  onUpdate,
}) {
  return (
    <div className="flex flex-col p-3 items-center m-w-full">
      <h1 className="text-3xl font-bold">Ingredients</h1>
      {ingredients && ingredients.length > 0 ? (
        <>
          <IngredientsList
            ingredients={ingredients}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
          <CreateIngredient onAdd={onAdd} />
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
function IngredientsList({ ingredients, onDelete, onUpdate }) {
  console.log({ ingredients });
  return (
    <div>
      {ingredients.map((ing) => (
        <Ingredient
          key={ing.id}
          ingredient={ing}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
const Ingredient = memo(function ({ ingredient, onDelete, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onDelete(ingredient);
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onUpdate(ingredient, new FormData(e.target));
      setErrors([]);
    } catch (err) {
      if (err instanceof ApiErrors) {
        setErrors(err.errors);
      } else {
        throw err;
      }
    }
    setLoading(false);
  };
  const errorFor = (field) => {
    const error = errors.find((e) => e.field === field);
    if (error) {
      return error.message;
    }
    return null;
  };
  return (
    <form className="flex flex-row flex-nowrap w-full" onSubmit={handleSubmit}>
      <Field
        name="title"
        type="text"
        defaultValue={ingredient.title}
        className="mx-2"
        error={errorFor("title")}
      />
      <label
        htmlFor="unit"
        className="block text-sm font-medium text-gray-700 hidden"
      >
        Unit
      </label>
      <select
        id="unit"
        name="unit"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        defaultValue={ingredient.unit}
      >
        <option>grams</option>
        <option>liters</option>
        <option>kilograms</option>
      </select>
      <Button loading={loading} type="submit">
        <UploadIcon
          className="h-5 w-5 text-white group-hover:text-indigo-400"
          aria-hidden="true"
        />
      </Button>
      <Button
        type="delete"
        onClick={handleDelete}
        disabled={loading}
        loading={loading}
      >
        <TrashIcon
          className="h-5 w-5 text-white group-hover:text-indigo-400"
          aria-hidden="true"
        />
      </Button>
    </form>
  );
});
