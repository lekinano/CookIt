import { useReducer } from "react";
import { apiFetch } from "../utils/api";

function reducer(state, action) {
  console.log("RECIPES REDUCE", action.type, action);
  switch (action.type) {
    case "FETCHING_RECIPES":
      return { ...state, loading: true };
    case "SET_RECIPES":
      return { ...state, loading: false, recipes: action.payload };
    case "SET_RECIPE":
      return {
        ...state,
        loading: false,
        recipes: state.recipes.map((r) =>
          r.id === action.payload.id ? action.payload : r
        ),
      };
    default:
      throw new Error(`Type "${action.type}" is not defined`);
  }
}

export default function useRecipes() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    recipes: null,
  });
  return {
    recipes: state.recipes,
    fetchRecipes: async function () {
      if (state.loading || state.recipes !== null) {
        return;
      }
      dispatch({ type: "FETCHING_RECIPES" });
      const recipes = await apiFetch("/recipes");
      dispatch({ type: "SET_RECIPES", payload: recipes });
    },
    fetchRecipe: async function (rec) {
      const recipe = await apiFetch("/recipes/" + rec.id);
      dispatch({ type: "SET_RECIPE", payload: recipe });
    },
  };
}
