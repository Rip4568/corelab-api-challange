import { Router } from "express";
import { createUserService, deleteUserService, getAllUserService, getOneUserService, updateUserService } from "./user.service";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated.middleware";

const userController = Router()

userController.post('/users', createUserService)
userController.get('/users/:id', getOneUserService)
userController.get('/users', getAllUserService)
userController.put('/users/:id', [isAuthenticatedMiddleware], updateUserService)
userController.delete('/users/:id', [isAuthenticatedMiddleware], deleteUserService)

export default userController