import { AuthPage } from 'src/components/templates';
import { Default } from 'src/components/layouts';
import { Meta } from 'src/components/elements';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

const SignIn: NextPage = () => {
  return (
    <Default>
      <Meta />
      <AuthPage />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default SignIn;
