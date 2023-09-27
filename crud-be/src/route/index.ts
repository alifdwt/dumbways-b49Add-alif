import * as express from "express";
import TodoController from "../controllers/TodoController";
import PemiluController from "../controllers/PemiluController";

const router = express.Router();
router.post("/todos", TodoController.create);

router.get("/paslons", PemiluController.find);
router.get("/paslon/:paslonId", PemiluController.findPaslon);
router.post("/paslon", PemiluController.create);

export default router;
