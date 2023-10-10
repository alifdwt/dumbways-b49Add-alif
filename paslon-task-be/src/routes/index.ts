import * as express from "express";
import PaslonControllers from "../controllers/PaslonControllers";
import PartyControllers from "../controllers/PartyControllers";
import AuthControllers from "../controllers/AuthControllers";
import { authenticate } from "../middlewares/checkJwt";
import VoteControllers from "../controllers/VoteControllers";

const upload = require("../middlewares/uploadFiles");

const router = express.Router();

// PASLON
router.get("/paslons", authenticate, PaslonControllers.findPaslons);
router.get("/paslon/:paslonId", authenticate, PaslonControllers.getPaslon);
router.post(
  "/paslon",
  upload.single("image"),
  authenticate,
  PaslonControllers.createPaslon
);
router.patch(
  "/paslon/:paslonId",
  upload.single("image"),
  PaslonControllers.updatePaslon
);
router.delete(
  "/paslon/:paslonId",
  authenticate,
  PaslonControllers.deletePaslon
);

// Parties
router.get("/parties", authenticate, PartyControllers.findParties);
router.get("/party/:partyId", authenticate, PartyControllers.getParty);
router.post("/party", authenticate, PartyControllers.createParty);
router.patch("/party/:partyId", authenticate, PartyControllers.updateParty);
router.delete("/party/:partyId", authenticate, PartyControllers.DeleteParty);

// Auth
router.post("/auth/register", AuthControllers.registerUser);
router.post("/auth/login", AuthControllers.loginUser);
router.get("/auth/check", authenticate, AuthControllers.checkSession);

// Votes
router.get("/votes", authenticate, VoteControllers.findVotes);
router.get("/vote/:voteId", authenticate, VoteControllers.getVote);
router.post("/vote", authenticate, VoteControllers.createVote);
router.delete("/vote/:voteId", authenticate, VoteControllers.DeleteVote);

export default router;
