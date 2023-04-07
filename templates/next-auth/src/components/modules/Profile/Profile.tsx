import { useEvmNativeBalance } from '@moralisweb3/next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FC, useEffect } from 'react';
import styles from './Profile.module.css';

const Profile: FC = () => {
  const { data } = useSession();
  const { data: balance, fetch } = useEvmNativeBalance(undefined, {
    revalidateOnMount: false,
  });

  useEffect(() => {
    if (!data?.user?.address) {
      return;
    }
    fetch({ address: data.user.address });
  }, [data?.user?.address]);

  return (
    <div className={styles.profile}>
      <Image src="/assets/mage.svg" width={46} height={46} alt="profile" />
      <h4>{data?.user?.address}</h4>
      <p>Profile ID: {data?.user.profileId}</p>
      <p>Payload: {(data?.user as { payload?: string }).payload}</p>
      <p>Native Balance: {balance?.balance.ether} Ether</p>
    </div>
  );
};

export default Profile;
