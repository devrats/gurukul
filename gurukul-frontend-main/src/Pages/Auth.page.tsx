import { FC, memo } from "react";
import { Route, Switch } from "react-router";
import LoginPage from "./Login.page";
import SignupPage from "./Signup.page";
import hero from "../img/SignInPageGif.gif";

interface Props {}

const Auth: FC<Props> = (props) => {
  return (
    <div className="flex">
      <div className="w-full md:w-1/2">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
        </Switch>
      </div>
      <div className="items-center hidden w-1/2 bg-primaryPink md:flex">
        <img src={hero} alt="hero icon" />
      </div>
    </div>
  );
};

Auth.defaultProps = {};

export default memo(Auth);
