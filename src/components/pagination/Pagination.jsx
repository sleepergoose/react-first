import './Pagination.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ data, handlePageClick }) => {
  const { page, limit, count } = data;
  const [array, setArray] = useState([]);
  const [pagesAmount, setPagesAmount] = useState(1);

  useEffect(() => {
    const _count = Math.ceil(count / limit);
    setPagesAmount(_count);
    setArray(Array.from(Array(_count).keys()));
  }, [count, limit]);

  const handleClick = (clickedPage) => {
    if (handlePageClick) {
      handlePageClick(clickedPage);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className="page-item">
          <Link
            className={page > 1 ? 'page-link' : 'page-link disabled-link'}
            onClick={() => handleClick(page - 1)}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>

        {array?.length > 0 &&
          array.map((counter) => (
            <li className="page-item" key={counter}>
              <Link
                onClick={() => handleClick(counter + 1)}
                className={
                  page === counter + 1 ? 'page-link active' : 'page-link'
                }
              >
                {counter + 1}
              </Link>
            </li>
          ))}

        <li className="page-item">
          <Link
            className={
              page < pagesAmount ? 'page-link' : 'page-link disabled-link'
            }
            onClick={() => handleClick(page + 1)}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
