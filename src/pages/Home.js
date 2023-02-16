import { useEffect } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectFrom";

const Home = () => {
  const { projects, dispatch } = useProjectsContext();

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(process.env.REACT_APP_API_URL);

      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_PROJECTS", payload: json });
      }
    };

    fetchProjects();
  }, [dispatch]);

  return (
    <div className="home container mx-auto py-20 grid grid-cols-3 gap-10">
      <div className="col-span-2">
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

      <ProjectForm />
    </div>
  );
};

export default Home;
