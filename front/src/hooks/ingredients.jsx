import { useCallback, useReducer } from "react";
import { apiFetch } from "../utils/api";

function reducer(state, action) {
  console.log("INGREDIENTS REDUCE", action.type, action);
  switch (action.type) {
    case "FETCHING_INGREDIENTS":
      return { ...state, loading: true };
    case "SET_INGREDIENTS":
      return { ...state, ingredients: action.payload, loading: false };
    case "DELETE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.filter((i) => i !== action.payload),
      };
    case "ADD_INGREDIENT":
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case "UPDATE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.map((ing) =>
          ing === action.target ? action.payload : ing
        ),
      };
    default:
      throw new Error(`Type "${action.type}" is not defined`);
  }
}

export default function useIngredients(callback, deps) {
  const [state, dispatch] = useReducer(reducer, {
    ingredients: null,
    loading: false,
  });

  return {
    ingredients: state.ingredients,
    fetchIngredients: useCallback(
      async function () {
        if (state.loading || state.ingredients) {
          return;
        }
        dispatch({ type: "FETCHING_INGREDIENTS" });
        const ingredients = await apiFetch("/ingredients");
        dispatch({ type: "SET_INGREDIENTS", payload: ingredients });
      },
      [state]
    ),
    deleteIngredient: useCallback(async function (ingredient) {
      await apiFetch("/ingredients/" + ingredient.id, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE_INGREDIENT", payload: ingredient });
    }, []),
    addIngredient: useCallback(async function (formData) {
      const res = await apiFetch("/ingredients/", {
        method: "POST",
        body: formData,
      });
      dispatch({ type: "ADD_INGREDIENT", payload: res });
    }, []),
    updateIngredients: useCallback(async function (ingredient, data) {
      const newIngredient = await apiFetch("/ingredients/" + ingredient.id, {
        method: "PUT",
        body: data,
      });
      dispatch({
        type: "UPDATE_INGREDIENT",
        payload: newIngredient,
        target: ingredient,
      });
    }, []),
  };
}
