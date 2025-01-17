import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {} from '@headlessui/react'
import ModalAlert from "../modalAlert/ModalAlert"
import { useToken } from "../../context"

function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(null);

  const {addToken} = useToken()

  const navigate = useNavigate()

  const loginFunction = async(e) => {
    e.preventDefault()
    try {
    const response = await fetch('http://localhost:8080/api/v1/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password
      }),
    });
    if (!response.ok) {
      if (response.status === 404) {
        setErrors('Login Information Is Incorrect.');
        throw new Error('Not Found');
      } else {
        setErrors('Login Information Is Incorrect.');
        throw new Error('Error from API');
      }
    }
    const result = await response.json();
    localStorage.setItem("token", result.token)
    localStorage.setItem("reftok", result.refreshToken)
    // After receiving the JWT from the API response
  document.cookie = `token=${result.token}; SameSite=Strict; Secure`;
  document.cookie = `refresh=${result.refreshToken}; SameSite=Strict; Secure`;

  // const cookieValue = document.cookie
  // .split("; ")
  // .find((row) => row.startsWith("token="))
  // ?.split("=")[1];

  // console.log(cookieValue)

  addToken({token: result.token,refresh: result.refreshToken})

  navigate('/')

  } catch (error) {
    setErrors('Login Information Is Incorrect.');
  }
  }

  const handleCloseModal = () => {
    setErrors(null); // Reset the error state to close the modal
  };
  return (
    <>
    {errors && <ModalAlert message={errors} onClose={handleCloseModal} />}
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginFunction} method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input 
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e)=>setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create Account
            </Link>
          </p>
        </div>
      </div>
      </>
  )
}

export default SignIn