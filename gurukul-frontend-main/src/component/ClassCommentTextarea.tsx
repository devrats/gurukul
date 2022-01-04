import { useFormik } from "formik";
import { FC, memo } from "react";
import { IoMdSend } from "react-icons/io";
import * as yup from "yup";
import { addComment } from "../api/backendApi";

interface Props {
  className?: string;
  announcementId: string;
  uId: string;
}

const ClassCommentTextarea: FC<Props> = ({
  className,
  announcementId,
  uId,
}) => {
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: yup.object().shape({
      comment: yup.string().required().min(3),
    }),
    onSubmit: (data) => {
      console.log(data);
      addComment({
        uId: uId,
        message: data.comment,
        announcementId: announcementId,
      });
      window.location.href = `/assignment/${announcementId}`;
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div id="CommentDiv" className={"flex w-full " + className}>
        <textarea
          className="flex-1 w-full px-5 py-2 outline-none"
          name="comment"
          id="comment"
          value={formik.values.comment}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="Add your comment here"
        />
        <button
          type="submit"
          className="flex items-center px-5 rounded-full hover:shadow-lg"
        >
          <IoMdSend className="w-7 h-7" />
        </button>
      </div>
      {formik.touched && (
        <p className="text-red-500">{formik.errors.comment}</p>
      )}
    </form>
  );
};

ClassCommentTextarea.defaultProps = {};

export default memo(ClassCommentTextarea);
