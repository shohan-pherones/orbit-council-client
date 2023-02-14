import { useState } from "react";

const ProjectFrom = () => {
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [manager, setManager] = useState("");
  const [dev, setDev] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const project = { title, tech, budget, duration, manager, dev };

    // posting project to the server
    const res = await fetch("http://localhost:4000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }

    if (res.ok) {
      setTitle("");
      setTech("");
      setBudget("");
      setDuration("");
      setManager("");
      setDev("");
      setError(null);
      console.log("New project added");
    }
  };

  return (
    <form className="project-form flex flex-col gap-5" onSubmit={handleSubmit}>
      <h2 className="section-title text-4xl text-sky-400 font-semibold mb-5">
        Add a New Project
      </h2>

      <div className="form-control">
        <label htmlFor="title">Project Title</label>
        <input
          type="text"
          placeholder="e.g. e-commerce store"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
        />
      </div>
      <div className="form-control">
        <label htmlFor="tech">Technologies</label>
        <input
          type="text"
          placeholder="e.g. node, express, react"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          id="tech"
        />
      </div>
      <div className="form-control">
        <label htmlFor="budget">Budget (in USD)</label>
        <input
          type="number"
          placeholder="e.g. 1000"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          id="budget"
        />
      </div>
      <div className="form-control">
        <label htmlFor="duration">Duration (in weeks)</label>
        <input
          type="number"
          placeholder="e.g. 4"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          id="duration"
        />
      </div>
      <div className="form-control">
        <label htmlFor="manager">Manager</label>
        <input
          type="text"
          placeholder="e.g. Sarah"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          id="manager"
        />
      </div>
      <div className="form-control">
        <label htmlFor="dev">Total Developers</label>
        <input
          type="number"
          placeholder="e.g. 5"
          value={dev}
          onChange={(e) => setDev(e.target.value)}
          id="dev"
        />
      </div>

      <button type="submit">Add Project</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default ProjectFrom;
