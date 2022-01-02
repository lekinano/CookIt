import { useEffect, useRef, useState } from "react";
import { ApiErrors, apiFetch } from "../../utils/api";
import { Button, Field } from "../../ui";

export default function CreateIngredient({ onAdd }) {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const errorFor = (field) => {
    const error = errors.find((e) => e.field === field);
    if (error) {
      return error.message;
    }
    return null;
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    form.querySelector("input").focus();
    setLoading(true);
    try {
      const data = new FormData(form);
      await onAdd(data);
      form.reset();
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

  return (
    <form
      className="flex flex-col p-3 items-center m-w-full"
      onSubmit={handleAdd}
    >
      <Field
        type="text"
        name="title"
        id="title"
        defaultValue=""
        placeholder={"Banana"}
        error={errorFor("title")}
      >
        Name
      </Field>
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
            defaultValue="grams"
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
