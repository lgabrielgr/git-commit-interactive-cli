#! /usr/bin/env node
// @flow
import chalk from 'chalk'
import inquirer from 'inquirer'

import readCommitTypes from './utils/resolveCommitTypes.js'
import gitCommit from './commands/gitCommit.js'
import gitPush from "./commands/gitPush.js";
import gitStatus from './commands/gitStatus.js'
import { buildCommitInquireQuestions } from './utils/prompt.js'
import gitAddAll from './commands/gitAddAll.js'

gitStatus()
    .then((filesToReview) => gitAddAll(filesToReview))
    .then(() => readCommitTypes())
    .then((commits) => buildCommitInquireQuestions(commits.types))
    .then((inquireQuestions) =>
        inquirer.prompt(inquireQuestions)
            .then((answers) =>
                gitCommit(answers.commitType, answers.ticketNumber, answers.message)
                    .then(() => gitPush())))
    .catch(reason => console.error(chalk.bgRed.yellow(reason)))
