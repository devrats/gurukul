import { useFormik } from "formik";
import { FC, memo, useContext, useState } from "react";
import "../css/loginPage.css";
import * as yup from "yup";
import logo from "../img/gurukul_icon.jpg";
import { Link, useHistory } from "react-router-dom";
import Input from "../component/Input";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { signup } from "../api/auth";
import AuthContext from "../context/auth.context";
import { backendSignup } from "../api/backendAuth";
import RoleContext from "../context/role.context";
import { getRole } from "../api/backendApi";

interface Props {}

const Signup: FC<Props> = (props) => {
  const { setUser } = useContext(AuthContext);
  const roleData = useContext(RoleContext);
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
      name: "",
      role: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
      name: yup.string().required().min(3),
      role: yup.string().required().equals(["Student", "Teacher"]),
    }),
    onSubmit: (data) => {
      // console.log(data);
      signup(data)
        .then((response) => {
          // console.log("ID : ", response.user?.providerId);
          if (response.user != null) {
            setUser(response.user);
            const id = response.user.uid;
            const name = data.name;
            const role = data.role;
            const email = data.email;
            backendSignup({ id, name, role, email }).then(() => {
              const uid = id;
              getRole({ id: uid })
                .then((res) => {
                  roleData.setRole(res.data.Role);
                  console.log(res.data.Role);
                })
                .then(() => {
                  if (roleData.role) history.push("/classroom");
                });
            });
          }
        })
        .catch((error) => {
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
          <p className="pt-5 text-4xl font-semibold text-center">Sign Up</p>
          <p className="pt-5 text-sm font-semibold text-center">
            New Here?{" "}
            <Link to="/login" className="text-blue-500">
              Already have an account{" "}
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
            <label className="sr-only">Name</label>
            <Input
              type="name"
              name="name"
              placeholder="Name"
              className="w-full pl-7 focus:border-blue-400 "
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              autoComplete="email"
            />
            <FaUserAlt className="absolute left-0 text-blue-500 top-9 " />
            {formik.touched.name && (
              <p className="text-red-600">{formik.errors.name}</p>
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

          {/* student or teacher */}
          <div className="flex flex-col pt-8">
            <div className="w-full px-2 py-1 border-2 border-gray-400 rounded focus:border-blue-500">
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <select
                name="role"
                id="role"
                value={formik.values.role}
                onChange={(v) => formik.setFieldValue("role", v.target.value)}
                className="w-full text-gray-500 outline-none"
              >
                <option value="select_role">Select your role</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
            </div>
            {<p className="text-red-600">{formik.errors.role}</p>}
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
                Sign Up
              </button>
            </div>
          </div>
          <p className="mt-5 text-sm text-center text-gray-500">
            © 2021 All Rights Reserved. Made by GURUKUL-TEAM.
          </p>
        </div>
      </form>
    </div>
  );
};

Signup.defaultProps = {};

export default memo(Signup);
