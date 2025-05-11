import fs from 'node:fs'
import path from 'node:path'
import { swaggerSpec } from './index'

const SWAGGER_OUTPUT_PATH = './src/routes/dto/swagger.json'
const JSON_INDENT_SPACES = 2
const absoluteOutputPath = path.resolve(SWAGGER_OUTPUT_PATH)
const directory = path.dirname(absoluteOutputPath)

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true })
}

try {
  fs.writeFileSync(
    absoluteOutputPath,
    JSON.stringify(swaggerSpec, null, JSON_INDENT_SPACES)
  )
  console.info(`😎 Swagger spec written to ${absoluteOutputPath}\n`)
} catch (error) {
  console.error('Error writing swagger spec:', error)
}
