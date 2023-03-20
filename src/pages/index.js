import React from 'react'
import Router from 'next/router';
import Head from 'next/head';
export default function Login() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    console.log(email, password)
    Router.push('/home')
  }
  // TODO: Integrate Arcana Login
  return (
    <>
      <Head>
        <title>PeerTask</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-[#1a1e27] text-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-[#0284c7]">
            Sign in
          </h1>
          <form className="mt-6" onSubmit={handleLogin}>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white"
              >
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-white bg-black border border-gray-700 rounded-md focus:border-blue-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-white"
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-white bg-black border border-gray-700 rounded-md focus:border-blue-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <button className="w-full bg-[#0284c7] text-white text-lg px-5 py-2 rounded-xl">
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-white">
            {" "}
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-[#0284c7] hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}