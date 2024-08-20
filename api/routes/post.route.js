import express from 'express';
import {verifyToken} from "../utils/verifyUser.js";
import {create, getposts} from "../controllers/post.controller.js";
const router = express.Router();


router.post('/create', verifyToken, create)
router.get('/getPosts', getposts)

export default router;