// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'category',
    path: '/dashboard/category',
    icon: icon('ic_category'),
  },
  {
    title: 'sub-category',
    path: '/dashboard/subCategory',
    icon: icon('ic_subcategory'),
  },
  {
    title: 'brand',
    path: '/dashboard/brand',
    icon: icon('ic_brand'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
