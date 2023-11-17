import React from "react";
const typedata = require("../Input.json");

function Input() {

  return typedata.typedata.map((item, index) => (
    <div key={index}>
      <div>
        <form className="container align-items-center d-flex flex-column">
          <div className="mb-3 w-50">
            <label className="form-label">{item.label}</label>
            <br />
            {item.type === "text" && <input type="text" />}
            {item.type === "radio" &&
              item.options.map((option, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    value={option}
                  />
                  <label>{option}</label>
                </div>
              ))}
            {item.type === "checkbox" &&
              item.options.map((option, i) => (
                <div key={i}>
                  <input
                    type="checkbox"
                    value={option}
                  />
                  <label>{option}</label>
                </div>
              ))}
            {item.type === "date" && <input type="date" />}
            {item.type === "select" && (
              <select>
                {item.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        </form>
      </div>
    </div>
  ));
}

export default Input;
