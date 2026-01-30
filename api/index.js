import express from "express";

const app = express();
app.use(express.json());

// "Base de datos" en memoria
let users = [
  { id: 1, name: "Luis" },
  { id: 2, name: "Liseht" },
  { id: 3, name: "Luna" },
  { id: 4, name: "Lusi" }
];

// GET
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET por ID
app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: "No encontrado" });
  res.json(user);
});

// POST
app.post("/api/users", (req, res) => {
  const newUser = {
    id: Date.now(),
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT
app.put("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: "No encontrado" });
  user.name = req.body.name;
  res.json(user);
});

// DELETE
app.delete("/api/users/:id", (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ message: "Eliminado" });
});

// EXPORTAR (no listen)
export default app;