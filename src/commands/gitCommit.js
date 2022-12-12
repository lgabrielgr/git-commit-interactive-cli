// @flow
import chalk from 'chalk'
import { execaSync } from 'execa'

import type { CommitType } from '../models/commitTypes.js'

const gitCommit = async (commitType: CommitType, commitTitle: string, commitMessage: string): Promise<void> => {
    let gitCommitMessage = buildGitCommitMessage(commitType, commitTitle, commitMessage);
    try {
        let { stdout } = execaSync('git', ['commit', '-m', gitCommitMessage])
        console.log('\n'+stdout)
    } catch (error) {
        return Promise.reject(error.message)
    }
}

const buildGitCommitMessage = (commitType: CommitType, commitTitle: string, commitMessage: string): string => {
    return `${commitType.messagePrefix} ${commitType.emojiCode} ${commitTitle} - ${commitMessage}`
}

export default gitCommit
