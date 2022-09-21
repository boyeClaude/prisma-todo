import React, { useState } from 'react';

const Form: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = { title, description };

    console.log('the body =>', body);
    resetForm();
  };
  return (
    <form onSubmit={formSubmit} className="border-2 border-gray-200  text-left p-4 rounded-lg">
      <div className="mb-4">
        <label className="block text-lg" htmlFor="title">
          Title
        </label>
        <input value={title} onChange={(e) => setTitle(e?.target?.value)} type="text" className="outline-none  border-2 w-full p-2" />
      </div>
      <div className="mb-4">
        <label className="block text-lg" htmlFor="description">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e?.target?.value)}
          className="outline-none border-2 w-full p-4"
          name="description"
          id="description"
          cols={30}
        ></textarea>
      </div>

      <button className="px-8 py-2 text-white bg-blue-800 rounded-lg text-lg" type="submit">
        Add
      </button>
    </form>
  );
};

export default Form;
