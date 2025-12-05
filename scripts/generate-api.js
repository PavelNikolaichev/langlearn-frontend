import { execSync } from 'node:child_process'
import dotenv from 'dotenv'

// Load .env (Vite uses VITE_* variables)
dotenv.config()

// The base URL must start with "VITE_" for Vite to expose it
const baseUrl = process.env.VITE_API_BASE_URL
if (!baseUrl) {
  console.error('Missing VITE_API_BASE_URL in .env')
  process.exit(1)
}

// Construct the swagger endpoint
const specUrl = `${baseUrl.replace(/\/$/, '')}/swagger/v1/swagger.json`

console.log(`Generating API from: ${specUrl}\n`)

execSync(
  `npx @openapitools/openapi-generator-cli generate \
  -i "${specUrl}" \
  -g typescript-axios \
  -o src/api \
  --additional-properties=useSingleRequestParameter=true`,
  { stdio: 'inherit' },
)
