import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalAlert from "../modalAlert/ModalAlert";
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';



function SignUp() {
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [buttonType, setButtonType] = useState(true)
    const navigate = useNavigate()
    const [errors, setErrors] = useState(null);
    const [datevalue, setDateValue] = useState(new Date());
    const [occupation, setOccupation] = useState('');
    const [gender, setGender] = useState('');

    const dateeventHandler = (e) => {
      console.log(e);
      setDateValue(e)
    }
    const occupationHandler = (e) => {
      setOccupation(e)
    }
    const genderHandler =(e)=>{
      setGender(e.target.value)
    }
    
  
    const saveAllData =async(e) => {
        e.preventDefault()
        console.log('hello', email, firstname,lastname,password)
        const response = await fetch('http://localhost:8080/api/v1/auth/signup',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstname,
            lastName: lastname,
            userName: email,
            gender: gender,
            dateofbirth: datevalue,
            occupation: occupation,
            password: password
          }),
        });

        if (!response.ok) {
          if (response.status === 404) {
            setErrors('Email alredy exist, login or forget password.');
            throw new Error('Not Found');
          } else {
            setErrors('Email alredy exist, login or forget password.');
            //throw new Error('Error from API');
          }
        }
        const result = await response.json();
        console.log(result)
        setErrors('Account Created Successfully, Login Now')
        navigate('/login')
    }

    
    const confirmpassword = (val) => {
        var confirmPass = document.getElementById("confirmpassword");

        if(password===val) {
            setButtonType(false)
            confirmPass.setCustomValidity('')
        }
        if (password !== val) {
            console.log(password, '   ', val)
            confirmPass.setCustomValidity("Passwords Don't Match");
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
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={saveAllData} method="POST">
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
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  required
                  onChange={(e)=>setFirstname(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  onChange={(e)=>setLastname(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

           <div>
           <label htmlFor="dateofbirth" className="block text-sm font-medium leading-6 text-gray-900">
                Date Of Birth
              </label>
           <DatePicker className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => dateeventHandler(e)} value={datevalue} />
           </div>

<div>
<label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                Gender :
              </label>
              <select onChange={(e)=>genderHandler(e)} id="gender" name="gender" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value="" defaultValue="">Select Below</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
</div>

<div>
<label htmlFor="occupation" className="block text-sm font-medium leading-6 text-gray-900">
                Occupation :
              </label>
<fieldset>
  <select onChange={(e)=>occupationHandler(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="occupation" name="occupation">
    <option value="" defaultValue={true} >-- select one --</option>
    
        <option value="Self-Employed">Self-Employed</option>
        <option value="Salaried-Employee">Salaried-Employee</option>
        <option value="Student">
          Student
        </option>
        <option value="Others">Others</option>
   </select>
</fieldset>

</div>


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e)=>setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  autoComplete="confirm-password"
                  required
                  onChange={(s) => confirmpassword(s.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-red-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={buttonType}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login Account
            </Link>
          </p>

        </div>
      </div>
      </>
  )
}

export default SignUp