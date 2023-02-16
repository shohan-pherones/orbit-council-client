import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";

export const useProjectsContext = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useProjectsContext hook must be used inside a ProjectContextProvider"
    );
  }

  return context;
};
