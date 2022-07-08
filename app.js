const axios = require("axios").default;
const express = require("express");
// const querystring = require("querystring");
const app = express();

require("dotenv").config();

const PORT = 5000;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

var generateString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz1234567890";
  var lenString = length;
  var randomString = "";

  for (let i = 0; i < lenString; i++) {
    let rNum = Math.floor(Math.random() * characters.length);
    randomString += characters.substring(rNum, rNum + 1);
  }
  return randomString;
};

const stateKey = "spotify_auth_state";

app.get("/login", (req, res) => {
  const state = generateString(16);
  res.cookie(stateKey, state);

  const scope = ["user-read-private", "user-read-email", "user-top-read"].join(
    " "
  );

  const params = {
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    state: state,
    scope: scope,
  };

  const urlParams = new URLSearchParams(params).toString();

  const URL = `https://accounts.spotify.com/authorize?${urlParams}`;
  res.redirect(URL);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const parameter = {
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code: code,
  };

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${new Buffer.from(
      clientId + ":" + clientSecret
    ).toString("base64")}`,
  };

  const data = new URLSearchParams(parameter).toString();

  axios
    .post("https://accounts.spotify.com/api/token", data, {
      headers: headers,
    })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;
        const parameter = {
          access_token: access_token,
          refresh_token: refresh_token,
          expires_in: expires_in,
        };
        const queryParams = new URLSearchParams(parameter).toString();

        //redirect to react app

        res.redirect(`http://localhost:3000/?${queryParams}`);
      } else {
        //redirect to error message

        const errorMessage = new URLSearchParams({
          error: "invalid_token",
        }).toString();
        res.redirect(`/?${errorMessage}`);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
