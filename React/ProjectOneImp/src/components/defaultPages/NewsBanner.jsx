import { Link } from "react-router-dom";

function NewsBanner() {
  return (
    <div className="mx-auto max-w-7xl px-14 py-24">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-black">
            Start your journey with us:{" "}
          </h2>
          <p className="mt-2 text-gray-600">
            Welcome to our vibrant community where connections transcend
            boundaries! At our platform, you have the unique opportunity to
            engage with individuals from diverse backgrounds, each bringing
            their unique traditions and stories to the table. Explore the rich
            tapestry of cultures as you share a delightful meal with newfound
            friends. Whether you're a culinary enthusiast or simply seeking
            meaningful connections, our platform fosters an environment where
            the joy of shared experiences and the warmth of diverse traditions
            come together. Join us on a journey of cultural exploration, where
            every meal is a celebration of diversity, creating lasting
            connections that enrich your life.
          </p>
        </div>
        <div className="mt-10 w-full md:w-1/2 lg:mt-0">
          <form className="flex lg:justify-center">
            <div className="flex w-full items-center space-x-2"> 
              <p className="flex h-10 w-full rounded-md bg-gray-400 px-3 py-2 text-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50">
                Let's get started
              </p>
              <Link
                to='/products'
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Go
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewsBanner;
