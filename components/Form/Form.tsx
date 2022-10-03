import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ITask } from "../TaskList/TaskList";

interface IForm {
  reloadList?: () => void;
  buttonTitle?: string;
  updateTask?: ITask;
}

const Form: React.FC<IForm> = ({ reloadList, buttonTitle = "Add", updateTask }) => {
  const [tasks, setTasks] = useState({
    title: "" || (updateTask && updateTask?.title),
    description: "" || (updateTask && updateTask?.description),
  });

  const router = useRouter();

  const loadTasksList = () => {
    reloadList && reloadList();
  };

  const resetForm = () => {
    setTasks((prevState) => ({ ...prevState, title: "", description: "" }));
  };

  const handleChange = (e: React.FormEvent | any) => {
    e.preventDefault();
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newTask = { [fieldName]: fieldValue };

    setTasks((prevState) => ({ ...prevState, ...newTask }));
  };

  const formSubmit = async (e: React.FormEvent, id?: any) => {
    e.preventDefault();

    // Update task
    if (id) {
      const updatedTask = { ...tasks, id: id };
      console.log(`Update task : ${JSON.stringify(updatedTask)}`);
      try {
        await fetch(`/api/tasks/${id}`, {
          method: "UPDATE",
          headers: { "Content-type": "application/json", "Access-Control-Allow-Origin": "*" },
          mode: "cors",
          body: JSON.stringify(updatedTask),
        });

        resetForm();
        loadTasksList();
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await fetch("/api/tasks/create", {
          method: "POST",
          headers: { "Content-type": "application/json", "Access-Control-Allow-Origin": "*" },
          mode: "cors",
          body: JSON.stringify(tasks),
        });

        resetForm();
        loadTasksList();
      } catch (error) {
        console.error(error);
      }

      // console.log(`created task : ${JSON.stringify(tasks)}`);
    }
  };

  return (
    <div className="text-center text-lg leading-6 my-16 mx-0 ">
      <form
        onSubmit={(e) => {
          updateTask && updateTask?.id ? formSubmit(e, updateTask?.id) : formSubmit(e);
        }}
        className="border-2 border-gray-200  text-left p-4 rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-lg" htmlFor="title">
            Title
          </label>
          <input
            autoFocus
            name="title"
            value={tasks.title}
            onChange={(event) => handleChange(event)}
            type="text"
            className="outline-none  border-2 w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={tasks.description}
            onChange={(event) => handleChange(event)}
            className="outline-none border-2 w-full p-4"
            id="description"
            cols={30}
          ></textarea>
        </div>

        <button
          className={
            tasks.title && tasks.description
              ? "px-8 py-2 text-white bg-blue-800 rounded-lg text-lg"
              : "px-8 py-2 text-white bg-blue-100 rounded-lg text-lg"
          }
          type="submit"
          disabled={!tasks.title && !tasks.description}
        >
          {buttonTitle}
        </button>
      </form>
    </div>
  );
};

export default Form;
