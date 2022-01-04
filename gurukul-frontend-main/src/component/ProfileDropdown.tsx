import { Menu, Transition } from "@headlessui/react";
import { FC, Fragment, memo, useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { signout } from "../api/auth";
import { VscSignOut } from "react-icons/vsc";
import AuthContext from "../context/auth.context";

interface Props {
  className?: string;
}

const ProfileDropdown: FC<Props> = ({ className }) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Menu as="div" className={className}>
        <Fragment>
          <Menu.Button>
            <div className="flex flex-col items-center">
              <CgProfile className="text-black w-9 h-9" />
              <p className="text-black">{user!.email}</p>
            </div>
          </Menu.Button>
          <Transition
            enter="transition duration-300 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-300 ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Menu.Items className="absolute w-40 bg-gray-100 rounded shadow-lg top-20 right-5">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`py-2 text-sm flex px-3 space-x-2 ${
                      active ? "text-primary" : "text-gray-800"
                    } `}
                    onClick={() => {
                      signout();
                      window.location.href = "/login";
                    }}
                  >
                    <div className="flex items-center">
                      <VscSignOut className="w-4 h-4" />
                    </div>
                    <p>Sign Out</p>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Fragment>
      </Menu>
    </div>
  );
};

ProfileDropdown.defaultProps = {};

export default memo(ProfileDropdown);
