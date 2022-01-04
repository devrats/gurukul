import { FC, memo } from "react";

interface Props {}

const NotVerified: FC<Props> = (props) => {
  return (
    <div className="flex items-center justify-center min-h-screen text-4xl font-semibold text-white bg-red-500">
      User Is Not Verified. Kindly Go To Your Email Inbox And Verify Your Email.
    </div>
  );
};

NotVerified.defaultProps = {};

export default memo(NotVerified);
