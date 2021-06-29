import { SHA256 } from 'crypto-js'

export const cryptSha = (str: string) => SHA256(str).toString()
