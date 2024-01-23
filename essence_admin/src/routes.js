import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import CategoryPage from './pages/CategoryPage';
import SubCategoryPage from './pages/SubCategoryPage';
import BrandPage from './pages/BrandPage';
import EditUser from './pages/EditUser';
import AddUser from './pages/AddUser';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';
import AddSubCategory from './pages/AddSubCategory';
import EditSubCategory from './pages/EditSubCategory';
import AddBrand from './pages/AddBrand';
import EditBrand from './pages/EditBrand';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'category', element: <CategoryPage /> },
        { path: 'subCategory', element: <SubCategoryPage /> },
        { path: 'brand', element: <BrandPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'user/addUser', element: <AddUser /> },
        { path: 'user/editUser/:user_id', element: <EditUser /> },
        { path: 'category/addCategory', element: <AddCategory /> },
        { path: 'category/editCategory/:category_id', element: <EditCategory /> },
        { path: 'subCategory/addSubCategory', element: <AddSubCategory /> },
        { path: 'subCategory/editSubCategory/:subcategory_id', element: <EditSubCategory /> },
        { path: 'brand/addbrand', element: <AddBrand /> },
        { path: 'brand/editbrand/:brand_id', element: <EditBrand /> },
        { path: 'product/addProduct', element: <AddProduct /> },
        { path: 'product/editProduct/:product_id', element: <EditProduct /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/signup',
      element: <SignUpPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
