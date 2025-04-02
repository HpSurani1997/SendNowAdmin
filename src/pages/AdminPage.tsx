import { useEffect, useState } from "react";
import TableFilter2 from "../components/filter/TableFilter2";
import TableHeader from "../components/header/table-header/TableHeader";
import AdminTable from "../components/table/AdminTable";
import { taskHeaderData } from "../data";
import TableBottomControls from "../components/utils/TableBottomControls";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllAdmin } from "../redux/auth/authSlice";
import { Admin } from "../types";

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.userData?.token);
  const role = useAppSelector((state) => state.auth.userData?.userData?.status);
  const isAddAdminSuccess = useAppSelector(
    (state) => state.auth.isAddAdminSuccess
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataList, setDataList] = useState<Admin[]>([]);

  const getAdminList = async () => {
    dispatch(getAllAdmin(token))
      .unwrap()
      .then((response: { data: Admin[] }) => {
        setDataList(response.data);
      });
  };

  useEffect(() => {
    if (isAddAdminSuccess) {
      getAdminList();
    }
  }, [isAddAdminSuccess]);

  useEffect(() => {
    if (token) {
      getAdminList();
    }
  }, [token]);

  const handleDelete = (id: number) => {
    // Filter out the deleted item from the dataList
    const updatedDataList = dataList.filter((data) => data.id !== id);
    // Update the dataList state with the updated data
    setDataList(updatedDataList);
  };

  // Pagination logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataList.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(dataList.length / dataPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="Users"
            tableHeaderData={taskHeaderData}
            showAddAdminBtn={role === 'super_admin' ? true : false}
          />

          <div className="panel-body">
            <TableFilter2 showStatus showDatePicker showPriority />

            <div className="table-responsive">
              <AdminTable tableData={currentData} handleDelete={handleDelete} />
            </div>

            <TableBottomControls
              indexOfFirstData={indexOfFirstData}
              indexOfLastData={indexOfLastData}
              dataList={dataList}
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              pageNumbers={pageNumbers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
