import React, { useEffect, useState } from "react";

interface IForm {
  reloadList: () => void;
}

const Form: React.FC<IForm> = (props) => {
  const [tasks, setTasks] = useState({
    title: "",
    description: "",
  });

  const { reloadList } = props;

  const loadTasksList = () => {
    reloadList();
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

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  return (
    <div className="text-center text-lg leading-6 my-16 mx-0 ">
      <form onSubmit={formSubmit} className="border-2 border-gray-200  text-left p-4 rounded-lg">
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
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
