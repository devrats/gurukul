import { FC, memo } from "react";
import { FaClipboardList } from "react-icons/fa";

interface Props {
  title: string;
  onClick: () => void;
}

const Announcement: FC<Props> = ({ title, onClick }) => {
  return (
    <div
      className="flex max-w-4xl px-10 py-3 mx-auto mt-10 space-x-5 border border-gray-500 cursor-pointer hover:bg-gray-100 rounded-xl"
      onClick={onClick}
    >
      <div className="inline-block p-3 bg-gray-500 rounded-full ">
        <FaClipboardList className="text-white w-7 h-7" />
      </div>
      <p className="flex items-center text-lg ">New Assignment: {title}</p>
    </div>
  );
};

Announcement.defaultProps = {};

export default memo(Announcement);
