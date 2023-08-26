import { Router } from "express";
import { sayHii, whoSaidHii } from "../controllers/testController";

const router = Router();

router.get('/who-said-hii', whoSaidHii.controller);
router.post('/say-hii', sayHii.validator, sayHii.controller);

export default router;