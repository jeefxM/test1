import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      {session ? (
        <div>
          <h1>Welcome, {session.user.email}</h1>
          <img className="" src={session.user.image}></img>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </div>
  );
};

export default Login;
