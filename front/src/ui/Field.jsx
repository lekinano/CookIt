import PropTypes from "prop-types";
import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

export default function Field({
  name,
  children,
  type = "text",
  error,
  className,
  defaultValue = name,
  placeholder = "Banana",
  ...props
}) {
  return (
    <div className={`mt-1 relative rounded-md shadow-sm ${className}`}>
      {children && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {children}
        </label>
      )}
      <input
        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md`}
        name={name}
        type={type}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...props}
      />
      {error && (
        <>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {error}
          </p>
        </>
      )}
    </div>
  );
}

Field.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  error: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
};
