// @flow
import { execaSync } from 'execa'

const gitPush = async (): Promise<void> => {
    try {
        let { stdout } = execaSync('git', ['push', 'origin', retrieveCurrentBranchName()])
        console.log('\n' + stdout)
    } catch (error) {
        return Promise.reject(error.message)
    }
}

const retrieveCurrentBranchName = (): string => {
    return execaSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).stdout
}

export default gitPush
