import { useEffect, useRef, useState } from "react";
import { ApiErrors, apiFetch } from "../../utils/api";
import { Button } from "../../ui";

export default function CreateIngredient({ toggleNewIngredient }) {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
    setErrors(null);
    e.preventDefault();
    console.log(e.target);
    console.log(e);
    const data = new FormData(e.target);
    console.log(data);
    try {
      const user = await apiFetch("/ingredients/", {
        method: "POST",
        body: data,
      });
      setLoading(false);
      toggleNewIngredient();
    } catch (err) {
      if (err instanceof ApiErrors) {
        setErrors(err.errors[0].message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <form
      className="flex flex-col p-3 items-center m-w-full"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="title"
            id="title"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Saucisson"
          />
        </div>
      </div>
      <div>
        <div>
          <label
            htmlFor="unit"
            className="block text-sm font-medium text-gray-700"
          >
            Unit
          </label>
          <select
            id="unit"
            name="unit"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue="Canada"
          >
            <option>grams</option>
            <option>liters</option>
            <option>kilograms</option>
          </select>
        </div>
      </div>
      <Button loading={loading}>Submit</Button>
    </form>
  );
}
