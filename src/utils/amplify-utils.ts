import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { cookies } from "next/headers";
import config from "@/../../amplifyconfiguration.json";
import { getCurrentUser } from "aws-amplify/auth/server";

const { runWithAmplifyServerContext } = createServerRunner({ config })

export const isAuthenticated = async () => await runWithAmplifyServerContext({
  nextServerContext: { cookies },
  async operation(contextSpec) {
    try {
      const user = await getCurrentUser(contextSpec);
      return !!user;
    } catch (error) {
      return false;
    }
  }
})