import * as crypto from 'crypto'

type PasswordFunction = {
  hashedPassword: string
  salt: string
}

export function hashPassword(password: string): PasswordFunction {
  const salt = crypto.randomBytes(16).toString('hex')
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha-512')
    .toString('hex')

  return {
    salt,
    hashedPassword,
  }
}

export function validPassword(
  password: string,
  salt: string | undefined,
  hashedPassword: string | undefined,
): boolean {
  if (!salt || !hashedPassword) {
    return false
  }
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha-512')
    .toString('hex')

  return hash === hashedPassword
}
