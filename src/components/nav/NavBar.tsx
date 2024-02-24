'use client'

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import Link from "next/link";
import { navRoutes } from "./constants"
import { Hub } from "aws-amplify/utils";

export default function NavBar ({ isLoggedIn }: { isLoggedIn: boolean }) {

  const [ authCheck, SetAuthCheck ] = useState(isLoggedIn);
  console.log('- authCheck', authCheck)
  const router = useRouter();

  useEffect(() => {
    const hubCancel = Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          SetAuthCheck(true);
          startTransition(() => router.push("/"));
          startTransition(() => router.refresh());
          break;
        case "signedOut":
          SetAuthCheck(false);
          startTransition(() => router.push("/"));
          startTransition(() => router.refresh());
          break;
      }
    })
    return () => hubCancel();
  }, [router]);

  const logOutLogIn = async () => {
    console.log('here in logoutlogin: authcheck', authCheck)
    if (authCheck) {
      await signOut();
    } else {
      router.push("/login")
    }
  }

  const routes = navRoutes.filter(
    (route) => route.needToBeLogged === authCheck || route.needToBeLogged === undefined
  );

  return (
    <>
      <div className="navbar">
        <div className="navbar-menu">
          <img src="./memo.png" alt="Logo" />
          <h2>Share Special</h2>
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>{route.label}</Link>
          ))}          
        </div>
        <div onClick={logOutLogIn}>
          <button>{authCheck ? "Log Out" : "Log In"}</button>
          {/* <Greetings />  */}
        </div>
      </div>
    </>
  )
}

