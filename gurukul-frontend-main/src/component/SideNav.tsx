import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, memo, useContext, useState } from "react";
import { GiCancel, GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { signout } from "../api/auth";
import ClassContext from "../context/class.context";

interface Props {
  className?: string;
}

const SideNav: FC<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { classroom } = useContext(ClassContext);
  const classes = classroom;
  return (
    <>
      <div>
        <GiHamburgerMenu
          className="z-10 text-gray-700 w-7 h-7"
          onClick={() => {
            setIsOpen(!isOpen);
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
            enterFrom="-translate-x-full "
            enterTo="translate-x-0 "
            leave="transition-transform duration-400"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full "
          >
            <div className="fixed top-0 left-0 z-10 transform">
              <div
                className={
                  "relative flex flex-col w-64 min-h-screen bg-white rounded-md flex-shrink-0" +
                  className
                }
              >
                <GiCancel
                  className="absolute text-gray-600 cursor-pointer w-7 h-7 right-3 top-3"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                />
                <Link
                  to="/classroom"
                  className="px-3 py-2 mx-3 mt-16 text-xl text-black border-b border-black rounded-lg outline-none hover:bg-green-100 hover:text-gray-500"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  All Classes
                </Link>
                {classes.map((class_) => {
                  return (
                    <Link
                      key={class_.secretCode}
                      to={`/dashboard/${class_.secretCode}`}
                      className="px-3 py-2 mx-3 mt-3 text-xl text-black truncate border-b border-black rounded-lg outline-none hover:bg-green-100 hover:text-gray-500"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      {class_.title}
                    </Link>
                  );
                })}

                <button
                  type="button"
                  className="px-3 py-2 mx-3 mt-3 text-xl text-left text-black border-b border-black rounded-lg outline-none hover:bg-green-100 hover:text-gray-500"
                  onClick={() => {
                    setIsOpen(!isOpen);
                    signout();
                  }}
                >
                  SignOut
                </button>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

SideNav.defaultProps = {};

export default memo(SideNav);
