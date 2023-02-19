import { useAuthContext } from "./useAuthContext";
import { useProjectsContext } from "./useProjectsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: projectsDispatch } = useProjectsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    projectsDispatch({ type: "SET_PROJECTS", payload: [] });
  };

  return { logout };
};
