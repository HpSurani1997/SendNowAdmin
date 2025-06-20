import { useState } from "react";
import Select from "react-select";

import { useAppSelector } from "../../redux/hooks";
import { Admin, Option } from "../../types";

type Props = {
  tableData: Admin[];
  handleDelete?: (id: number) => void;
};

const AdminTable = ({ tableData }: Props) => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  // State for managing the initial status and priority for each row
  const [initialStatus, setInitialStatus] = useState<{
    [key: number]: Option | null;
  }>({});

  const statusOptions = [
    { value: "Not Started", label: "Not Started" },
    { value: "Pending", label: "Pending" },
    { value: "On Hold", label: "On Hold" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
  ];


  const handleStatusChange = (selectedOption: Option | null, id: number) => {
    setInitialStatus((prevState) => ({
      ...prevState,
      [id]: selectedOption,
    }));
  };

  return (
    <table
      className="table table-dashed table-hover digi-dataTable task-table"
      id="taskTable"
    >
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAllLeads"
              />
            </div>
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data) => (
          <tr key={data.id}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>
              <a
                role="button"
                className="text-decoration-underline"
                // onClick={openTaskViewModal}
              >
                {data.name}
              </a>
            </td>
            <td>{data.email}</td>
            <td>
              <Select
                options={statusOptions}
                value={initialStatus[data.id] || null}
                placeholder={data.status}
                isDisabled
                onChange={(selectedOption) =>
                  handleStatusChange(selectedOption as Option, data.id)
                }
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    color: darkMode ? "#c4c4c4" : "#222222",
                    fontSize: 14,
                    borderColor: darkMode
                      ? "rgba(255, 255, 255, 0.12)"
                      : "#dbeaea",
                  }),
                }}
              />
            </td>

            <td>
              <div className="btn-box">
                <button
                  className="btn btn-sm btn-icon btn-primary"
                  // onClick={openEditModal}
                >
                  <i className="fa-light fa-edit"></i>
                </button>
                {data.status != 'super_admin' && <button
                  className="btn btn-sm btn-icon btn-danger"
                  // onClick={() => handleDelete(data.id)}
                >
                  <i className="fa-light fa-trash-can"></i>
                </button>}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
