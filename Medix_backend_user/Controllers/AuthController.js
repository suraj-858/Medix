const Costumer = require('../costumerModels/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Editor = require('../costumerModels/EditorModel')

const Login = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await Costumer.findOne({ email }).exec()
    const foundEditor = await Editor.findOne({ email }).exec();

    console.log(foundUser);
    console.log(foundEditor);

    if (!foundUser && !foundEditor) {

        return res.status(404).json({ message: 'User Unauthorized' })

    }

    if (foundUser) {

        const match = await bcrypt.compare(password, foundUser.password)
        if (!match) return res.status(401).json({ message: 'Unauthorized' })

        const roles = foundUser.roles;
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": foundUser.roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        )

        const refreshToken = jwt.sign(

            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        //Create secure cookie with refresh token

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const userId = foundUser?._id;

        res.json({ accessToken, refreshToken, roles, userId })

    }

    if (foundEditor) {

        const match = await bcrypt.compare(password, foundEditor.password)
        if (!match) return res.status(401).json({ message: 'Unauthorized' })

        const roles = foundEditor.roles;
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundEditor.email,
                    "roles": foundEditor.roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        )

        const refreshToken = jwt.sign(

            { "email": foundEditor.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        //Create secure cookie with refresh token

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const userId = foundEditor?._id;

        res.json({ accessToken, refreshToken, roles, userId })

    }

})

const refresh = (req, res) => {

    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ err, message: 'Forbidden' })

            const foundUser = await Costumer.findOne({ username: decoded.username }).exec();
            const foundEditor = await Editor.findOne({ email: decoded.email }).exec();


            if (!foundUser && !foundEditor) return res.status(401).json({ message: 'Unauthorized vayo' })

            if (foundUser) {
                const accessToken = jwt.sign({
                    "username": foundUser.username,
                    "roles": foundUser.roles
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })

                res.json({ accessToken })
            }
            if (foundEditor) {

                const accessToken = jwt.sign({
                    "username": foundEditor.email,
                    "roles": foundEditor.roles
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })

                res.json({ accessToken })
            }

        }))
}


const Logout = (req, res) => {
    const cookies = req.cookies

    console.log(cookies);
    if (!cookies?.jwt) {

        return res.sendStatus(204)
    }
    // no content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    Login, refresh, Logout
}