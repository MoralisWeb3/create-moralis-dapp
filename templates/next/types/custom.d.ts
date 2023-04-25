import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: (
      | {
          id: string;
          domain: string;
          statement?: string | undefined;
          uri: string;
          expirationTime?: string | undefined;
          notBefore?: string | undefined;
          resources?: string[] | undefined;
          version: string;
          nonce: string;
          profileId: string;
          chainId: string;
          address: string;
        }
      | {
          id: string;
          domain: string;
          statement?: string | undefined;
          uri: string;
          expirationTime?: string | undefined;
          notBefore?: string | undefined;
          resources?: string[] | undefined;
          version: string;
          nonce: string;
          profileId: string;
          network: string;
          address: string;
        }
    ) & {
      payload: string;
    };
  }
}
