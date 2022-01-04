import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import { FC, Fragment, memo, useContext, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import AuthContext from "../context/auth.context";
import dummyProfileImg from "../img/dummy_profile.webp";
import * as yup from "yup";
import { createClass, getClasses } from "../api/backendApi";
import ClassContext from "../context/class.context";

interface Props {}

const CreateClass: FC<Props> = (props) => {
  const { user } = useContext(AuthContext);
  const { setClassroom } = useContext(ClassContext);
  const [isOpen, setIsOpen] = useState(false);
  const [secretCode, setSecretCode] = useState(0);

  const formik = useFormik({
    initialValues: {
      title: "",
      topic: "",
      moto: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required().min(3),
      topic: yup.string().required().min(3),
      moto: yup.string().required().min(3),
    }),
    onSubmit: (data) => {
      console.log(data);
      const uid = user!.uid;
      const title = data.title;
      const topic = data.topic;
      const motto = data.moto;
      createClass({ id: uid, title, topic, motto })
        .then((res: any) => {
          setSecretCode(res.data.SecretCode);
        })
        .then(() => {
          const id = uid;
          getClasses(id).then((response: any) => {
            // console.log(response.data.listOfClasses);
            setClassroom(response.data.listOfClasses);
          });
        });
    },
  });

  return (
    <>
      <div>
        <BsPlusLg
          className="w-6 h-6 text-blue-500 cursor-pointer hover:underline"
          onClick={() => {
            setIsOpen((e) => !e);
          }}
        />
      </div>

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
            enterFrom="-translate-y-full "
            enterTo="translate-y-0 "
            leave="transition-transform duration-400"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-full "
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

                  <p className="text-2xl">Create Class : </p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-lg">Enter Class Title :</p>
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
                    <div>
                      <p className="text-lg">Enter Class Topic :</p>
                      <input
                        type="text"
                        name="topic"
                        id="topic"
                        value={formik.values.topic}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-2 py-1 border border-black rounded-lg"
                      />
                      {formik.touched.topic && (
                        <p className="text-red-600">{formik.errors.topic}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-lg">Enter Class Description :</p>
                      <input
                        type="text"
                        name="moto"
                        id="moto"
                        value={formik.values.moto}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-2 py-1 border border-black rounded-lg "
                      />
                      {formik.touched.moto && (
                        <p className="text-red-600">{formik.errors.moto}</p>
                      )}
                    </div>
                    <div className="pt-10">
                      <p className="text-lg">Secret Code : </p>
                      <p>Share this code to your Join the class...</p>
                      <input
                        type="text"
                        name="secretCode"
                        id="secretCode"
                        value={secretCode}
                        onChange={() => {}}
                        className="w-full px-2 py-1 border border-black rounded-lg "
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center py-5">
                  <button
                    type="button"
                    className="py-1 mr-3 text-lg text-white bg-gray-400 rounded-md w-28 hover:bg-gray-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-1 text-lg text-white bg-red-500 rounded-md w-28 hover:bg-red-600"
                  >
                    Create
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

CreateClass.defaultProps = {};

export default memo(CreateClass);
