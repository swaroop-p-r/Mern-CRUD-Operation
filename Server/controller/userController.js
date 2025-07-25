const User = require('../model/User');

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
        console.error('Registartion Error:',error)
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
            return res.status(200).json({ msg: 'Login Successfull' })
        } else {
            return res.status(401).json({ msg: 'Invalid Password' })
        }
    } catch (error) {
        console.error('Login Server Failed:',error)
        return res.status(500).json({ msg: 'Login Server Failed' })
    }
}

module.exports = { registerUser,loginUser };