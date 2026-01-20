import express, { request } from "express";
import cors from "cors";

import Users from "./localDB/users.js";
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

//  We're using post because we're collecting info from the client
let user;
app.post("/login", (request, response) => {
  const { username, password } = request.body;
  console.log(request);
  console.log(request.body);

  if (!username || !password)
    return response
      .status(400)
      .send({ error: "Username or Password Fild is Empty!" });

  user = Users.find(
    (user) => user.username === username && user.password === password,
  );

  if (!user) return response.status(400).send({ error: "Invalid Credentials" });
  response.status(200).send({ message: "Authenticated" });
});

app.get("/home", (request, response) => {
  const tasks = localStorage.getItem("tasks");
  const parsedTasks = JSON.parse(tasks);
  console.log(parsedTasks);
  response.send(`Existing tasks: ${parsedTasks}`);
  response.send(parsedTasks);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/home", (request, response) => {
  response.send("welcome to the Home Page");
});
