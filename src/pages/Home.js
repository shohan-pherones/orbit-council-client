import { useEffect } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectFrom";

const Home = () => {
  const { projects, dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(
        process.env.REACT_APP_BASE_URL + "/api/projects",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_PROJECTS", payload: json });
      }
    };

    if (user) {
      fetchProjects();
    }
  }, [dispatch, user]);

  return (
    <div className="home container mx-auto py-20 grid md:grid-cols-3 gap-10 w-full">
      <div className="md:col-span-2">
        <h2 className="section-title text-4xl text-sky-400 font-semibold mb-10">
          {projects.length < 1 ? "No Projects" : "All Projects"}
        </h2>

        <div className="projects flex gap-10 flex-wrap">
          {projects &&
            projects.map((project) => (
              <ProjectDetails key={project._id} project={project} />
            ))}
        </div>
      </div>

      <div className="w-full">
        <ProjectForm />
      </div>
    </div>
  );
};

export default Home;
