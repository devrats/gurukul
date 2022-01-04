import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AuthContext from "./context/auth.context";
import { User } from "./models/User";
import AppContainerPage from "./Pages/AppContainer.page";
import AuthPage from "./Pages/Auth.page";
import PageNotFoundPage from "./Pages/PageNotFound.page";
import { ImSpinner9 } from "react-icons/im";
import { TOKEN_ID } from "./api/auth";
import ClassContext from "./context/class.context";
import { Class } from "./models/Class";
import RoleContext from "./context/role.context";
import { getRole } from "./api/backendApi";
import NotVerified from "./Pages/NotVerified";

function App() {
  const [user, setUser] = useState<User>();
  const [role, setRole] = useState("");
  const [classroom, setClassroom] = useState<Class[]>([]);
  const token = localStorage.getItem(TOKEN_ID);

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      if (u !== null) {
        // console.log("user: ", u);
        setUser(u);
        const uid = u.uid;
        getRole({ id: uid }).then((res) => {
          setRole(res.data.Role);
          // console.log(res.data.Role);
        });
      }
    });
  }, []);

  if (token && !user) {
    return (
      <div className="flex items-center justify-center min-w-full min-h-screen">
        <ImSpinner9 className="w-20 h-20 text-blue-500 animate-spin " />
      </div>
    );
  }

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <ClassContext.Provider value={{ classroom, setClassroom }}>
        <AuthContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact>
                {user ? (
                  user.emailVerified ? (
                    <Redirect to="/classroom" />
                  ) : (
                    <NotVerified />
                  )
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route path={["/login", "/signup"]} exact>
                {user ? (
                  user.emailVerified ? (
                    <Redirect to="/classroom" />
                  ) : (
                    <NotVerified />
                  )
                ) : (
                  <AuthPage />
                )}
              </Route>
              <Route
                path={[
                  "/classroom",
                  "/dashboard/:secretCode",
                  "/assignment/:announcementId",
                ]}
                exact
              >
                {user ? (
                  user.emailVerified ? (
                    <AppContainerPage />
                  ) : (
                    <NotVerified />
                  )
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route>
                <PageNotFoundPage />
              </Route>
            </Switch>
          </BrowserRouter>
        </AuthContext.Provider>
      </ClassContext.Provider>
    </RoleContext.Provider>
  );
}

export default App;
