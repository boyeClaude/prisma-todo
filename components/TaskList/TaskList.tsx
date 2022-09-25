import React from 'react';
import Card from '../Card/Card';

export interface ITask {
  id: string;
  title: string;
  description: string;
}
export interface ITaskList {
  tasks: Array<ITask>;
}


const TaskList = (props: ITaskList) => {
  const { tasks } = props;
  return (
    <div className="grid md:grid-rows-2 md:grid-cols-2">
      {tasks && tasks.length > 0 ? (
        tasks?.map((task: ITask) => <Card title={task.title} description={task.description} id={task.id} key={task.id} />)
      ) : (
        <div className="tex-center font-bold text-xl">No Data</div>
      )}
    </div>
  );
};

export default TaskList;
