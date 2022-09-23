import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import Form from '../components/Form/Form';
import TaskList from '../components/TaskList/TaskList';

const Home: NextPage = (props) => {
  return (
    <div className="py-0 px-8">
      <Head>
        <title>Task App</title>
        <meta name="description" content=" Task app using next and prisma " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main component */}
      <main className="min-h-full py-16 px-0 flex flex-1 flex-col justify-center items-center">
        <h1 className="text-6xl m-0 leading-5">Task App</h1>
        <div className="text-center text-lg leading-6 my-16 mx-0 ">
          <Form />
        </div>
        <TaskList />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
