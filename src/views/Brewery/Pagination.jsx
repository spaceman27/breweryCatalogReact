import { useEffect, useState } from "react";

const Pagination = ({ pageNo = 1, perPage = 10, total, onChangePage }) => {
  const [lastPage, setLastPage] = useState(1);
  const [current, setCurrent] = useState(1);
  console.log({ pageNo, perPage, total, onChangePage });
  useEffect(() => {
    setLastPage(Math.ceil(total / perPage));
    setCurrent(pageNo);
  }, []);

  const handlePreviousPage = () => {
    setCurrent(current - 1);
    onChangePage(current - 1);
  };
  const handleNextPage = () => {
    setCurrent(current + 1);
    onChangePage(current + 1);
  };
  return (
    <>
      {current > 1 && <button onClick={handlePreviousPage}>Previous</button>}
      Page {current}
      {<button onClick={handleNextPage}>Next</button>}
    </>
  );
};
export default Pagination;
