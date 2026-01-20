import express, { request } from "express";
import cors from "cors";
import Users from "./localDB/users";
const app = express();
app.use(cors());
const port = 3000;

app.get("/login", (request, response) => {
  const { username, password } = request.body;
  Users.find((user) => {
    if (user.username === username && user.password === password) {
      response.send({ data: "Authenticated!" }).status(200);
    }
  });
});

app.get("/", (request, response) => {
  const tasks = localStorage.getItem("tasks");
  const parsedTasks = JSON.parse(tasks);
  console.log(parsedTasks);
  response.send(`Existing tasks ${parsedTasks}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/home", (request, response) => {
  response.send("welcome to the Home Page");
});
