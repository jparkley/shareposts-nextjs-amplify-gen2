'use client'

import { Authenticator } from "@aws-amplify/ui-react";

const AuthForm = () => {
  return (
    <div className="container-auth"><Authenticator /></div>
  );
}

export default AuthForm;