import React, { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import moment from "moment";
import ProjectForm from "../components/ProjectFrom";

const ProjectDetails = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const { dispatch } = useProjectsContext();

  const handleDelete = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}${project._id}`, {
      method: "DELETE",
    });

    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_PROJECT", payload: json });
    }
  };

  const handleUpdate = () => {
    setIsModalOpen(true);
    setIsOverlayOpen(true);
  };

  const handleOverlay = () => {
    setIsModalOpen(false);
    setIsOverlayOpen(false);
  };

  return (
    <div className="project bg-slate-800 p-5 rounded-xl shadow-xl border border-slate-700 flex flex-col gap-5 w-[30rem] hover:bg-slate-900 duration-300">
      <div className="project-top">
        <span className="text-sky-400">ID: {project._id}</span>
        <h3 className="text-3xl font-medium truncate">{project.title}</h3>
        <span className="uppercase text-xs tracking-widest font-medium text-slate-500">
          {project.tech}
        </span>
      </div>

      <div className="project-mid flex gap-10 text-slate-300">
        <div className="left flex flex-col">
          <span>Budget: {currencyFormatter(project.budget)}</span>
          <span>
            Created: {moment(project.createdAt).format("MMM DD, hh:mm A")}
          </span>
          <span>
            Updated: {moment(project.updatedAt).format("MMM DD, hh:mm A")}
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
        <button
          onClick={handleUpdate}
          className="bg-sky-400 py-2 px-5 rounded shadow-xl text-slate-900 hover:bg-sky-50 duration-300"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="text-rose-500 hover:underline underline-offset-2"
        >
          Delete
        </button>
      </div>

      {/* OVERLAY */}
      <div
        onClick={handleOverlay}
        className={`overlay fixed z-[1] h-screen w-screen bg-slate-900/50 backdrop-blur-sm top-0 left-0 right-0 bottom-0 ${
          isOverlayOpen ? "" : "hidden"
        }`}
      ></div>

      {/* MODAL */}
      <div
        className={`update-modal w-[35rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-10 shadow-xl rounded-xl border border-slate-700 z-[2] ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <h2 className="section-title text-4xl text-sky-400 font-semibold mb-5">
          Update Project
        </h2>

        <ProjectForm
          project={project}
          setIsModalOpen={setIsModalOpen}
          setIsOverlayOpen={setIsOverlayOpen}
        />
      </div>
    </div>
  );
};

export default React.memo(ProjectDetails);
