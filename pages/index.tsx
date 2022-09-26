import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import Form from '../components/Form/Form';
import TaskList, { ITask } from '../components/TaskList/TaskList';
import prisma from '../lib/prisma';

type IHome = {
  results: Array<ITask>;
};

const Home: React.FC<IHome> = (props) => {
  const { results } = props;

  return (
    <div className="py-0 px-8">
      <Head>
        <title>Task App</title>
        <meta name="description" content=" Task app using next and prisma " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-full py-16 px-0 flex flex-1 flex-col justify-center items-center">
        <h1 className="text-6xl m-0 leading-5">Task App</h1>
        <Form />
        <TaskList tasks={results} />
      </main>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetServerSideProps = async () => {
  const results = await prisma.task.findMany({ orderBy: { id: 'desc' } });
  return {
    props: { results },
  };
};

export default Home;
