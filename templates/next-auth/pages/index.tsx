import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Meta } from 'src/components/elements';
import { Default } from 'src/components/layouts';
import { UserPage } from 'src/components/templates';

const User: NextPage = () => {
  return (
    <Default>
      <Meta />
      <UserPage />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default User;
