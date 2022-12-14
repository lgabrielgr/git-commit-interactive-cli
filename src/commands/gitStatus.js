// @flow
import { execaSync } from 'execa'
import gitAddAll from "./gitAddAll.js";
import chalk from "chalk";

const gitStatus = async (): Promise<boolean> => {
    try {
        let filesToReview = false

        let filesNotStaged = execaSync('git', ['ls-files', '-m']).stdout
        if (filesNotStaged) {
            console.log(chalk.bold('\nChange(s) not staged for commit:'))
            console.log(chalk.red(`${filesNotStaged}`))
            filesToReview = true
        }

        let untrackedFiles = execaSync('git', ['ls-files', '--others', '--exclude-standard']).stdout
        if (untrackedFiles) {
            console.log(chalk.bold('\nUntracked file(s):'))
            console.log(chalk.red(`${untrackedFiles}`))
            filesToReview = true
        }

        return filesToReview
    } catch(error) {
        return Promise.reject(error.message)
    }
}

export default gitStatus
