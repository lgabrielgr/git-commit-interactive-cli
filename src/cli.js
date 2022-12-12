#! /usr/bin/env node
// @flow
import chalk from 'chalk'
import inquirer from 'inquirer'

import readCommitTypes from './utils/resolveCommitTypes.js'
import buildInquireQuestions from './utils/prompt.js'
import gitCommit from './commands/gitCommit.js'
import gitPush from "./commands/gitPush.js";

readCommitTypes()
    .then((commits) => buildInquireQuestions(commits.types))
    .then((inquireQuestions) =>
        inquirer.prompt(inquireQuestions)
            .then((answers) =>
               gitCommit(answers.commitType, answers.ticketNumber, answers.message)
                    .then(() => gitPush())))
    .catch(reason => console.error(chalk.bgRed.yellow(reason)))
