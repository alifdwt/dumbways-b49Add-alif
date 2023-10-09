import * as express from "express";
import router from "./routes";
import { AppDataSource } from "./data-source";
import * as cors from "cors";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    app.use(express.json());
    app.use(cors());
    app.use("/api/v1", router);
    app.listen(port, () => console.log(`Express running on port ${port}`));
  })
  .catch((error) => console.log(error));
