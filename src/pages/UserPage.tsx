import { useEffect, useState } from "react";
import TableFilter2 from "../components/filter/TableFilter2";
import TableHeader from "../components/header/table-header/TableHeader";
import { taskHeaderData } from "../data";
import TableBottomControls from "../components/utils/TableBottomControls";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteUser, getAllUser, updateUser } from "../redux/auth/authSlice";
import { Admin } from "../types";
import UserTable from "../components/table/UserTable";

const UserPage = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.userData?.token);
  const isAddAdminSuccess = useAppSelector(
    (state) => state.auth.isAddAdminSuccess
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataList, setDataList] = useState<Admin[]>([]);

  const getAllUserList = async () => {
    dispatch(getAllUser(token))
      .unwrap()
      .then((response: { data: Admin[] }) => {
        setDataList(response.data);
      });
  };

  useEffect(() => {
    if (isAddAdminSuccess) {
      getAllUserList();
    }
  }, [isAddAdminSuccess]);

  useEffect(() => {
    if (token) {
      getAllUserList();
    }
  }, [token]);

  const handleDelete = (id: number) => {
    const updatedDataList = dataList.filter((data) => data.id !== id);
    setDataList(updatedDataList);
    dispatch(deleteUser({ token: token, status: "deleted", userId: id }))
      .unwrap()
      .then(() => {
        getAllUserList();
      });
  };

  const handleUpdateStatus = (id: number, status: string) => {
    const updatedDataList = dataList.filter((data) => data.id !== id);
    setDataList(updatedDataList);
    dispatch(updateUser({ token: token, status: status, userId: id }))
      .unwrap()
      .then(() => {
        getAllUserList();
      });
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
            tableHeading="Task Summary"
            tableHeaderData={taskHeaderData}
          />

          <div className="panel-body">
            <TableFilter2 showStatus showDatePicker showPriority />

            <div className="table-responsive">
              <UserTable
                tableData={currentData}
                handleDelete={handleDelete}
                handleUpdateStatus={handleUpdateStatus}
              />
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
export default UserPage;
