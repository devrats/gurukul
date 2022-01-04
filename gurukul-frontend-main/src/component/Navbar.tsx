import { FC, memo, useContext } from "react";
import RoleContext from "../context/role.context";
import AddClass from "./AddClass";
import CreateClass from "./CreateClass";
import ProfileDropdown from "./ProfileDropdown";
import SideNav from "./SideNav";

interface Props {}

const Navbar: FC<Props> = (props) => {
  const { role } = useContext(RoleContext);
  // console.log(role);
  return (
    <div className="flex justify-between p-5 border-b border-blue-500 rounded-full">
      <div className="flex items-center space-x-5 cursor-pointer">
        <div className="p-3 rounded-full hover:shadow-lg">
          <SideNav className="flex-shrink-0" />
        </div>
        <p className="text-3xl font-semibold text-blue-500">GURUKUL</p>
      </div>
      <div className="flex items-center space-x-8">
        <div className="p-3 rounded-full hover:shadow-lg">
          {role && role === "Teacher" ? <CreateClass /> : ""}
          {role && role === "Student" ? <AddClass /> : ""}
        </div>
        <ProfileDropdown className="rounded hover:shadow-xl" />
      </div>
    </div>
  );
};

Navbar.defaultProps = {};

export default memo(Navbar);
