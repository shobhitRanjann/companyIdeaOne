import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Info, X } from 'lucide-react';
import Loading from '../loader/Loading.jsx'


function AddProduct() {
  const navigate = useNavigate()
  const [productState, setProductState] = useState(true);
  const alproducts = useLoaderData();
  console.log(alproducts);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState({showLoader: true});
useEffect(() => {
   setAllProducts(alproducts);
}, [alproducts])



  const toComponentB=(product)=>{
    navigate('/productdet',{state:{id:1,name:product}});
    }
const handleCreateProduct = (e) => {
  navigate('/productdet')
}

const [statusValue, setStatusValue] = useState('');

const changeStatus=()=>{
  setProductState(productState ? false : true);
}

const onClickStatusChange =(e)=>{
  const updatedProducts = allProducts.map(product => {
    console.log(e.target.name , "   ", product.productId)
    if (product.productId == e.target.name && e.target.value!='') {
      updateDb(product.productId, e.target.value);
      return { ...product, productStatus: e.target.value };
    }
    return product;
  });
  setAllProducts(updatedProducts);
  setStatusValue(e.target.value);
}

const updateDb = async(id, value) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refresh="))
    ?.split("=")[1];

    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', value);

  const response = await fetch('http://localhost:8080/product/updatestatus',{
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  });

  setIsLoading({
    showLoader: false
  });

  if(!response.ok){
    console.log("getting error page here");
    return;
  }
  setTimeout(() => {
    
    setIsLoading({
      showLoader: true
    });
  }, 2000);


  console.log("success!!...");

}



const handleChangeStatus = (productId) => {
  const updatedProducts = allProducts.map(product => {
    if (product.productId === productId) {
      // Increment quantity by 1
      return { ...product, productStatus: '' };
    }
    return product;
  });
  setAllProducts(updatedProducts);
};

  return (
    <>
    <div className="rounded-md border-l-4 border-black bg-gray-100 p-4">
      <div className="flex items-center justify-between space-x-4">
        <div>
          <Info className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium">
            You cannot update image, so upload your image carefully & product with status "Cancelled" cannot be viewed publicly ! ..
          </p>
        </div>
        <div>
          <X className="h-6 w-6 cursor-pointer" />
        </div>
      </div>
    </div>
    {alproducts != null ? 
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">All Products</h2>
            <p className="mt-1 text-sm text-gray-700">
              Here you can see all the products that you have added.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={handleCreateProduct}
            >
              Add new product
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Product</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Title
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Price
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {allProducts.map((person) => (
                      <tr key={person.productId}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={"http://localhost:8080/product/image"+person.productImagePath[0].split("uploads")[1]}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <a className="text-sm font-medium text-gray-900"  onClick={()=>{toComponentB(person)}}>{person.productName}</a>
                              <div className="text-sm text-gray-700">{person.productUserLocation}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900 ">{person.productLocalName}</div>
                          <div className="text-sm text-gray-700">{person.productType}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          {person.productStatus!='' ? 
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          {person.productStatus}
                        </span>
                        :
                        <select
                        id={"productstatus"+person.productId}
                        name={person.productId}
                        autoComplete="productstatus"
                        value={statusValue=='' ? person.productStatus : statusValue}
                        onChange={onClickStatusChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="">Select Below</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Closed Now">Closed Now</option>
                        <option value="Under Process">Under Process</option>
                        <option value="Ready To Serve">Ready To Serve</option>
                      </select>
                        }
                          
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {person.productPrice}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                          <a onClick={() => handleChangeStatus(person.productId)} className="text-gray-700">
                            Change Status
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {!isLoading.showLoader ? <Loading /> : ""}
        
      </section>
       : "No Products Added"}
    </>
  )
}

export default AddProduct



export const Addproducts = async () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refresh="))
    ?.split("=")[1];

    console.log("token", token)
    if(token == '' ){
      return null;
    }
  const response = await fetch("http://localhost:8080/product/userproduct", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    } else {
      return null;
    }
  }
  return response.json();
};