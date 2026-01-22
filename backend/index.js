import express, { request, response } from "express";
import cors from "cors";
import Tasks from "./localDB/tasks.js";
import Users from "./localDB/users.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

//  We're using post because we're collecting info from the client
app.post("/login/submit", (request, response) => {
  const { username, password } = request.body;

  if (!username || !password)
    return response
      .status(400)
      .send({ error: "Username or Password Fild is Empty!" });

  const user = Users.find(
    (user) => user.username === username && user.password === password,
  );

  if (!user) return response.status(400).send({ error: "Invalid Credentials" });
  response.status(200).send({ message: "Authenticated" });
});

app.get("/home", (request, response) => {
  response.send(Tasks);
});

app.post("/addTask", (request, response) => {
  const { id, name, status } = request.body;
  const duplicateCheck = Tasks.some((task) => task.name === name);
  const sameID = Tasks.some((task) => task.id === id);
  if (duplicateCheck)
    return response.send({ message: "Duplicate" }).status(400);
  if (sameID) return response.send({ message: "sameID" }).status(400);

  const newTask = {
    id,
    name,
    status,
  };

  Tasks.push(newTask);
  response.send(Tasks).status(200);
});

app.delete("/deleteTask", (request, response) => {
  const item = request.body;
  // or we can deconstruct the id using const {id} = request.body

  const updatedTasks = Tasks.filter((task) => task.id !== item.id);
  console.log(updatedTasks);

  const index = Tasks.findIndex((task) => task.id === item.id);

  console.log(index);
  if (index !== -1) {
    Tasks.splice(index, 1); // Remove the item from the real array
    return response.status(200).send(Tasks);
  }

  // response.send(updatedTasks).status(200);
});

app.patch("/editTask/:id", (request, response) => {
  const { name } = request.body;
  const id = Number(request.params.id);

  console.log(id);
  const updatedTasks = Tasks.map((task) =>
    task.id === id ? { ...task, name: name } : task,
  );

  console.log(updatedTasks);
  response.send(updatedTasks).status(200);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/home", (request, response) => {
  response.send("welcome to the Home Page");
});
