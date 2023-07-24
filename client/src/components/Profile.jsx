import {useNavigate } from "react-router-dom"
import {useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext" 
import { toast } from 'react-toastify';
import FormInput from "../components/FormInput";
import { LocalStorageContext } from '../utils/LocalStorage'

const Register = () => {

  const {  updateUser} = useContext(AuthContext)
  const {token} = useContext(LocalStorageContext)
  const navigate = useNavigate();

  const [ values, setValues] = useState({
    name: token.name,
    email: token.email,
    password: "",
    confirmPassword: "",
  })

  const inputs = [
    { 
      id: 1,
      type: "text",
      name: "name",
      label: "Name",
      value: values.name,
      pattern: "^[a-zA-Z ]*$",
      errorMessage: "Name shouldn't include any spcial characters.",
      required: true
    },
    { 
      id: 2,
      name: "email",
      label: "Email address",
      value: values.email,
      type: "email",
      errorMessage: "It should be a valid email address.",
      required: true

    },
    { 
      id: 3,
      name: "password",
      label: "Password",
      value: values.password,
      type: "password",
      pattern: "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8}).*$",
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character.",
      required: true

    },
    { 
      id: 4,
      name: "confirmPassword",
      label: "Confirm Password",
      pattern: values.password,
      type: "password",
      errorMessage: "Password don't match.",
      required: true
    },
  ]

  const handleChange = (e) => {
    setValues({...values, [e.target.name]:e.target.value})
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {   
          const response = await updateUser(values)
          if(response?.response?.status === 400)  {
            toast.error(response?.response?.data?.message)
          } else {
            toast.success("Updated Successly")
            navigate("/")
            
          }  
    } catch (error) {
     console.log(error)
    } 
  }

  return (
    <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
          <div>
            {
              inputs.map((input)=> (
                <FormInput 
                key={input.id} 
                {...input}
                // value={values[input.name]}
                handleChange={handleChange}
                errorMessage={input.errorMessage}
                />
              ))
            }
          </div>
            
          <div>
              <button
                onClick={handleClick}
                //type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Updated
              </button>
            </div>
          </form>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            Already a member? {' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
               Sign in now
            </Link>
          </p> */}
        </div>
      </div>
    </>
  )
}
export default Register