export type JwtPayload = {
  sub: string
  email: string
  exp: number
  [key: string]: unknown
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const payload = token.split('.')[1]

    // Add padding if needed for base64 decoding
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')

    return JSON.parse(atob(padded)) as JwtPayload
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return null
  }
}

// TODO: add expiration from the backend
export function isJwtExpired(token: string): boolean {
  try {
    const payload = decodeJwt(token)
    if (!payload || !payload.exp) return true
    const currentTime = Math.floor(Date.now() / 1000)
    return currentTime >= payload.exp
  } catch (error) {
    console.error('Failed to check JWT expiration:', error)
    return true
  }
}
