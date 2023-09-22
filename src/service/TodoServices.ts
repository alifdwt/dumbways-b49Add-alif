import { Request, Response } from "express";
import ITodos from "../interface/Todos";
import Todos from "../mocks/Todos";

export default new (class TodoService {
  private todos: ITodos[];

  constructor() {
    this.todos = [...Todos];
  }

  find(req: Request, res: Response): Response {
    try {
      return res.status(200).json(this.todos);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  findOne(req: Request, res: Response): Response {
    try {
      const id: number = parseInt(req.params.id);
      const data = Todos.find((datum) => datum.id === id);
      return res.status(200).json(data);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Error while running 'findOne'" });
    }
  }

  create(req: Request, res: Response): Response {
    try {
      const data: ITodos = req.body;
      Todos.push(data);
      return res.status(200).json({ data: Todos });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Error while running 'create'" });
    }
  }

  update(req: Request, res: Response): Response {
    try {
      const id: number = parseInt(req.params.id);
      const updateTodo: ITodos = req.body;
      const index: number = this.todos.findIndex((todo) => todo.id === id);
      console.log(index);

      if (index !== -1) {
        this.todos[index] = { ...this.todos[index], ...updateTodo };
        const data = this.todos[index];
        return res.status(200).json(data);
      }

      return res.status(200);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Error while running 'update'" });
    }
  }

  delete(req: Request, res: Response): Response {
    try {
      const id: number = parseInt(req.params.id);
      const data: ITodos[] = Todos.filter((todo) => todo.id === id);

      return res.status(200).json(data);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Error while running 'delete'" });
    }
  }
})();

// app.delete("/todo/:id", (req: Request, res: Response): Response => {
// const id: number = parseInt(req.params.id);
// const data: ITodos[] = Todos.filter((todo) => todo.id === id);

// return res.status(200).json(data);
// });

// app.post("/todo", (req: Request, res: Response): Response => {
// const data: ITodos = req.body;
// Todos.push(data);

//   return res.status(200).json({ data: Todos });
// });

// app.get("/todo/:id", (req: Request, res: Response): Response => {
//   const id: number = parseInt(req.params.id);
//   const data = Todos.find((datum) => datum.id === id);
//   return res.status(200).json(data);
// });
