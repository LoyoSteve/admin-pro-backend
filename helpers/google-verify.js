const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID_CLIENT);

const googleVerify = async ( token ) => {

  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID_CLIENT
  });

  const payload = ticket.getPayload();
  const userid = payload['sub'];

  console.log(payload);
  const {name, email, picture} = payload;

  return { name, email, picture}
}

module.exports = {
    googleVerify
}