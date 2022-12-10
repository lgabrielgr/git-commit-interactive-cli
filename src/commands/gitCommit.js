// @flow
import chalk from 'chalk'
import { execaSync } from 'execa'

import type { CommitType } from '../models/commitTypes.js'

const gitCommit = (commitType: CommitType, commitTitle: string, commitMessage: string): void => {
    let gitCommitMessage = buildGitCommitMessage(commitType, commitTitle, commitMessage);
    try {
        let { stdout } = execaSync('git', ['commit', '-m', gitCommitMessage])
        console.log(stdout)
    } catch (error) {
        console.error(chalk.bgRed.yellow(error))
    }
}

const buildGitCommitMessage = (commitType: CommitType, commitTitle: string, commitMessage: string): any => {
    return `${commitType.messagePrefix} ${commitType.emojiCode} ${commitTitle} - ${commitMessage}`
}

export default gitCommit
