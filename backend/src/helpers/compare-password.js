import bcryptjs from 'bcryptjs'

export const comparePasswords = (plain, hashed) => {
    return bcryptjs.compareSync(plain, hashed)
}

// const isMatch = comparePasswords("123o4", "$2a$10$ATfnGW9jBx8z7momaIcT/eGg7Q0QnGFs9rAH7udgKFk62WJQUydSa")
// console.log(isMatch)