import {useState } from 'react';
import ReactPaginate from 'react-paginate';



// Example items, to simulate fetching from another resources.
const ii = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const items =[
  {
		color: "ddfdf",
		value: "#f00"
	},
	{
		color: "dfsgd",
		value: "#0f0"
	},
	{
		color: "fjjfhj",
		value: "#00f"
	},
	{
		color: "fhjfj",
		value: "#0ff"
	},
	{
		color: "fjhfjfs",
		value: "#f0f"
	},
	{
		color: "ewrw",
		value: "#ff0"
	},
	{
		color: "ioogvk",
		value: "#000"
	}
];

function Items( {currentItems} ) {
  console.log('curent items ',currentItems);
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <>
          <div>
            <h3>Item $ {item.color} {item.value}</h3>
          </div>
          </>
        ))}
    </>
  );
}
 
function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
 
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  console.log('currentItems    ', currentItems , '    itemsPerPage   ', itemsPerPage);
  console.log('pageCount    ', pageCount);
 
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
 
  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={0}
      />
    </>
  );
}
 
// Add a <div id="container"> to your HTML to see the component rendered.
// ReactDOM.render(
//   <PaginatedItems itemsPerPage={4} />,
//   document.getElementById('container')
// );

function Testingpage() {
    const [open, setOpen] = useState(true);

  const gg = 
  {
    color: "ranjan",
    value: "kumar"
  };
 items.push(gg);

    return (
      <>
      <PaginatedItems itemsPerPage={2} />
      </>
    )
}

export default Testingpage