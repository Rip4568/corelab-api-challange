import { Router } from "express";
import { taskController } from "./apps/task/task.controller";
import userController from "./apps/user/user.controller";
import { authRouter } from "./auth/auth-user";

const routes = Router()

routes.use(taskController)
routes.use(userController)
routes.use(authRouter)

export default routes