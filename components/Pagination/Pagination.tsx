import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  curPage: number;
  onChange: (page: number) => void;
}

function Pagination({ totalPages, curPage, onChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={curPage - 1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      breakLabel="..."
      nextLabel="🠆"
      previousLabel="🠄"
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      activeClassName={css.active}
      containerClassName={css.pagination}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
