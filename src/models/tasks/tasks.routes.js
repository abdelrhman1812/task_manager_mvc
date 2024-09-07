import { Router } from "express";
import auth from "../../middleware/authentication.js";
import catchError from "../../middleware/catchError.js";
import validate from "../../middleware/validation.js";
import taskDisplay, { addTask, handleAddTask, handleDelete, handleUpdate, toggleTaskStatus, updateTask } from "./tasks.controller.js";
import addTaskValidation from "./tasks.validation.js";

const tasksRouter = Router();


/* Render Tasks Page */
tasksRouter.get('/', auth, catchError(taskDisplay))

/* Render Add Task Page */
tasksRouter.get('/addTask', auth, catchError(addTask));

/* Render Update Task Page */
tasksRouter.get('/updateTask/:id', auth, catchError(updateTask));

/* Delete Task */
tasksRouter.get('/handleDelete/:id', catchError(handleDelete));

/*  Add Task  */
tasksRouter.post('/handleAddTask', validate(addTaskValidation, '/tasks/addTask'), catchError(handleAddTask));

/*  Update Task  */
tasksRouter.post('/handleUpdateTask/:id', catchError(handleUpdate));


// toggle-task-status

tasksRouter.post('/toggle-task-status', catchError(toggleTaskStatus));

export default tasksRouter;