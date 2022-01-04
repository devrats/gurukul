import { useFormik } from "formik";
import { FC, memo, useContext, useState } from "react";
import "../css/loginPage.css";
import * as yup from "yup";
import logo from "../img/gurukul_icon.jpg";
import { Link, useHistory } from "react-router-dom";
import Input from "../component/Input";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { login, TOKEN_ID } from "../api/auth";
import AuthContext from "../context/auth.context";
import { getRole } from "../api/backendApi";
import RoleContext from "../context/role.context";

interface Props {}

const Login: FC<Props> = (props) => {
  const { setUser } = useContext(AuthContext);
  const { role, setRole } = useContext(RoleContext);
  const history = useHistory();
  const [toggle, setToggle] = useState(false);
  let toggleClass = "";

  const toggleHandle = () => {
    setToggle(!toggle);
  };

  if (toggle) {
    toggleClass = "text";
  } else {
    toggleClass = "password";
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (data) => {
      login(data)
        .then((response) => {
          // console.log("ID : ", response.user);
          if (response.user != null) {
            localStorage.setItem(TOKEN_ID, response.user.refreshToken);
            setUser(response.user);

            const uid = response.user.uid;
            getRole({ id: uid })
              .then((res) => {
                setRole(res.data.Role);
                console.log(res.data.Role);
              })
              .then(() => {
                if (role) history.push("/classroom");
              });
          }
        })
        .catch((error) => {
          // console.log(error);
          alert(error.message);
        });
    },
  });

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-primaryPink">
      <form
        className="w-full max-w-lg px-5 py-5 mx-5 bg-white rounded-lg"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col">
          <div className="flex justify-center">
            <img src={logo} alt="logo" className="w-48 h-48 rounded-lg" />
          </div>
          <p className="pt-5 text-4xl font-semibold text-center">Log In</p>
          <p className="pt-5 text-sm font-semibold text-center">
            New Here?{" "}
            <Link to="/signup" className="text-blue-500">
              Create an account{" "}
            </Link>
          </p>
          <div className="relative pt-10">
            <label className="sr-only">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-7 focus:border-blue-400 "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              autoComplete="email"
            />
            <FaUserAlt className="absolute left-0 text-blue-500 top-11 " />
            {formik.touched.email && (
              <p className="text-red-600">{formik.errors.email}</p>
            )}
          </div>
          <div className="relative pt-8">
            <label className="sr-only">Password</label>
            <Input
              type={toggleClass}
              name="password"
              placeholder="Password"
              className="w-full pl-7 focus:border-blue-500"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <FaLock className="absolute left-0 text-blue-500 top-9 " />
            {formik.touched.password && (
              <p className="text-red-600">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex justify-between pt-10">
            <div className="flex items-center">
              <p>Show Password</p>
              <div className="flex items-center pl-2">
                {toggle && (
                  <BsToggleOn
                    className="text-2xl text-blue-500"
                    onClick={toggleHandle}
                  />
                )}
                {!toggle && (
                  <BsToggleOff
                    className="text-2xl text-blue-500"
                    onClick={toggleHandle}
                  />
                )}
              </div>
            </div>
            <div className="flex">
              {/* {submit && (
            <div className="flex items-center pr-4">
              <ImSpinner3 className="animate-spin" />
            </div>
          )} */}
              <button
                type="submit"
                className="px-5 py-2 text-sm text-white bg-blue-500 rounded hover:bg-red-600 bg-primary"
              >
                Log In
              </button>
            </div>
          </div>
          <p className="mt-5 font-semibold text-center text-blue-500">
            Forgot password?
          </p>
          <p className="mt-5 text-sm text-center text-gray-500">
            © 2021 All Rights Reserved. Made by GURUKUL-TEAM.
          </p>
        </div>
      </form>
    </div>
  );
};

Login.defaultProps = {};

export default memo(Login);
