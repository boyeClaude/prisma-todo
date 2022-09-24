import React from 'react';
import Card from '../Card/Card';

export interface ITask {
  id: string;
  title: string;
  description: string;
}

const TaskList = () => {
  return (
    <div className="grid md:grid-rows-2 md:grid-cols-2">
      <Card title={'title'} description={'description'} />
    </div>
  );
};

export default TaskList;
