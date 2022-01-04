import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import { FC, Fragment, memo, useContext, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import AuthContext from "../context/auth.context";
import dummyProfileImg from "../img/dummy_profile.webp";
import * as yup from "yup";
import { getClasses, joinClass } from "../api/backendApi";
import ClassContext from "../context/class.context";

interface Props {}

const AddClass: FC<Props> = (props) => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { setClassroom } = useContext(ClassContext);

  const formik = useFormik({
    initialValues: {
      secretCode: 0,
    },
    validationSchema: yup.object().shape({
      secretCode: yup.number().required().max(999999),
    }),
    onSubmit: (data) => {
      console.log(data);
      const uid = user!.uid;
      const secretCode = data.secretCode;

      joinClass({ id: uid, secretCode: secretCode }).then(() => {
        const id = uid;
        getClasses(id).then((response: any) => {
          // console.log(response.data.listOfClasses);
          setClassroom(response.data.listOfClasses);
        });
      });
      console.log("Class Joined...");

      setIsOpen((e) => !e);
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

                  <div className="space-y-2">
                    <p className="text-lg">Enter Class Code :</p>
                    <input
                      type="number"
                      name="secretCode"
                      id="secretCode"
                      value={formik.values.secretCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="px-2 py-1 border border-black rounded-lg"
                    />
                    {formik.touched.secretCode && (
                      <p className="text-red-600">{formik.errors.secretCode}</p>
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
                    Join
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

AddClass.defaultProps = {};

export default memo(AddClass);
