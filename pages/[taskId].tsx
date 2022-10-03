import { Router, useRouter } from "next/router";
import React from "react";
import Form from "../components/Form/Form";

const Index: React.FC = () => {
  const router = useRouter();
  const data = router.query;
  const { taskId } = data;
  console.log("the router id is : ", String(taskId));

  const task = {
    id: taskId,
    title: "To go running or Concentrate",
    description: "I have to go running in the night or more concentration",
  };

  console.log("THE TASK =>", task);

  return (
    <div className="min-h-full py-16 px-0 flex flex-1 flex-col justify-center items-center">
      <Form buttonTitle="Update" updateTask={task} />
    </div>
  );
};

export default Index;
