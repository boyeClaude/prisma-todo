import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Form from "../components/Form/Form";
import TaskList, { ITask } from "../components/TaskList/TaskList";

type IHome = {
  results: Array<ITask>;
};

const Home: React.FC = () => {
  const [tasks, setTaks] = useState<Array<ITask>>([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks", {
        method: "GET",
        headers: { "Content-type": "application/json", "Access-Control-Allow-Origin": "*" },
        mode: "cors",
      });
      const result = await response.json();
      setTaks(result);
      console.log("the result =>", result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      fetchTasks();
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="py-0 px-8">
      <Head>
        <title>Task App</title>
        <meta name="description" content=" Task app using next and prisma " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-full py-16 px-0 flex flex-1 flex-col justify-center items-center">
        <h1 className="text-6xl m-0 leading-5">Task App</h1>
        <Form reloadList={fetchTasks} />
        <TaskList tasks={tasks} reloadList={fetchTasks} />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
