const User = require('../model/User');
const Task = require('../model/Task');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: 'Email already rergistered' })
        }
        const newUser = new User({
            username,
            email,
            password,
        })
        await newUser.save()
        res.status(201).json({ msg: 'User Registered successfully' });
    } catch (error) {
        console.error('Registartion Error:', error)
        res.status(500).json({ msg: 'Server Registartion Error' })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(401).json({ msg: 'Invalid Credentials' })
        }
        if (password === userExist.password) {
            return res.status(200).json({ msg: 'Login Successfull', userid: userExist._id })
        } else {
            return res.status(401).json({ msg: 'Invalid Password' })
        }
    } catch (error) {
        console.error('Login Server Failed:', error)
        return res.status(500).json({ msg: 'Login Server Failed' })
    }
}

const addTask = async (req, res) => {
    const { title, description, status } = req.body;
    const userid = req.headers.userid;
    try {
        const task = new Task({
            user: userid,
            title,
            description,
            status,
        })
        await task.save();
        return res.status(200).json({ msg: 'Task Added Successfully' })
    } catch (error) {
        console.error('Task Add Server Error:', error);
        return res.status(500).json({ msg: 'Task Add Server Error' })
    }
}

const viewTask = async (req, res) => {
    const userid = req.headers.userid;
    try {
        if (!userid) {
            return res.status(400).json({ msg: 'User id not found!' });
        }
        const task = await Task.find({ user: userid })
            .sort({ createdAt: -1 });
        res.status(200).json(task);
    } catch (error) {
        console.error('View Task Server Error:', error)
        return res.status(500).json({ msg: 'View Task Server Error' })
    }

}

const statusTask = async (req, res) => {
    const taskid = req.params.id;
    try {
        if (!taskid) {
            return res.status(400).json({ msg: 'Task id not found!' });
        }
        const task = await Task.findById(taskid);
        task.status = !task.status;
        await task.save();
        res.status(200).json({ msg: 'Task Status Updated' });
    } catch (error) {
        console.error('Status Task Error:', error);
        return res.status(500).json({ msg: 'Status Task Error' });
    }
}

const deleteTask = async (req, res) => {
    const taskid = req.params.id;
    try {
        if (!taskid) {
            return res.status(400).json({ msg: 'Task id not found!' });
        }
        const task = await Task.findByIdAndDelete(taskid);
        if (!task) {
            return res.status(400).json({ msg: 'Task not Deleted!' });
        }
        res.status(200).json({ msg: 'Task Deleted Successfully' });
    } catch (error) {
        console.error('Task Deletion Error', error);
        return res.status(500).json({ msg: 'Task Deletion Error' });
    }
}

const getTaskById = async (req, res) => {
    const taskid = req.params.id;
    try {
        if (!taskid) {
            return res.status(400).json({ msg: 'Task id not found!' });
        }
        const task = await Task.findById(taskid);
        if (!task) {
            return res.status(400).json({ msg: 'Task not found!' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('Task Server Error', error);
        return res.status(500).json({ msg: 'Task Server Error' });
    }
}

const editTask = async (req, res) => {
    const taskid = req.params.id;
    const { title, description } = req.body;
    try {
        if (!taskid) {
            return res.status(400).json({ msg: 'Task id not found!' });
        }
        const task = await Task.findByIdAndUpdate(taskid,
            {
                title,
                description,
            }
        )
        res.status(200).json({ msg: 'Task Updated Successfully ' })
    } catch (error) {
        console.error('Task Updation Error', error);
        return res.status(500).json({ msg: 'Task Updation Error' });
    }
}

module.exports = {editTask, getTaskById, deleteTask, statusTask, viewTask, registerUser, loginUser, addTask };