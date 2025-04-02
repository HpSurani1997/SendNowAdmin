import { useEffect } from "react";
import AddNewCategoryForm from "../components/forms/AddNewCategoryForm";
import AllCategoryTable from "../components/table/AllCategoryTable";
import { addCategory, getCategory } from "../redux/category/categorySlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.userData?.token);
  const categories = useAppSelector((state) => state.category.categories);

  useEffect(() => {
    if (token) {
      dispatch(getCategory(token));
    }
  }, [dispatch, token]);

  const onSaveCategory = (name: string) => {
    dispatch(addCategory({ name: name, token: token }))
      .unwrap()
      .then(() => {
        dispatch(getCategory(token));
      });
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="dashboard-breadcrumb">
          <h6 className="mb-0">Categories</h6>
        </div>
      </div>

      <div className="col-xxl-4 col-xl-5">
        <AddNewCategoryForm onSaveCategory={onSaveCategory} />
      </div>

      <div className="col-xxl-8 col-xl-7">
        <AllCategoryTable categories={categories} />
      </div>
    </div>
  );
};
export default CategoryPage;
