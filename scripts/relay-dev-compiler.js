import { execSync } from 'child_process'
import './update-schema'

execSync('relay-compiler --src ./src/client --schema ./schema.graphql --watch', { stdio: [0, 1, 2] })
