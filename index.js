const express = require("express");
const axios = require("axios");
const app = express();
const private = require("./private");

const secrets = private.secrets;

const port = 3000;

axios.interceptors.request.use(request => {
  console.log("Starting Request", request);
  return request;
});
const baseSlackUrl = "https://hooks.slack.com/services";
const webHook = secrets.webHookUrl;

app.get("/slack", (req, res) => {
  console.log("get slack");
  let message = {
    type: "Grocries",
    action: "Buy",
    item: "Milk"
  };
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  axios
    .post(baseSlackUrl + webHook, JSON.stringify(message), config)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send("error! \n " + error);
    });
});

app.listen(port, () => {
  console.log("server running on port " + port);
});
