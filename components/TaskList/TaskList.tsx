import React from 'react';
import Card from '../Card/Card';

const TaskList = () => {
  return (
    <div className="flex flex-col justify-center items-center md:flex-wrap md:flex-row">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default TaskList;
