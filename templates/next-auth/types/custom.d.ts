import 'next-auth';
import {
  VerifyChallengeSolanaJSONResponse,
  VerifyChallengeEvmJSONResponse,
} from 'moralis/common-auth-utils';

declare module 'next-auth' {
  interface Session {
    user: VerifyChallengeSolanaJSONResponse | VerifyChallengeEvmJSONResponse;
  }
}
