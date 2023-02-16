import { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";

const ProjectFrom = ({ project, setIsModalOpen, setIsOverlayOpen }) => {
  const [title, setTitle] = useState(project ? project.title : "");
  const [tech, setTech] = useState(project ? project.tech : "");
  const [budget, setBudget] = useState(project ? project.budget : "");
  const [duration, setDuration] = useState(project ? project.duration : "");
  const [manager, setManager] = useState(project ? project.manager : "");
  const [dev, setDev] = useState(project ? project.dev : "");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useProjectsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // creating project object
    const projectObj = { title, tech, budget, duration, manager, dev };

    // console.log(projectObj);

    if (!project) {
      // sending post request
      const res = await fetch("http://localhost:4000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectObj),
      });
      const json = await res.json();

      // if response is false
      if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      // if response is true
      if (res.ok) {
        setTitle("");
        setTech("");
        setBudget("");
        setDuration("");
        setManager("");
        setDev("");
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_PROJECT", payload: json });
      }

      return null;
    }

    if (project) {
      // console.log(projectObj);
      // sending patch request
      const res = await fetch(
        `http://localhost:4000/api/projects/${project._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectObj),
        }
      );
      const json = await res.json();
      console.log(json);

      // if response is false
      if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      // if response is true
      if (res.ok) {
        setError(null);
        setEmptyFields([]);
        // console.log(json);
        dispatch({ type: "UPDATE_PROJECT", payload: json });
        setIsModalOpen(false);
        setIsOverlayOpen(false);
      }
    }

    return null;
  };

  return (
    <form className="project-form flex flex-col gap-5" onSubmit={handleSubmit}>
      <h2
        className={`section-title text-4xl text-sky-400 font-semibold mb-5 ${
          project ? "hidden" : ""
        }`}
      >
        Add a New Project
      </h2>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="title"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Project Title
        </label>
        <input
          type="text"
          placeholder="e.g. e-commerce store"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          className={`bg-transparent border ${
            emptyFields.includes("title")
              ? "border-rose-500"
              : "border-slate-500"
          } py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="tech"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Technologies
        </label>
        <input
          type="text"
          placeholder="e.g. node, express, react"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          id="tech"
          className={`bg-transparent border ${
            emptyFields.includes("tech")
              ? "border-rose-500"
              : "border-slate-500"
          } py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="budget"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Budget (in USD)
        </label>
        <input
          type="number"
          placeholder="e.g. 1000"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          id="budget"
          className={`bg-transparent border ${
            emptyFields.includes("budget")
              ? "border-rose-500"
              : "border-slate-500"
          } py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="duration"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Duration (in weeks)
        </label>
        <input
          type="number"
          placeholder="e.g. 4"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          id="duration"
          className={`bg-transparent border ${
            emptyFields.includes("duration")
              ? "border-rose-500"
              : "border-slate-500"
          } py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="manager"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Manager
        </label>
        <input
          type="text"
          placeholder="e.g. Sarah"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          id="manager"
          className={`bg-transparent border ${
            emptyFields.includes("manager")
              ? "border-rose-500"
              : "border-slate-500"
          } py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="dev"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Total Developers
        </label>
        <input
          type="number"
          placeholder="e.g. 5"
          value={dev}
          onChange={(e) => setDev(e.target.value)}
          id="dev"
          className={`bg-transparent border ${
            emptyFields.includes("dev") ? "border-rose-500" : "border-slate-500"
          } py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300`}
        />
      </div>

      <button
        type="submit"
        className="bg-sky-400 text-slate-900 py-3 rounded-lg hover:bg-sky-50 duration-300"
      >
        {project ? "Confirm Update" : "Add Project"}
      </button>
      {error && (
        <p className="error bg-rose-500/10 p-5 rounded-lg border border-rose-500 text-rose-500">
          {error}
        </p>
      )}
    </form>
  );
};

export default ProjectFrom;
