import express from 'express'
import { login, register, logout, getUser, updateUser } from '../controllers/userController.js'
import {verifyToken} from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/logout', logout)

router.get('/:id', verifyToken, getUser)
router.put('/:id', verifyToken, updateUser)


export default router