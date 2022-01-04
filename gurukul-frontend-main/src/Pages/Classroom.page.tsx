import { FC, memo, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { getClasses } from "../api/backendApi";
import ClassCard from "../component/ClassCard";
import AuthContext from "../context/auth.context";
import ClassContext from "../context/class.context";
import RoleContext from "../context/role.context";
import { Class } from "../models/Class";

interface Props {}

const Classroom: FC<Props> = (props) => {
  const history = useHistory();
  const { classroom, setClassroom } = useContext(ClassContext);
  const { role } = useContext(RoleContext);
  const { user } = useContext(AuthContext);
  const classesList = classroom;
  useEffect(() => {
    const id = user!.uid;
    if (role) {
      getClasses(id).then((response: any) => {
        // console.log(response.data.listOfClasses);
        setClassroom(response.data.listOfClasses);
      });
    }
  }, [role]); // eslint-disable-line

  return (
    <div className="flex flex-wrap">
      {classesList.map((class_: Class) => {
        return (
          <ClassCard
            key={class_.id}
            title={class_.title}
            topic={class_.topic}
            description={class_.motto}
            secretCode={class_.secretCode}
            onClick={() => {
              history.push(`/dashboard/${class_.secretCode}`);
            }}
          />
        );
      })}
    </div>
  );
};

Classroom.defaultProps = {};

export default memo(Classroom);
