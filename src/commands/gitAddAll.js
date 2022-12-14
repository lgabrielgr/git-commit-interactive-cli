// @flow
import chalk from 'chalk'
import inquirer from 'inquirer'
import emoji from 'node-emoji'
import { execaSync } from 'execa'

import { buildAddFilesInquireQuestions } from '../utils/prompt.js'

const gitAddAll = async (filesToReview: boolean): Promise<void> => {
    try {
        if (filesToReview) {
            console.log('\n')
            await inquirer.prompt(buildAddFilesInquireQuestions())
                .then(answer => {
                    if (answer.addFiles) {
                        execaSync('git', ['add', '.'])
                        console.log(chalk.green.bold(emoji.get(':beer:') + ' File(s) added!'))
                    } else {
                        console.log(emoji.get(':thumbsup:') + ' File(s) ' + chalk.bold('not') + ' added.')
                    }
                })
        }
    } catch(error) {
        return Promise.reject(error.message)
    }
}

export default gitAddAll
