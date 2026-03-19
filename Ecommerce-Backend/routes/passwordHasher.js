import bcrypt from "bcrypt"

export function generateSalt() {
    return crypto.randomBytes(16).toString("hex").normalize()
}

export async function hashPassword(password) {
    return bcrypt.hash(password, 10)
}

export async function comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
}

