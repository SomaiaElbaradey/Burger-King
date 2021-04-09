import React from "react";

const Pagination = ({ onActivePageChange, count, pageSize, activePage }) => {
  let pages = Math.ceil(count / pageSize);
  let pagesArray = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }
  
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pagesArray.map((page) => (
          <li
            onClick={() => onActivePageChange(page)}
            className={page == activePage ? "page-item active" : "page-item"}
          >
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
