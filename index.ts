import express from "express";
import router from "./src/routes";
import dotenv from "dotenv";

// app.get("/", (req: Request, res: Response): Response => {
//   return res.status(200).json({ message: "Success" });
// });

// app.get("/todos", (req: Request, res: Response): Response => {
//   return res.status(200).json({ data: Todos });
// });

// app.get("/todo/:id", (req: Request, res: Response): Response => {
//   const id: number = parseInt(req.params.id);
//   const data = Todos.find((datum) => datum.id === id);
//   return res.status(200).json(data);
// });

// app.post("/todo", (req: Request, res: Response): Response => {
//   const data: ITodos = req.body;
//   Todos.push(data);

//   return res.status(200).json({ data: Todos });
// });

// app.delete("/todo/:id", (req: Request, res: Response): Response => {
//   const id: number = parseInt(req.params.id);
//   const data: ITodos[] = Todos.filter((todo) => todo.id === id);

//   return res.status(200).json(data);
// });

async function start(): Promise<void> {
  try {
    dotenv.config();
    const app = express();
    const PORT = process.env.APP_PORT;

    app.use(express.json());

    app.use("/api/v1/", router);
    app.listen(PORT, () => console.log(`Express server running at ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

void start();
