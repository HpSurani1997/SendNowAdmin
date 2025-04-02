import { useState } from "react";
import { categoryHeaderData } from "../../data";
import TableHeader from "../header/table-header/TableHeader";
import TableBottomControls from "../utils/TableBottomControls";
import BulkActions from "../utils/dropdowns/BulkActions";
import EmployeeLength from "../utils/dropdowns/EmployeeLength";
import { Category } from "../../redux/category/categorySlice";

const AllCategoryTable = ({ categories }: { categories: Category[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  // Pagination logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = categories.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(categories.length / dataPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="panel category-page">
      <TableHeader
        tableHeading="All Categories"
        tableHeaderData={categoryHeaderData}
      />

      <div className="panel-body">
        <div className="table-filter-option">
          <div className="row g-3">
            <div className="col-12 col-sm-8">
              <form className="row g-2">
                <div className="col-9 col-sm-6 col-lg-5 col-xl-6 col-xxl-4">
                  <BulkActions />
                </div>
                <div className="col-3 col-sm-4 col-lg-3 col-xl-3">
                  <button className="btn btn-primary w-100">Apply</button>
                </div>
              </form>
            </div>
            <div className="col-12 col-sm-4 d-flex justify-content-end">
              <div id="employeeTableLength">
                <label className="d-flex align-items-center gap-2">
                  <EmployeeLength />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table
            className="table table-dashed table-hover digi-dataTable all-product-table"
            id="allProductTable"
          >
            <thead>
              <tr>
                <th className="no-sort">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="markAllProduct"
                    />
                  </div>
                </th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  <td>
                    <div className="table-category-card">
                      <div className="part-txt">
                        <span className="category-name">{item.name}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="btn-box">
                      <button>
                        <i className="fa-light fa-eye"></i>
                      </button>
                      <button>
                        <i className="fa-light fa-pen-to-square"></i>
                      </button>
                      <button>
                        <i className="fa-light fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TableBottomControls
          indexOfFirstData={indexOfFirstData}
          indexOfLastData={indexOfLastData}
          dataList={categories}
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          pageNumbers={pageNumbers}
        />
      </div>
    </div>
  );
};
export default AllCategoryTable;
