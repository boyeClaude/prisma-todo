import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Form from "../components/Form/Form";

const Index: React.FC = () => {
  const [id, setId] = useState<string | string[]>("");
  const [task, setTask] = useState<any>({});
  const router = useRouter();

  const fetchTask = async (id: string) => {
    const response = await fetch(`/api/tasks/${id}`);
    const result = await response.json();
    setTask(result);
  };

  useEffect(() => {
    const data = router.query;
    const { taskId } = data;
    console.log("the task id =>", taskId);

    if (taskId) {
      setId(taskId);
      const _id = taskId.toString();
      fetchTask(_id);
    }
  }, [router.query]);

  if (id) {
    return (
      <div className="min-h-full py-16 px-0 flex flex-1 flex-col justify-center items-center">
        {Object.keys(task).length !== 0 && <Form buttonTitle="Update" updateTask={task} />}
      </div>
    );
  }

  return null;
};

export default Index;
