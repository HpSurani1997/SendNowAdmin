import { useState } from "react";

const AddNewCategoryForm = ({
  onSaveCategory,
}: {
  onSaveCategory: (name: string) => void;
}) => {
  const [title, setTitle] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h5>Add New Category</h5>
      </div>

      <div className="panel-body">
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control "
              id="categoryTitle"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="col-12 d-flex justify-content-end">
            <div
              className="btn-box"
              onClick={() => {
                onSaveCategory(title);
                setTitle("");
              }}
            >
              <button className="btn btn-primary">Save Category</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddNewCategoryForm;
