import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";


const yourBearerToken = "c5ab67dd-1256-4132-ab08-c9e2a826106f";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => { // notice how we using .post this is because we are passing in data in order for us to get information back, when using express
  const searchId = req.body.id;
  try {
    const response = await axios.get(API_URL + "/secrets/" + searchId, config); // response would be a JS object
    // await is our promise API which handles asynchronous operations
    // axios.get here because we are retrieving data back
    res.render("index.ejs", { content: JSON.stringify(response.data) }); // .stringify because we this is the data we want to show online in a string format
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  try {
  const response = await axios.post(API_URL + "/secrets", { // we can simply just pass ing req.body into our "body" parameter
    // req.body only works if our form have the same "name" as the API instruction format
    "secret": req.body.secret,
    "score": req.body.score,
    
  }, config);
  res.render("index.ejs", { content: JSON.stringify(response.data) });
} catch (error) {
  res.render("index.ejs", { content: JSON.stringify(error.response.data)});
}
});


app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  try {
    const response = await axios.put(API_URL + "/secrets/" + searchId,
      {
        "secret": req.body.secret,
        "score": req.body.score,
      }, config);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  try {
    const response = await axios.patch(API_URL + "/secrets/" + searchId, {
      "secret": req.body.secret,
      "score": req.body.score
    }, config);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data)});
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  try {
    const response = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) }); // the API provides the error message
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
