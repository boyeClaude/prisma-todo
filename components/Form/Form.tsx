import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Form: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const router = useRouter();

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { title, description };
      await fetch('/api/tasks/create', {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        mode: 'cors',
        body: JSON.stringify(body),
      });

      resetForm();
      router.reload();
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
          <input autoFocus value={title} onChange={(e) => setTitle(e?.target?.value)} type="text" className="outline-none  border-2 w-full p-2" />
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

        <button className="px-8 py-2 text-white bg-blue-800 rounded-lg text-lg" type="submit" disabled={!title || !description}>
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
