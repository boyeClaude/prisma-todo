import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import Card from '../components/Card/Card';
import Footer from '../components/Footer/Footer';
import Form from '../components/Form/Form';
import { ITask } from '../components/TaskList/TaskList';
import prisma from '../lib/prisma';

type IHome = {
  results: ITask[];
};

const Home: React.FC<IHome> = (props) => {
  const { results } = props;
  console.log(' the results =>', results);

  const Tasklist = results?.map((task: ITask) => (
    <Fragment key={task.id}>
      <Card title={task.title} description={task.description} />
    </Fragment>
  ));

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

        {/* Tasklist */}
        <div className="grid md:grid-rows-2 md:grid-cols-2">{results ? Tasklist : <>No Data</>}</div>
      </main>

      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const results = await prisma.task.findMany();
  return {
    props: { results },
  };
};

export default Home;
