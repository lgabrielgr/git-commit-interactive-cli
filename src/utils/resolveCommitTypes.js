// @flow
import { readFileSync } from 'fs'

import type { Commits } from '../models/commitTypes.js'
import chalk from "chalk";

const readCommitTypes = (): Commits => {
    const COMMIT_TYPES_JSON_FILE = './resources/commit_types.json';
    try {
        let jsonFileContent = readFileSync(COMMIT_TYPES_JSON_FILE, {}).toString()
        return JSON.parse(jsonFileContent)
    } catch (error) {
        console.error(chalk.bgRed.yellow(`An error occurred while reading file '${COMMIT_TYPES_JSON_FILE}', please verify the file.`))
        throw error
    }
}

export default readCommitTypes
