import * as express from "express";
import PaslonControllers from "../controllers/PaslonControllers";
import PartyControllers from "../controllers/PartyControllers";

const upload = require("../middlewares/uploadFiles");

const router = express.Router();

// PASLON
router.get("/paslons", PaslonControllers.findPaslons);
router.get("/paslon/:paslonId", PaslonControllers.getPaslon);
router.post("/paslon", upload.single("image"), PaslonControllers.createPaslon);
router.patch(
  "/paslon/:paslonId",
  upload.single("image"),
  PaslonControllers.updatePaslon
);
router.delete("/paslon/:paslonId", PaslonControllers.deletePaslon);

// Parties
router.get("/parties", PartyControllers.findParties);
router.get("/party/:partyId", PartyControllers.getParty);
router.post("/party", PartyControllers.createParty);
router.patch("/party/:partyId", PartyControllers.updateParty);
router.delete("/party/:partyId", PartyControllers.DeleteParty);

export default router;
