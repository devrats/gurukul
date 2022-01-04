import { FC, memo } from "react";

interface Props {}

const PageNotFound: FC<Props> = (props) => {
  return (
    <div className="flex items-center justify-center min-h-screen text-4xl font-semibold text-white bg-red-500">
      PAGE NOT FOUND
    </div>
  );
};

PageNotFound.defaultProps = {};

export default memo(PageNotFound);
