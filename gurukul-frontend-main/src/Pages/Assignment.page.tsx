import { FC, memo, useContext, useEffect, useState } from "react";
import "../css/assignmentPage.css";
import ClassCommentTextarea from "../component/ClassCommentTextarea";
import AssignmentSubmission from "../component/AssignmentSubmission";
import { useParams } from "react-router";
import AuthContext from "../context/auth.context";
import { fetchAnnouncementsDetails } from "../api/backendApi";
import RoleContext from "../context/role.context";
import { AnnouncementDetailsWithAssignment } from "../models/AnnouncementDetails";
import { Comment } from "../models/Comment";
import { Assignments } from "../models/Assignments";
import AssignmentDetails from "../component/AssignmentDetails";

interface Props {}

const Assignment: FC<Props> = (props) => {
  const { announcementId } = useParams<any>();
  const announceId: string = announcementId;
  const { user } = useContext(AuthContext);
  const { role } = useContext(RoleContext);
  const [comments, setComments] = useState<Comment[]>();
  const [assignments, setAssignments] = useState<Assignments[]>();
  const [announcementDetails, setAnnouncementDetails] =
    useState<AnnouncementDetailsWithAssignment>();

  const assign = assignments;
  useEffect(() => {
    const id = user!.uid;
    if (role) {
      fetchAnnouncementsDetails({ announcementId, uId: id }).then((res) => {
        setAnnouncementDetails(res.data);
        setComments(res.data.announcement.comment);
        setAssignments(res.data.assignment);
        console.log(res.data.assignment);
      });
    }
  }, [role]); // eslint-disable-line
  // console.log(announcementDetails);
  if (announcementDetails === undefined) {
    return <p>Loading...</p>;
  }
  return (
    <div className="max-w-6xl mx-auto space-y-20">
      <div className="flex flex-col-reverse mt-10 space-x-0 space-y-20 md:flex-row md:space-x-5 md:space-y-0">
        <div className="flex-1 p-5 shadow-2xl rounded-xl">
          <div id="parent-head ">
            <div className="head-section">
              {announcementDetails!.announcement.msg}
            </div>
            <div className="flex justify-between marks">
              <p>100 points</p>
              <div className="flex items-center">
                <p className="text-base text-gray-400">
                  {/* {announcementDetails?.announcement.dueDate.slice(0, 10)} */}
                </p>
              </div>
            </div>
          </div>

          <div id="content-container">
            <div className="heading">
              <p>{announcementDetails!.announcement.message}</p>
            </div>
          </div>

          <ClassCommentTextarea
            className="mt-3"
            uId={user!.uid}
            announcementId={announcementId}
          />
        </div>

        <div>
          {role === "Student" ? (
            <AssignmentSubmission announcementId={announceId} />
          ) : (
            <AssignmentDetails assignments={assign} />
          )}
        </div>
      </div>

      <div className="p-5 shadow-2xl rounded-xl ">
        <p className="pb-5 text-3xl text-blue-700">Comments : </p>
        <div>
          {comments &&
            comments.map((comment) => {
              return comment.teacher === null ? (
                <p
                  key={comment.id}
                  className="px-5 py-1 my-2 bg-gray-200 rounded-lg"
                >
                  {comment.student.name}: {comment.message}
                </p>
              ) : (
                <p
                  key={comment.id}
                  className="px-5 py-1 my-2 bg-gray-200 rounded-lg"
                >
                  {comment.teacher.name}: {comment.message}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
};

Assignment.defaultProps = {};

export default memo(Assignment);
