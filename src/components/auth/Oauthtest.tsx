

const Oauthtest = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    // performs login request
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });
  //get user auth
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  );
  if (credentialState === appleAuth.State.AUTHORIZED) {
    console.log('Apple Login Test');
  }
};