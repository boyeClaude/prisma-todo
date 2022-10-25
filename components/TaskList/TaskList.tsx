import React from "react";
import Card from "../Card/Card";

export interface ITask {
  id: string | any;
  title: string;
  description: string;
}
export interface ITaskList {
  tasks: Array<ITask>;
  reloadList?: () => void;
}

const TaskList: React.FC<ITaskList> = (props) => {
  const { tasks, reloadList } = props;
  return (
    <div className="grid md:grid-rows-2 md:grid-cols-2">
      {tasks && tasks.length > 0 ? (
        tasks?.map((task: ITask) => <Card task={task} key={task.id} reloadList={reloadList} />)
      ) : (
        <div className="tex-center font-bold text-xl">No Data</div>
      )}
    </div>
  );
};

export default TaskList;
