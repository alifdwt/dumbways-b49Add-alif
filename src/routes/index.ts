import express from "express";
import TodoControllers from "../controllers/TodoControllers";
import GeoDatumControllers from "../controllers/GeoDatumControllers";

const router = express.Router();

// Todos
router.get("/todos", TodoControllers.find);
router.get("/todo/:id", TodoControllers.findOne);
router.post("/todo", TodoControllers.create);
router.patch("/todo/:id", TodoControllers.update);
router.delete("/todo/:id", TodoControllers.delete);

// Geo Data
router.get("/geodata", GeoDatumControllers.find);
router.get("/geodata/:provinceId", GeoDatumControllers.findProvince);
router.get(
  "/geodata/:provinceId/:cityId",
  GeoDatumControllers.findCityByProvince
);
router.get(
  "/geodata/:provinceId/:cityId/:districtId",
  GeoDatumControllers.findDistrictByCity
);
router.get(
  "/geodata/:provinceId/:cityId/:districtId/:villageId",
  GeoDatumControllers.findVillageByDistrict
);
router.post("/geodata", GeoDatumControllers.create);
router.patch("/geodata/:provinceId", GeoDatumControllers.update);
router.delete("/geodata/:provinceId", GeoDatumControllers.delete);

export default router;
