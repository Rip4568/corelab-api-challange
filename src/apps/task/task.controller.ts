import { Router } from "express";
import { createTaskService, deleteTaskService, getAllTaskService, getOneTaskService, updateTaskService } from "./task.service";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated.middleware";
import { isOwnerTaskMiddleware } from "../../middlewares/isOwnerTask.middleware";

const taskController = Router()

//taskController.use([isAuthenticatedMiddleware],)
taskController.get('/tasks', [isAuthenticatedMiddleware], getAllTaskService)
taskController.get('/tasks/:id',[isAuthenticatedMiddleware], getOneTaskService)
taskController.post('/tasks', [isAuthenticatedMiddleware], createTaskService)
taskController.put('/tasks/:id', [isAuthenticatedMiddleware], updateTaskService)
taskController.delete('/tasks/:id', [isAuthenticatedMiddleware], deleteTaskService)

export { taskController }