export function decodeJwt(token: string): { id: string; email: string } {
  try {
    const payload = token.split('.')[1]

    return JSON.parse(atob(payload)) as { id: string; email: string }
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return { id: '', email: '' }
  }
}
