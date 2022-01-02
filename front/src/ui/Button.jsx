import React from "react";
import PropTypes from "prop-types";
import { Loader } from "./index";
export default function Button({
  children,
  type = "submit",
  loading = false,
  ...props
}) {
  let className =
    "inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  let htmlType = null;
  type === "submit" ? (htmlType = type) : (htmlType = null);
  return (
    <button className={className} type={htmlType} {...props} disabled={loading}>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        children
      )}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  loading: PropTypes.bool,
};
