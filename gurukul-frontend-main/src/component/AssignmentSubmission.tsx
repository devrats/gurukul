import { useFormik } from "formik";
import { FC, memo, useContext } from "react";
import * as yup from "yup";
import { submitAssignment } from "../api/backendApi";
import AuthContext from "../context/auth.context";
import { storage } from "../firebase";

interface Props {
  announcementId: string;
}

const AssignmentSubmission: FC<Props> = ({ announcementId }) => {
  const filesStorageRef = storage.ref("files/");

  const { user } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: yup.object().shape({
      file: yup.mixed().required(),
    }),
    onSubmit: (data) => {
      // console.log(data);
      const uId = user!.uid;

      const fileRef = filesStorageRef.child(announcementId + uId);
      const uploadTask = fileRef.put(data.file!);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error: any) => {
          // Handle unsuccessful uploads
          console.log("error occured... song");
          alert("Error occured while uploading the song.");
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: any) => {
            const downloadUrl: string = downloadURL;
            submitAssignment({ uId, announcementId, downloadUrl });
          });
        }
      );
    },
  });

  return (
    <div className="flex flex-col w-4/5 p-5 mx-auto border border-gray-400 shadow-2xl md:w-full rounded-xl">
      <p className="text-2xl font-semibold">Your Work</p>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="file"
          className="pt-10"
          name="file"
          id="file"
          onChange={(event) => {
            formik.setFieldValue("file", event.currentTarget.files![0]);
          }}
        />
        <button
          type="submit"
          className="px-5 py-2 mt-10 text-white bg-gray-700 rounded-lg hover:bg-gray-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

AssignmentSubmission.defaultProps = {};

export default memo(AssignmentSubmission);
