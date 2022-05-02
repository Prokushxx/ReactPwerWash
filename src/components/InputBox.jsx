import React from 'react';

function InputBox(props) {
  return (
    <div>
      <div>
        <label htmlFor={props.inputLabel} className="text-lg font-semibold text-blue-500">{props.inputLabel}</label>
      </div>
      <div>
        <input type={props.inputType}
          className={props.styleInput}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={`${props.inputLabel}`}
        />
      </div>
    </div>
  )
}

export default InputBox