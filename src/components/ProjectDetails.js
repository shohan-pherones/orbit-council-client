import { currencyFormatter } from "../utils/currencyFormatter";

const ProjectDetails = ({ project }) => {
  return (
    <div className="project bg-slate-800 p-5 rounded-xl shadow-xl border border-slate-700 flex flex-col gap-5">
      <div className="project-top">
        <span className="text-sky-400">ID: {project._id}</span>
        <h3 className="text-3xl font-medium">{project.title}</h3>
        <span className="uppercase text-xs tracking-widest font-medium text-slate-500">
          {project.tech}
        </span>
      </div>

      <div className="project-mid flex gap-10 text-slate-300">
        <div className="left flex flex-col">
          <span>Budget: {currencyFormatter(project.budget)}</span>
          <span>
            Added on: {new Date(project.createdAt).toLocaleDateString()}
          </span>
          <span>
            Last updated: {new Date(project.updatedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="right flex flex-col">
          <span>Manager: {project.manager}</span>
          <span>Developers: {project.dev}</span>
          <span>
            Duration:{" "}
            {`${project.duration} week${project.duration === 1 ? "" : "s"}`}
          </span>
        </div>
      </div>

      <div className="project-bottom flex gap-5">
        <button className="bg-sky-400 py-2 px-5 rounded shadow-xl text-slate-900 hover:bg-sky-50 duration-300">
          Update
        </button>
        <button className="text-rose-500 hover:underline underline-offset-2">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
