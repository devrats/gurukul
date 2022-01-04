import { FC, memo, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { fetchAnnouncements, getClasses } from "../api/backendApi";
import AddAnnouncement from "../component/AddAnnouncement";
import Announcement from "../component/Announcement";
import AuthContext from "../context/auth.context";
import ClassContext from "../context/class.context";
import RoleContext from "../context/role.context";
import { AnnouncementDetails } from "../models/Announcement";
import { Class } from "../models/Class";

interface Props {}

const Dashboard: FC<Props> = (props) => {
  const history = useHistory();
  const { secretCode } = useParams<any>();
  const classCodeString = secretCode;
  const classCode = parseInt(secretCode);
  const [class_, setClass_] = useState<Class>({});
  const { user } = useContext(AuthContext);
  const { setClassroom } = useContext(ClassContext);
  const { role } = useContext(RoleContext);
  const [announcements, setAnnouncements] = useState<AnnouncementDetails[]>([]);
  // console.log("dashboard: ", secretCode);
  const announcement = announcements;

  useEffect(() => {
    const id = user!.uid;
    if (role) {
      getClasses(id)
        .then((response: any) => {
          // console.log(response.data.listOfClasses);
          setClassroom(response.data.listOfClasses);

          const x: Class[] = response.data.listOfClasses;
          const c: Class[] = x.filter((cl) => {
            return cl.secretCode === classCode;
          });
          if (c.length > 0) {
            setClass_(c[0]);
          }
        })
        .then(() => {
          fetchAnnouncements({ secretCode: classCodeString }).then((res) => {
            setAnnouncements(res.data.announcement);
          });
        });
    }
  }, [role, secretCode, announcements]); // eslint-disable-line

  return (
    <div>
      <div className="mt-10">
        <div className="relative max-w-5xl mx-auto bg-center bg-cover h-72 rounded-xl bg-dashboard_background">
          <p className="absolute text-5xl font-semibold text-white left-8 bottom-8">
            {class_!.title}
          </p>
        </div>
      </div>
      {role && role === "Teacher" ? (
        <div className="flex justify-center pt-10">
          <AddAnnouncement secretCode={classCode} />
        </div>
      ) : (
        ""
      )}

      {/* <div className="mt-10">
        <PostWithComment />
      </div> */}

      <div className="pt-10">
        {announcement.map((announce) => {
          return (
            <Announcement
              title={announce.msg}
              key={announce.id}
              onClick={() => {
                history.push(`/assignment/${announce.id}`);
              }}
            />
          );
        })}
      </div>
      <div className="mb-10"></div>
    </div>
  );
};

Dashboard.defaultProps = {};

export default memo(Dashboard);
