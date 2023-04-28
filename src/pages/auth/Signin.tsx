import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import logo from "@/assets/images/cheat_tweet_logo.png";
import Head from "next/head";
import { auth } from "../../../firebase";

type signinProps = {
  providers: Record<string, any>;
};
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface SignupType {
  email: string;
  password: string;
  password_confirm: string;
}
const Signin = (props: signinProps) => {
  const methods = useForm<SignupType>({ mode: "onBlur" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const router = useRouter();

  const onSubmit = async (data: SignupType) => {
    console.log(data);
    return createUserWithEmailAndPassword(auth, data.email, data.password);
  };

  const [sn, setSn] = useState(false);

  const logIn = async (data: SignupType) => {
    console.log(data);
    return signInWithEmailAndPassword(auth, data.email, data.password);
  };
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
          {sn ? (
            <div>
              <h2 className="px-12 mt-8 text-2xl font-semibold text-center">
                Sign Up
              </h2>
              <FormProvider {...methods}>
                <form
                  action=""
                  className="px-4 pb-12 mx-auto w-80"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <label htmlFor="" className="block mb-3 font-sans ">
                        Email
                      </label>
                    </div>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                    />
                    {errors.email && (
                      <p className="text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <label htmlFor="" className="block mb-3 font-sans ">
                        Password
                      </label>
                    </div>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                    />
                    {errors.password && (
                      <p className="text-red-400">{errors.password.message}</p>
                    )}
                  </div>
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <label htmlFor="" className="block mb-3 font-sans ">
                        Confirm Password
                      </label>
                    </div>
                    <input
                      type="password"
                      {...register("password_confirm", {
                        required: "Verify your password",
                      })}
                      className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                    />
                    {errors.password_confirm && (
                      <p className="text-red-400">
                        {errors.password_confirm.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-center pt-8">
                    <button
                      type="submit"
                      className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}
                    >
                      <p className="font-normal text-white capitalize">
                        submit
                      </p>
                    </button>
                  </div>
                </form>
              </FormProvider>
              <div className="flex justify-center pb-2">
                <button
                  onClick={() => setSn(!sn)}
                  className="ml-2 text-red-500 bold"
                >
                  Log in
                </button>
              </div>
            </div>
          ) : (
            <div className="container mx-auto mt-12 border-2 border-gray-400 sign-up-form w-96">
              <h2 className="px-12 mt-8 text-2xl font-semibold text-center ">
                Log In
              </h2>
              <FormProvider {...methods}>
                <form
                  action=""
                  className="px-4 pb-12 mx-auto w-80"
                  onSubmit={handleSubmit(logIn)}
                >
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <label htmlFor="" className="block mb-3 font-sans ">
                        Email
                      </label>
                    </div>

                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                    />
                    {errors.email && (
                      <p className="text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <label htmlFor="" className="block mb-3 font-sans ">
                        Password
                      </label>
                    </div>

                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                    />
                    {errors.password && (
                      <p className="text-red-400">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="flex justify-center pt-8">
                    <button
                      type="submit"
                      className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}
                    >
                      <p className="font-normal text-white capitalize">
                        submit
                      </p>
                    </button>
                  </div>
                </form>
              </FormProvider>
              <div className="flex justify-center pb-2">
                <p>No account?</p>
                <button
                  onClick={() => setSn(!sn)}
                  className="ml-2 text-red-500 bold"
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
