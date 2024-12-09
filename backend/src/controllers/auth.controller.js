import { comparePasswords } from "../helpers/compare-password.js"
import { hashPassword } from "../helpers/hash-password.js"
import { User } from "../models/User.model.js"
import { generateToken } from "../utils/generate-jwt-token.js"

export const register = async (req, res) => {
    try {

        const {fullName, username, gender, password, confirmPassword} = req.body

        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            })
        }

        const findUser = await User.findOne({username})

        if(findUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        // profiles pics

    
        const newUser = new User({
            fullName,
            username,
            gender,
            password: hashPassword(password)
        })

        if(newUser) {
            generateToken(newUser._id, res)
            await newUser.save()

            return res.status(201).json({
                success: true,
                user: {
                    fullName: newUser.fullName,
                    username: newUser.username,
                    gender: newUser.gender,
                    profilePic: newUser.profilePic
                }
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "invalid user data"
            })
        }

       
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const login = async (req, res) => {
    try {

        const {username, password} = req.body

        const findUser = await User.findOne({username})

        if(!findUser || !comparePasswords(password, findUser.password)) {
            return res.status(400).json({
                success: false,
                message: "Bad crediantails"
            })
        }

        generateToken(findUser._id, res)

        return res.status(200).json({
            success: true,
            findUser
        })
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}