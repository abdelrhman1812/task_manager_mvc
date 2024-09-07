import TaskModel from "../../../database/models/task.model.js";
import getFlashMessages from "../../utils/getFlashMessages.js";

/* ========== Render Tasks Page ========== */
const taskDisplay = async (req, res) => {
    const userId = req.session?.user?.id;
    if (!userId) {
        req.flash('error', "User is not found");
        return res.redirect('/auth/login');
    }

    const tasks = await TaskModel.find({ createdBy: userId });
    return res.render("index", {
        tasks,
        user: req.session?.user
    });
}

/* ========== Render Add Task Page ========== */
const addTask = async (req, res) => {
    const { error, data, validationError } = getFlashMessages(req);
    res.render('addTask', {
        error,
        validationError,
        data,
    });
}

/* ========== Render Update Task Page ========== */
const updateTask = async (req, res) => {
    const taskId = req.params.id;
    let { error, validationError } = getFlashMessages(req);

    const task = await TaskModel.findById(taskId);
    if (!task) {
        req.flash("error", "Task Not Found");
        return res.redirect('back');
    }

    req.flash("data", { title: task.title, description: task.description });

    res.render('update', {
        task,
        error,
        data: req.flash("data")[0] || { title: '', description: '' },
        validationError
    });
}

/* ========== Add Task ========== */
const handleAddTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.session?.user?.id;
    if (!userId) {
        req.flash('error', "User is not logged in");
        return res.redirect('/auth/login');
    }

    req.body.createdBy = userId;
    await TaskModel.create(req.body);
    res.redirect('/tasks');
};

/* ========== Handle Delete ========== */
const handleDelete = async (req, res) => {
    const taskId = req.params.id;
    const task = await TaskModel.findById(taskId);
    if (!task) {
        req.flash("error", "Task Not Found");
        return res.redirect('back');
    }

    await TaskModel.findByIdAndDelete(taskId);
    res.redirect('/tasks');
}

/* ========== Update Task ========== */
const handleUpdate = async (req, res) => {
    const taskId = req.params.id;
    const { title, description } = req.body;

    if (!title || !description || title.length < 3 || description.length < 3) {
        req.flash("error", "Title and description must be more than 4 characters and not empty.");
        return res.redirect('back');
    }

    const task = await TaskModel.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!task) {
        req.flash("error", "Task Not Found");
        return res.redirect('back');
    }

    res.redirect('/tasks');
}



const toggleTaskStatus = async (req, res) => {
    const { taskId, completed } = req.body;
    const isCompleted = completed === 'on';
    await TaskModel.findByIdAndUpdate(taskId, { completed: isCompleted });

    res.redirect('/tasks');
}

export { addTask, handleAddTask, handleDelete, handleUpdate, toggleTaskStatus, updateTask };

export default taskDisplay;