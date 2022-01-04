import { FC, memo } from "react";
import { ImProfile } from "react-icons/im";
import dummyProfileImg from "../img/dummy_profile.webp";

interface Props {
  title?: string;
  topic?: string;
  description?: string;
  secretCode?: number;
  onClick: () => void;
}

const ClassCard: FC<Props> = ({
  title,
  topic,
  description,
  secretCode,
  onClick,
}) => {
  return (
    <div
      className="relative flex flex-col flex-shrink-0 m-5 overflow-hidden border border-gray-400 rounded-lg shadow-md w-80 hover:shadow-2xl"
      style={{ minWidth: "280px" }}
    >
      <div className="flex flex-col p-5 space-y-1 text-white bg-gray-600">
        <p
          className="text-2xl cursor-pointer hover:underline"
          onClick={onClick}
        >
          {title}
        </p>
        <p className="text-base">{topic}</p>
      </div>

      <img
        src={dummyProfileImg}
        className="absolute w-16 h-16 bg-blue-500 rounded-full right-5 top-16"
        alt=""
      />

      <div className="p-5 h-36">
        {/* list of assignments */}
        <p className="pt-3 truncate">{description}</p>
      </div>

      <div className="flex justify-between px-5 py-3 border-t border-gray-400">
        <p className="font-semibold">Secret Code : {secretCode}</p>
        <ImProfile
          className="cursor-pointer hover:text-blue-500 w-7 h-7"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

ClassCard.defaultProps = {};

export default memo(ClassCard);
