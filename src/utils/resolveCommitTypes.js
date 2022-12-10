// @flow
import { readFileSync } from 'fs'

import type { Commits } from '../models/commitTypes.js'

const readCommitTypes = async (): Promise<Commits> => {
    try {
        let jsonFileContent = readFileSync('./resources/commit_types.json', {}).toString()
        return JSON.parse(jsonFileContent)
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export default readCommitTypes
