import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

import logo from "@/assets/images/cheat_tweet_logo.png";
import Head from "next/head";

type signinProps = {
  providers: Record<string, any>;
};

const signin = (props: signinProps) => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className="flex flex-col items-center pt-16">
        <Image src={logo} alt="logo" width={140} height={140} />
        <p className="italic">
          This app is created for educational reasosn only !!!!!!!!
        </p>
        <p className="text-sm">(and maybe a bit of fun)</p>
        <div className="flex flex-col items-center p-3 px-5 mt-8 bg-gray-700 rounded-lg">
          <h1 className="pb-2 font-bold text-white">Options</h1>
          {Object.values(props.providers).map((provider) => (
            <div key={provider.name} className="flex flex-col items-center">
              <div className="p-2 font-bold text-white bg-red-500 rounded-md">
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default signin;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
