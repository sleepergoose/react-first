import './Pagination.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ data }) => {
  const { page, limit, count } = data;
  const [array, setArray] = useState([]);

  useEffect(() => {
    const _pagesAmount = Math.ceil(count / limit);
    setArray(Array.from(Array(_pagesAmount).keys()));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ul className="pagination">
        <li className="page-item">
          <Link
            className="page-link"
            to={`/?page=${page - 1}&limit=${limit}`}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>

        {array?.length > 0 &&
          array.map((counter) => (
            <li className="page-item" key={counter}>
              <Link
                to={`/?page=${counter + 1}&limit=${limit}`}
                className="page-link"
              >
                {counter + 1}
              </Link>
            </li>
          ))}

        <li className="page-item">
          <Link
            className="page-link"
            to={`/?page=${page - 1}&limit=${limit}`}
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
