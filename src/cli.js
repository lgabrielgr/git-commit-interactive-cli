#! /usr/bin/env node
// @flow
import chalk from 'chalk'

import gitCommit from './commands/gitCommit.js'
import gitStatus from './commands/gitStatus.js'
import gitAddAll from './commands/gitAddAll.js'

gitStatus()
    .then(gitAddAll)
    .then(gitCommit)
    .catch(reason => console.error(chalk.bgRed.yellow(reason)))
