const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("listening at port 3000");
});

app.use(express.static("public")); //Indicate root folder
app.use(express.json({ limit: "1mb" })); //Allow read data posted to this server

//Indicate a route, check routing express docs
const records = [];

app.post("/api", (request, response) => {
  let data = request.body;
  records.push(data);

  response.json({
    status: "success",
    latitude: data.lat,
    longitude: data.lon,
  });

  console.log(records);
});
