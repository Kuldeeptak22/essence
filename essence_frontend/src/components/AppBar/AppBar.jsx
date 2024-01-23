import React, { useEffect } from "react";
import { Fragment } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../essets/images/essence.png";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotalItems } from "../../redux/addToCart/addToCartAction";
import { BaseURL } from "../../utils/nameSpace";
import USER from "../../essets/images/userImage.jpg";
import { getUserByEmail } from "../../redux/userAuth/userAuthAction";

const navigation = [
  { name: "Offers", to: "/offers", current: false },
  { name: "About", to: "/about", current: false },
  { name: "Contact Us", to: "/contact", current: false },
];

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "32ch",
      },
    },
    [theme.breakpoints.up("lg")]: {
      width: "20ch",
      "&:focus": {
        width: "23ch",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AppBar = () => {
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state) => state?.cart);
  // const userDetail = useSelector((state) => state?.userData.user);
  const { success } = useSelector((state) => state?.cart);

  useEffect(() => {
    if (success) {
      dispatch(getCartTotalItems());
    }
  }, [success, dispatch]);

  useEffect(() => {
    dispatch(getCartTotalItems());
  }, [dispatch]);

  useEffect(() => {
    const userEmail = localStorage.getItem("UserEmail");
    dispatch(getUserByEmail(userEmail));
  }, [dispatch]);

  const userDetail = JSON.parse(localStorage.getItem("UserData"));

  const navigate = useNavigate();
  const goToCartPage = () => {
    navigate("/cart");
  };
  const signOut = () => {
    const token = localStorage.getItem("UserToken");
    const UserEmail = localStorage.getItem("UserEmail");
    const UserData = localStorage.getItem("UserData");
    if (token && UserEmail && UserData) {
      localStorage.removeItem("UserToken");
      localStorage.removeItem("UserEmail");
      localStorage.removeItem("UserData");
      navigate("/signin");
      setTimeout(() => {
        const notify = () =>
          toast.success("Logout Successfully...!!", {
            theme: "dark",
          });
        notify();
      }, 1000);
    }
  };

  const goToSearchPage = (e) => {
    if (e.target.value.length > 0) {
      setTimeout(() => {
        navigate(`/searchPage/${e.target.value}`);
      }, 1000);
    } else {
      navigate("/");
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="text-white text-right pb-1">
              <div></div>
              <div className="text-[0.8rem] py-1 hidden sm:block">
                24/7 Customer service:
                <a
                  href="tel:+91-9664408473"
                  className="no-underline text-yellow-300 px-1"
                >
                  91-9664408473
                </a>
              </div>
            </div>
            <div className="relative flex h-28 lg:h-16 justify-between mt-2">
              <div className="absolute inset-y-0 left-0 flex sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex h-10 justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0">
                  <a href="/">
                    <img
                      className="h-10 w-auto"
                      src={Logo}
                      alt="Your Company"
                    />
                  </a>
                </div>
                {/* Desktop Navigation  */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white no-underline"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white no-underline",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="searchBar absolute lg:static top-12 left-[10%]">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => goToSearchPage(e)}
                  />
                </Search>
              </div>
              <div className="absolute inset-y-0 right-0 flex pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 items-baseline">
                <button
                  type="button"
                  onClick={goToCartPage}
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {totalItems ? (
                  <span className="h-5 w-5 rounded-3 bg-yellow-200 absolute text-sm">
                    {totalItems}
                  </span>
                ) : (
                  ""
                )}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={
                          userDetail?.avatar
                            ? `${BaseURL}/uploads/users/${userDetail?.avatar}`
                            : USER
                        }
                        alt={userDetail?.firstName}
                      />
                      )
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/myProfile"
                            className={classNames(
                              active
                                ? "bg-gray-100  no-underline"
                                : " no-underline",
                              "block px-4 py-2 text-sm text-gray-700  no-underline"
                            )}
                          >
                            Your Profile
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            onClick={signOut}
                            className={classNames(
                              active
                                ? "bg-gray-100 no-underline cursor-pointer"
                                : "no-underline",
                              "block px-4 py-2 text-sm text-gray-700 no-underline"
                            )}
                          >
                            Sign out
                          </p>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <ToastContainer />
          {/* Mobile Navigatio  */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <NavLink to={item.to} className="nav-link">
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white no-underline",
                      "block rounded-md px-3 py-2 text-base font-medium "
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default AppBar;
