
import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { isExpired, decodeToken } from "react-jwt";
import ModalAlert from "../modalAlert/ModalAlert"
import { useNavigate } from 'react-router-dom';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function contactUser() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
}

const initialState = {
  pinCod: "",
  location: "",
  title: "",
  message: ""
};

function ContactUs() {
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate()
const cookieValue = document.cookie
.split("; ")
.find((row) => row.startsWith("token="))
?.split("=")[1];

const tokenDetails = () => {
  try {
    if (cookieValue != undefined && cookieValue !== '') {
      console.log("decodedToken  > ", decodeToken(cookieValue));
      setUsername(decodeToken(cookieValue).name);
    }
  } catch (error) {
    console.log("error hai");
  }
};
useEffect(() => {
  tokenDetails();
}, [cookieValue]);

const [
  { pinCod, location, title, message },
  setState
] = useState(initialState);

  const pinCode = (pin) => {
    if(pin.target.value.length < 7){
      const { name, value } = pin.target;
    setState(prevState => ({ ...prevState, [name]: value }));
    }
  }
  
  const [locationSize, setLocationSize] = useState(70);
  const userLocation = (e) =>{
    if(e.target.value.length < 70){
      const { name, value } = e.target;
      console.log(name, value)
      setState(prevState => ({ ...prevState, [name]: value }));
      setLocationSize( 70 - e.target.value.length)
    }
  }
  const [titleLength, setTitleLength] = useState(100);
  const contactTitle = (e) => {
    if(e.target.value.length < 100){
      const { name, value } = e.target;
      setState(prevState => ({ ...prevState, [name]: value }));
      setTitleLength(100 - e.target.value.length)
    }
  }
  const [messageLength, setMessageLength] = useState(350);
  const contactMessage = (e) => {
    if(e.target.value.length < 350){
      const { name, value } = e.target;
      setState(prevState => ({ ...prevState, [name]: value }));
      setMessageLength(350 - e.target.value.length)
    }
  }

  const clearState = () => {
    setState({ ...initialState });
  };

  const contactme = async(e) => {
    e.preventDefault()
    console.log(username)
    if(username=='' || username == undefined){
      setErrors("Please login first to contact us!.."); 
      throw new setErrors('Not Found');
    }
    const response = await fetch('http://localhost:8080/contact/sendreq',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            title: title,
            message: message,
            location: location,
            pinCode: pinCod
          }),
        })

    if(!response.ok){
      console.log("not ok")
    }
    setErrors('Message sent successfully!!...');
    contactUser().then(clearState);
  }

  const handleCloseModal = () => {
    setErrors(null); // Reset the error state to close the modal
  };


  const [agreed, setAgreed] = useState(false)

  return (
    <>
    {errors && <ModalAlert message={errors} onClose={handleCloseModal} /> }
    
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact us</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Write the things you wants to share with us!..
        </p>
      </div>
      <form onSubmit={contactme} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="username"
                id="first-name"
                autoComplete="root"
                value={username}
                readOnly
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="location" className="block text-sm font-semibold leading-6 text-gray-900">
              Location ( {locationSize} charaters left )
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Write in 70 characters only"
                autoComplete="organization"
                value={location}
                onChange={(e) => userLocation(e)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="pincode" className="block text-sm font-semibold leading-6 text-gray-900">
              Pincode
            </label>
            <div className="mt-2.5">
              <input
                type="number"
                name="pinCod"
                id="pincode"
                autoComplete="number"
                value={pinCod}
                onChange={(e) => pinCode(e)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
              Title ({titleLength} characters left)
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="title"
                value={title}
                onChange={(e) => contactTitle(e)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Message ({messageLength} characters left)
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                value={message}
                onChange={(e)=> contactMessage(e)}
                placeholder="Write in 350 characters only"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
    </>
  )
}

export default ContactUs