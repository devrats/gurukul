import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import { FC, Fragment, memo, useContext, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import * as yup from "yup";
import { addAnnouncement } from "../api/backendApi";
import AuthContext from "../context/auth.context";
import dummyProfileImg from "../img/dummy_profile.webp";

interface Props {
  secretCode: number;
}

const AddAnnouncement: FC<Props> = ({ secretCode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      title: "",
      msg: "",
      dueDate: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required().min(3),
      msg: yup.string().required().min(3),
    }),
    onSubmit: (data) => {
      // console.log("Announcment submited");
      console.log(data);
      addAnnouncement({ ...data, secretCode: secretCode }).then((res) => {
        console.log(res);
      });
      setIsOpen(false);
    },
  });

  return (
    <>
      <button
        className="px-5 py-2 text-white bg-green-500 rounded-lg hover:text-black hover:bg-green-300"
        onClick={() => {
          setIsOpen((e) => !e);
        }}
      >
        Add Announcement
      </button>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog open={isOpen} onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-400"
            enterFrom="opacity-0"
            enterTo="opacity-50"
            entered="opacity-50"
            leave="ease-in-out duration-400"
            leaveFrom="opacity-50"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black"></Dialog.Overlay>
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-400"
            enterFrom="-translate-x-full "
            enterTo="translate-x-0 "
            leave="transition-transform duration-400"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full "
          >
            <div className="fixed top-0 z-10 w-full max-h-full min-h-screen mx-auto overflow-scroll transform bg-white rounded-lg md:w-3/5 md:left-1/4 ">
              <button
                className="absolute outline-none top-4 right-4"
                onClick={() => setIsOpen(false)}
              >
                <ImCancelCircle className="w-6 h-6" />
              </button>
              <form onSubmit={formik.handleSubmit}>
                <div className="p-5 mx-10 my-10 space-y-10 border border-black rounded-lg">
                  <div className="space-y-5">
                    <p className="text-2xl">You're currently signed in as : </p>
                    <div className="flex space-x-2">
                      <img
                        src={dummyProfileImg}
                        alt="user"
                        className="w-10 h-10 rounded-full"
                      />
                      <p className="flex items-center text-lg">{user!.email}</p>
                    </div>
                  </div>

                  <p className="text-4xl text-center">Create Announcement : </p>
                  <div className="space-y-2">
                    <p className="text-lg">Title :</p>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-2 py-1 border border-black rounded-lg"
                    />
                    {formik.touched.title && (
                      <p className="text-red-600">{formik.errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-lg">Message :</p>
                    <textarea
                      name="msg"
                      id="msg"
                      value={formik.values.msg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-2 py-1 border border-black rounded-lg"
                    />
                    {formik.touched.msg && (
                      <p className="text-red-600">{formik.errors.msg}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-lg">Due-Date :</p>
                    <input
                      type="date"
                      name="dueDate"
                      id="dueDate"
                      value={formik.values.dueDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="px-2 py-1 border border-black rounded-lg "
                    />
                    {formik.touched.dueDate && (
                      <p className="text-red-600">{formik.errors.dueDate}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center py-10">
                  <button
                    type="button"
                    className="py-1 mr-3 text-lg text-white bg-gray-400 rounded-md w-28 hover:bg-gray-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="py-1 text-lg text-white bg-red-500 rounded-md w-28 hover:bg-red-600"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

AddAnnouncement.defaultProps = {};

export default memo(AddAnnouncement);
