import { FC, memo } from "react";
import "../css/postWithComment.css";
import dummy from "../img/GLA.png";

interface Props {}

const PostWithComment: FC<Props> = (props) => {
  return (
    <div id="container" className="max-w-5xl">
      <header>
        <img src={dummy} alt="GLA logo" />
        <div id="headerInfoDiv">
          <h3>Teacher Name</h3>
          <p>Month Date (Edited Month Data)</p>
        </div>
      </header>

      <main>
        <div id="mainSubDiv">
          <div id="mainContentDiv">
            <p>
              Sample Zip File for the reference of Project Submission. Sample
              Message
            </p>
            <p>
              Note: Kindly follow the deadline of 25th Nov , 2021. No submission
              allowed after this.
            </p>
          </div>

          <div id="lowerDivForPost">
            <div className="image-div">
              <img
                src="https://fonts.gstatic.com/s/i/productlogos/drive_2020q4/v8/web-48dp/logo_drive_2020q4_color_1x_web_48dp.png"
                alt=""
              />
            </div>
            <div id="image-rightDiv">
              <h1>191500339_HemantMudgal</h1>
              <p>Compressed Archive</p>
            </div>
          </div>
        </div>

        <footer className="flex space-x-5">
          <div id="footerLeftDiv" className="flex items-center">
            <img
              src="https://lh3.googleusercontent.com/a/default-user=s40-c"
              alt=""
            />
          </div>

          {/* <div id="footerRigthDiv">
                    <textarea  placeholder="Add your comment here" />
                    <div className="flex items-center mx-auto">
                    <IoMdSend className="w-7 h-7"/>
                    </div>
                  </div> */}
          {/* <ClassCommentTextarea className="" /> */}
        </footer>
      </main>
    </div>
  );
};

PostWithComment.defaultProps = {};

export default memo(PostWithComment);
