import { useState } from "react"

const FormInput = (props) => {

   const { label, handleChange, errorMessage, token, ...inputProps } =  props

   const [ focused, setFocused] = useState(false)
   const handleFocus = (e) => {
      setFocused(true)
   };

   
  return (
    <>
      <label className="block text-sm font-medium leading-6 text-gray-900 mt-3">
      {label}
      </label>
      <div className="mt-2">
         <input
         {...inputProps}
          onChange={handleChange}
          onBlur={handleFocus}
          // eslint-disable-next-line react/no-unknown-property
          focused={focused.toString()}
          onFocus={() => inputProps.name === "confirmPassword" && setFocused(true) }
          className="peer w-full rounded-md py-1.5 px-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
         <span className={`hidden ${focused=== true ? "peer-invalid:block" : "hidden"}  p-[3px] text-red-400 text-sm font-small leading-6 rex mt-1`}>
            {errorMessage}
         </span>
      </div>
      
    </>
  )
}
export default FormInput