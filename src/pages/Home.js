import { useFetch } from "../hooks/useFetch";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectFrom";

const Home = () => {
  const { data: projects } = useFetch("http://localhost:4000/api/projects");

  return (
    <div className="home container mx-auto py-20 grid grid-cols-3 gap-10">
      <div className="col-span-2">
        <h2 className="section-title text-4xl text-sky-400 font-semibold mb-10">
          All Projects
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
