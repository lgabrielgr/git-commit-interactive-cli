// @flow
import { execaSync } from 'execa'

import type { CommitType } from '../models/commitTypes.js'
import { buildCommitInquireQuestions } from '../utils/prompt.js'
import inquirer from 'inquirer'
import gitPush from './gitPush.js'

const gitCommit = async (): Promise<void> => {
    try {
        promptUserWithCommitOptions()
            .then(answers => {
                let gitCommitMessage =
                    buildGitCommitMessage(answers.commitType, answers.ticketNumber, answers.message)

                let { stdout } = execaSync('git', ['commit', '-m', gitCommitMessage])
                console.log('\n' + stdout)

                if (answers.pushToOrigin)
                {
                    gitPush()
                }
            })
    } catch (error) {
        return Promise.reject(error.message)
    }
}

const buildGitCommitMessage = (commitType: CommitType, commitTitle: string, commitMessage: string): string => {
    return `${commitType.messagePrefix} ${commitType.emojiCode} ${commitTitle} - ${commitMessage}`
}

const promptUserWithCommitOptions = (): Object => {
    return inquirer.prompt(buildCommitInquireQuestions())
}

export default gitCommit
