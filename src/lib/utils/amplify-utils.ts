import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import config from "../../../amplifyconfiguration.json";
import { cookies } from "next/headers";
import { getCurrentUser } from "aws-amplify/auth/server";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data";
// import { Schema } from "../../amplify/data/resource";
import { type Schema } from "../../../amplify/data/resource";

export const client = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
  authMode: "userPool",
});

console.log("====== in amplify-utils ~ client:", client);

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const isAuthenticated = async () =>
  await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec);
        console.log("======= user", user);
        return !!user;
      } catch (error) {
        return false;
      }
    },
  });
