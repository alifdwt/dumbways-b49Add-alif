import * as express from "express";
const path = require("path");
const upload = require("../middlewares/uploadFiles");
import TodoController from "../controllers/TodoController";
import PemiluController from "../controllers/PemiluController";

const router = express.Router();
router.post("/todos", TodoController.create);

router.get("/paslons", PemiluController.find);
router.get("/paslon/:paslonId", PemiluController.findPaslon);
router.post("/paslon", upload.single("image"), PemiluController.create);
router.patch("/paslon/:paslonId", PemiluController.update);
router.delete("/paslon/:paslonId", PemiluController.delete);

export default router;
