
import { useEffect, useState } from "react";
import { useLocation, useNavigate,NavLink } from "react-router-dom";

function EditOrCreateProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const [productimgOne, setProductimgOne] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [selectedFilet, setSelectedFilet] = useState([]);
  const [disabledbutton, setDisableButton] = useState(false);
  const [ispreview,setIsPreview] = useState(true);
  useEffect(() => {
    console.log("location state ", location.state)
    if(location.state != null){
      imgOne()
    }
  }, []);
  const imgOne = async() => {
    setDisableButton(true)
    console.log("in image one")
    const response = await fetch("http://localhost:8080/product/image"+location.state.name.productImagePath[0].split("uploads")[1] ,{
      method: "GET",
      headers: {
        "Content-Type" : "image/png"
      }

    });

    const responset = await fetch("http://localhost:8080/product/image"+location.state.name.productImagePath[1].split("uploads")[1] ,{
      method: "GET",
      headers: {
        "Content-Type" : "image/png"
      }

    });

    console.log('hello ')
    

    const imageBlob = await response.blob()
    const imageBlobt = await responset.blob()
    //const imageObjectURL = URL.createObjectURL(imageBlob);
    console.log(imageBlob , imageBlobt)
   // setProductimgOne(imageBlob);
   setProductimgOne(productimgOne.filter(item => item !== imageBlob))
   setProductimgOne(productimgOne.filter(item => item !== imageBlobt))
    setProductimgOne(productimgOne => [...productimgOne, imageBlob]);
    setProductimgOne(productimgOne => [...productimgOne, imageBlobt]);
   // setProductimgOne(imageBlobt)

  }



  // useEffect(()=>{ fetch("127.0.0.1:8000/api/state/show") 
  //   .then(res => res.json()) 
  //   .then(data => setSlides(data.filter((x) => x.service_id !== id))) 
  // }, [])

  const [productStatus, setProductStatus] = useState(
    location.state ? location.state.name.productStatus : ""
  );
  const handleChangeProductStatus = (e) => {
    setProductStatus(e.target.value!='' ? e.target.value:'Cancelled');
  };
  const [productName, setProductName] = useState(
    location.state ? location.state.name.productName : ""
  );
  const productNameHandler = (e) => {
    setProductName(e.target.value);
  };
  const [productLocalName, setProductLocalName] = useState(
    location.state
      ? location.state.name.productLocalName
      : ""
  );
  const productLocalNameHandler = (e) => {
    setProductLocalName(e.target.value);
  };
  const [productDescription, setProductDescription] = useState(
    location.state
      ? location.state.name.productDescription
      : ""
  );
  const productDescriptionHandler = (e) => {
    setProductDescription(e.target.value);
  };
  const [productType, setProductType] = useState(
    location.state ? location.state.name.productType : ""
  );
  const productTypeHandler = (e) => {
    setProductType(e.target.value);
  };
  const [productUserLocation, setProductUserLocation] = useState(
    location.state
      ? location.state.name.productUserLocation
      : ""
  );
  const productUserLocationHandler = (e) => {
    setProductUserLocation(e.target.value);
  };
  const [productState, setProductState] = useState(
    location.state ? location.state.name.productState : ""
  );
  const productStateHandler = (e) => {
    setProductState(e.target.value);
  };
  const [productCity, setProductCity] = useState(
    location.state ? location.state.name.productCity : ""
  );
  const productCityHandler = (e) => {
    setProductCity(e.target.value);
  };
  const [userPinCode, setUserPinCode] = useState(
    location.state ? location.state.name.userPinCode : ""
  );
  const userPinCodehandler = (e) => {
    console.log(userPinCode);
    if (e.target.value.length < 7) {
      setUserPinCode(e.target.value);
    }
  };
  const [productPrice, setProductPrice] = useState(
    location.state ? location.state.name.productPrice : ""
  );
  const productPricehandler = (e) => {
    setProductPrice(e.target.value);
  };
  const [imgOneSelect, setImgOneSelect] = useState(null);
  const [imgTwoSelect, setImgTwoSelect] = useState(null);
  const handleFileChangeO = (event) => {
    const imagePreview = document.getElementById("pd_imgo");
    console.log("file select");
    //setSelectedFile(event.target.files[0]);
    //setProductimgOne(productimgOne.filter(item => item !== event.target.files[0]))
    setSelectedFilet(selectedFilet => [...selectedFilet,event.target.files[0]]);

    //setProductimgOne(productimgOne => [...productimgOne, event.target.files[0]] );

    if (event.target.files[0]) {
      const reader = new FileReader();

      // PREVIEW
      reader.addEventListener("load", function () {
        imagePreview.src = reader.result;
        setImgOneSelect(reader.result);
      });

      if (event.target.files[0]) {
        // CHECK IF THE FILE IS AN IMAGE
        if (
          event.target.files[0].type === "image/jpeg" ||
          event.target.files[0].type == "image/jpg" ||
          event.target.files[0].type == "image/gif" ||
          event.target.files[0].type == "image/png"
        ) {
          // CONVERTS FILE TO BASE 64
          reader.readAsDataURL(event.target.files[0]);
        } else {
          imagePreview.src = "";
        }
      }
      // IF NO IMAGE
      else {
        imagePreview.src = "";
      }
    } else {
      imagePreview.src = "";
    }
    console.log(event.target.files[0]);
    console.log("selected file >> " + selectedFile);
  };

  
  const handleFileChangeT = (event) => {
    const imagePreview = document.getElementById("pd_imgt");
    console.log("file select");
   // setProductimgOne(productimgOne.filter(item => item !== selectedFile))
   // setProductimgOne(productimgOne.filter(item => item !== event.target.files[0]))
    console.log("filter aftrer >>  "+ productimgOne)
   // setSelectedFilet(selectedFile)
    setSelectedFilet(selectedFilet => [...selectedFilet,event.target.files[0]]);
    console.log("now chwck "+productimgOne)
    
    if (event.target.files[0]) {
      const reader = new FileReader();

      // PREVIEW
      reader.addEventListener("load", function () {
        imagePreview.src = reader.result;
        setImgTwoSelect(reader.result)
      });

      if (event.target.files[0]) {
        // CHECK IF THE FILE IS AN IMAGE
        if (
          event.target.files[0].type === "image/jpeg" ||
          event.target.files[0].type == "image/jpg" ||
          event.target.files[0].type == "image/gif" ||
          event.target.files[0].type == "image/png"
        ) {
          // CONVERTS FILE TO BASE 64
          reader.readAsDataURL(event.target.files[0]);
        } else {
          imagePreview.src = "";
        }
      }
      // IF NO IMAGE
      else {
        imagePreview.src = "";
      }
    } else {
      imagePreview.src = "";
    }
    console.log(event.target.files[0]);
    console.log("selected file t >> " + selectedFilet);
  };
  const handleSubmitProduct = async(e) => {
    e.preventDefault();
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refresh="))
    ?.split("=")[1];

    const formData = new FormData();
    formData.append("file",selectedFilet);
    if(location.state != null){
      formData.append('id',location.state.name.productId);
    }
    formData.append('productName', productName);
    formData.append('productLocalName', productLocalName);
    formData.append('productType', productType);
    formData.append('productDescription', productDescription);
    formData.append('productPrice', productPrice);
    formData.append('productStatus', productStatus);
    formData.append('productState', productState);
    formData.append('productCity', productCity);
    formData.append('productUserLocation', productUserLocation);
    formData.append('userPinCode', userPinCode);
    for (const image of selectedFilet) {
      formData.append("file", image);
    }

    console.log("Submitting"+productimgOne);
    if(location.state != null){
      const response = await fetch('http://localhost:8080/product/updatepd',{
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
      if(response.ok){
        console.log("Success updating !...")
        navigate("/addProduct")
        return;
      }
    }
    if(location.state == null){
      const response = await fetch('http://localhost:8080/product/', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
      if(response.ok){
        console.log("success new upload");
        navigate("/addProduct")
        return;
      }
    }
    
  };

  const toComponentB=()=>{
    // const prod = {
    //   "productName" : productName,
    //   "productLocalName":productLocalName,
    //   "productDescription":productDescription,
    //   "productType":productType,
    //   "productStatus":productStatus,
    //   "images": selectedFilet,
    //   "productUserLocation":productUserLocation,
    //   "productCity":productCity,
    //   "productState": productState,
    //   "userPinCode": userPinCode,
    //   "productPrice": productPrice
    // }
    // navigate('/preview',{state:{id:1,name:prod}});
    setIsPreview(ispreview ? false : true);
  }
  
  return (
    <>
    {ispreview ? 
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <form
        onSubmit={handleSubmitProduct}
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Your Product
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="productname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  productName
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      product name/
                    </span>
                    <input
                      type="text"
                      name="name_pd"
                      id="productname"
                      autoComplete="name_pd"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="product name"
                      onChange={productNameHandler}
                      value={productName}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="productlocalname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  productLocalName
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      localname/
                    </span>
                    <input
                      type="text"
                      name="localname"
                      id="productlocalname"
                      autoComplete="localname"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="localname"
                      onChange={productLocalNameHandler}
                      value={productLocalName}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={productDescription}
                    onChange={productDescriptionHandler}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="producttype"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Type
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="producttype"
                      id="producttype"
                      autoComplete="producttype"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Product Type"
                      onChange={productTypeHandler}
                      value={productType}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="productstatus"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Status
                </label>
                <div className="mt-2">
                  <select
                    id="productstatus"
                    name="productstatus"
                    autoComplete="productstatus"
                    value={productStatus}
                    onChange={handleChangeProductStatus}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Below</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Closed Now">Closed Now</option>
                    <option value="Under Process">Under Process</option>
                    <option value="Ready To Serve">Ready To Serve</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <img  id="pd_imgo" src={location.state ? "http://localhost:8080/product/image"+location.state.name.productImagePath[0].split("uploads")[1] : imgOneSelect}/>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    {!disabledbutton ? <>
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                       
                        <span>Upload a file</span>
                        <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChangeO}
                      />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                      </> : ""}
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <img  id="pd_imgt" src={location.state ? "http://localhost:8080/product/image"+location.state.name.productImagePath[1].split("uploads")[1] : imgTwoSelect} />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    {!disabledbutton ? <>
                      <label
                        htmlFor="file-uploadt"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-uploadt"
                          name="file-uploadt"
                          type="file"
                          className="sr-only"
                          
                          disabled={disabledbutton}
                          onChange={handleFileChangeT}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                      </> : "" }
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use the address where you are currently available.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    value={productUserLocation}
                    onChange={productUserLocationHandler}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={productCity}
                    onChange={productCityHandler}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    value={productState}
                    onChange={productStateHandler}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="postal-code"
                    id="postal-code"
                    value={Number(userPinCode)}
                    onChange={userPinCodehandler}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="productprice"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Price
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="number"
                  name="productprice"
                  id="productprice"
                  autoComplete="productprice"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="productprice"
                  onChange={productPricehandler}
                  value={productPrice}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
         
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={()=> navigate("/addProduct")}
          >
            Cancel
          </button>
          
          {location.state == null ? <button
            type="button"
            className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            onClick={toComponentB}
          >
            Preview
          </button> : <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>}
        </div>
      </form>
    </div>

    :
    <>
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <div className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
      <button
            type="button"
            className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            onClick={toComponentB}
          >
            Back
          </button>
      </span>
      </div>
      <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button
            type="button"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            onClick={handleSubmitProduct}
          >
            Publish
          </button>
      </div>
      </div>
    </nav>
      <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
      <div className="pt-8">
        <div className="flex items-center">
          <ol className="flex w-full items-center overflow-hidden">
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a href="#">Home</a>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <NavLink className="capitalize" to="/products">
                product
              </NavLink>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a className="capitalize">
              {productName}
              </a>
            </li>
          </ol>
        </div>
      </div>
      <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        <div className="col-span-5 grid-cols-2 gap-2.5">
          <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
    
            <img
              id="pd_imgodd"
              alt="img one"
              className="w-full object-cover"
              src={imgOneSelect}
            />
          </div>
          <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
          
       
            <img
              id="rrr"
              alt="img two"
              className="w-full object-cover"
              src={imgTwoSelect}
            />
          </div>
        </div>
        <div className="col-span-4 pt-8 lg:pt-0">
          <div className="mb-7 border-b border-gray-300 pb-7">
            <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
              {productName}
            </h2>
            <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
              {productDescription}
            </p>
            <div className="mt-5 flex items-center ">
              <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
              ₹{productPrice}
              </div>
              <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
              ₹{productPrice + 10}
              </span>
            </div>
          </div>
          <div className="border-b border-gray-300 pb-3  ">
            <div className="mb-4">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                size
              </h3>
              <ul className="colors -mr-3 flex flex-wrap">
                <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm ">
                  S
                </li>
                <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm ">
                  M
                </li>
                <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm ">
                  L
                </li>
                <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm ">
                  XL
                </li>
              </ul>
            </div>
            <div className="mb-4 ">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                color
              </h3>
              <ul className="colors -mr-3 flex flex-wrap">
                <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm">
                  <span className="block h-full w-full rounded bg-orange-400"></span>
                </li>
                <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm">
                  <span className="block h-full w-full rounded bg-pink-400"></span>
                </li>
                <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm">
                  <span className="block h-full w-full rounded bg-violet-600"></span>
                </li>
                <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm">
                  <span className="block h-full w-full rounded bg-red-500"></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
            <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
              <button
                className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                disabled=""
              >
                +
              </button>
              <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                1
              </span>
              <button className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12">
                -
              </button>
            </div>
            <button
              type="button"
              className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add to cart
            </button>
          </div>
          <div className="py-6 ">
            <ul className="space-y-5 pb-1 text-sm">
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">
                  Local Name:
                </span>
                {productLocalName}
              </li>
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">
                  Status:
                </span>
                <a className="hover:text-heading transition hover:underline" href="#">
                  {productStatus}
                </a>
              </li>
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">
                  Category:
                </span>
                <a className="hover:text-heading transition hover:underline" href="#">
                  {productType}
                </a>
              </li>
              <li className="productTags">
                <span className="text-heading inline-block pr-2 font-semibold">
                  Pincode:
                </span>
                <a
                  className="hover:text-heading inline-block pr-1.5 transition last:pr-0 hover:underline"
                  href="#"
                >
                  {userPinCode}
                </a>
              </li>
            </ul>
          </div>
          <div className="shadow-sm ">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                Product Details
              </h2>
              <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                <div className="bg-heading h-0.5 w-full rounded-sm"></div>
                <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out"></div>
              </div>
            </header>
            <div>
              <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
                Our Customer Experience Team is available 7 days a week and we offer
                2 ways to get in contact.Email and Chat . We try to reply quickly,
                so you need not to wait too long for a response!.
              </div>
            </div>
          </div>
          <div className="">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                Additional Information
              </h2>
            </header>
          </div>
          <div className="">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                Customer Reviews
              </h2>
            </header>
          </div>
        </div>
      </div>
    </div> </>}
    </>
  );
}

export default EditOrCreateProduct;
