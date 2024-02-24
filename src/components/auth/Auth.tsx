'use client'

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "@/../../amplifyconfiguration.json"

Amplify.configure(config, {ssr: true});

const Auth = ({children}: {children: React.ReactNode}) => {
    return <Authenticator.Provider>{children}</Authenticator.Provider>;    
}

export default Auth;