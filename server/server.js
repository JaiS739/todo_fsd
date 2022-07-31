const fs = require("fs");
const express = require("express");
const cors = require("cors");
const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const prev_data = fs.readFileSync("./db.json", "utf-8");
  const parsed_prev_data = JSON.parse(prev_data);
  const result = parsed_prev_data.todos;
  res.send(result);
});

app.post("/", (req, res) => {
  const inputData = req.body;

  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      return err;
    }

    const parsed_data = JSON.parse(data);
    const new_data = parsed_data.todos;

    new_data.push(inputData);

    fs.writeFileSync("./db.json", JSON.stringify(parsed_data), "utf-8");

    console.log(new_data);
    res.send("added");
  });
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const body_data = req.body;

  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      return err;
    }

    const parsed_data = JSON.parse(data);
    const new_todos = parsed_data.todos.map((ele) => {
      if (ele.id == id) {
        return {
          ...ele,
          todo: body_data.todo,
        };
      }
      return ele;
    });

    parsed_data.todos = new_todos;

    fs.writeFileSync("./db.json", JSON.stringify(parsed_data), "utf-8");

    console.log(parsed_data);
  });

  //   console.log(id);
  console.log(body_data);
  res.send("updated");
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile("./db.json", (err, data) => {
    if (err) {
      return err;
    }

    const parsed_data = JSON.parse(data);
    const new_todos = parsed_data.todos.filter((ele) => ele.id !== id);
    parsed_data.todos = new_todos;

    const updatedTodosValues = fs.writeFileSync(
      "./db.json",
      JSON.stringify(parsed_data),
      "utf-8"
    );

    console.log(parsed_data);
    res.send(updatedTodosValues);
  });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
