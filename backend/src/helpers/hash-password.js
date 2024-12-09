import bcryptjs from 'bcryptjs'

const saltRounds = 10

export const hashPassword = (password) => {
    const salt = bcryptjs.genSaltSync(saltRounds)
    return bcryptjs.hashSync(password, salt)
}