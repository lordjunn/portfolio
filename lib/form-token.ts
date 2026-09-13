import crypto from "crypto"

// Use environment secrets or fallback key to sign tokens
const TOKEN_SECRET =
  process.env.EMAIL_PASS ||
  process.env.EMAIL_USER ||
  process.env.NEXTAUTH_SECRET ||
  "portfolio-form-token-secret-2026"

const MIN_SUBMISSION_TIME_MS = 3000 // 3 seconds: humans take > 10s, bots take < 50ms
const MAX_TOKEN_AGE_MS = 60 * 60 * 1000 // 1 hour expiration

/**
 * Generates an HMAC-SHA256 signed token containing timestamp and nonce
 */
export function generateFormToken(): string {
  const timestamp = Date.now()
  const nonce = crypto.randomBytes(8).toString("hex")
  const data = `${timestamp}:${nonce}`
  const signature = crypto.createHmac("sha256", TOKEN_SECRET).update(data).digest("hex")
  return `${data}:${signature}`
}

/**
 * Validates the cryptographic token signature and checks that submission was not too fast
 */
export function verifyFormToken(token?: unknown): { valid: boolean; error?: string } {
  if (!token || typeof token !== "string") {
    return {
      valid: false,
      error: "Missing security token. Automated script submissions are blocked.",
    }
  }

  const parts = token.split(":")
  if (parts.length !== 3) {
    return { valid: false, error: "Invalid security token format." }
  }

  const [timestampStr, nonce, signature] = parts
  const timestamp = Number(timestampStr)

  if (isNaN(timestamp)) {
    return { valid: false, error: "Malformed security token timestamp." }
  }

  // Cryptographic signature check: prevents client-side forging of timestamps
  const data = `${timestampStr}:${nonce}`
  const expectedSignature = crypto.createHmac("sha256", TOKEN_SECRET).update(data).digest("hex")

  try {
    const signatureBuffer = Buffer.from(signature, "hex")
    const expectedBuffer = Buffer.from(expectedSignature, "hex")

    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return { valid: false, error: "Security token verification failed." }
    }
  } catch {
    return { valid: false, error: "Security token verification error." }
  }

  const now = Date.now()
  const elapsed = now - timestamp

  // Anti-speedrun: must take at least 3 seconds from page load to submit
  if (elapsed < MIN_SUBMISSION_TIME_MS) {
    return {
      valid: false,
      error: "Submission was too fast. Please take a moment before submitting.",
    }
  }

  // Expiry check: token expires after 1 hour
  if (elapsed > MAX_TOKEN_AGE_MS) {
    return {
      valid: false,
      error: "Form session expired. Please refresh the page.",
    }
  }

  return { valid: true }
}
