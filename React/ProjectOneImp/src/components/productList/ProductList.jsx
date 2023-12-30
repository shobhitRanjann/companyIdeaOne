import { useState } from "react";
import { useLoaderData,Link, useNavigate } from "react-router-dom";

function ProductList() {
  const data = useLoaderData();
 // console.log("loaderdata >>  ", data);
 const varr= "uploads"
  const imageOne = async(img) =>{
    const varr= "uploads"
    const path = img
    //console.log(path.slice(path.indexOf("uploads") + varr.length ))
    const res= await fetch(`http://localhost:8080/product/image${path.slice(path.indexOf("uploads") + varr.length )}`)
    
    const imageBlob = await res.blob();
    const imgObjectUrl = URL.createObjectURL(imageBlob)
    console.log('imgg',imgObjectUrl)
    return imgObjectUrl;
  }
  const navigate = useNavigate()
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick =(card)=>{
    setSelectedCard(card);
    navigate('/detail',{ state: { name:'Xyz' }})
  }
  // onClick={()=>handleCardClick(product)}


  const toComponentB=(product)=>{
    navigate('/detail',{state:{id:1,name:product}});
      }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product.productId} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={`http://localhost:8080/product/image${product.productImagePath[1].slice(product.productImagePath[1].indexOf("uploads") + varr.length )}`}
                  alt={product.productImagePath[1]}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a onClick={()=>{toComponentB(product)}}
                  >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.productName}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.productDescription}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.productPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;

export const Allproducts = async () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const response = await fetch("http://localhost:8080/product/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
