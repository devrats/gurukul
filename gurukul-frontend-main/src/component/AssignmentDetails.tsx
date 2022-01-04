import { FC, memo } from "react";
import { Assignments } from "../models/Assignments";

interface Props {
  assignments?: Assignments[];
}

const AssignmentDetails: FC<Props> = ({ assignments }) => {
  return (
    <div className="flex flex-col w-4/5 p-5 mx-auto border border-gray-400 shadow-2xl md:w-full rounded-xl">
      <p className="text-2xl font-semibold">Submitted Assignments</p>
      {assignments?.map((assign) => {
        return (
          <p className="flex" key={assign.id}>
            {assign.student.name} :{" "}
            <p className="truncate">
              <a
                href={assign.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 cursor-pointer hover:text-red-700 hover:underline"
              >
                Link
              </a>
            </p>
          </p>
        );
      })}
    </div>
  );
};

AssignmentDetails.defaultProps = {};

export default memo(AssignmentDetails);
