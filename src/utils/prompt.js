// @flow
import inquirer from 'inquirer'
import inquirerAutocompletePrompt from 'inquirer-autocomplete-prompt'

import readCommitTypes from './resolveCommitTypes.js'

inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt)

const buildCommitInquireQuestions = (): Array<Object> => {
    return [
        {
            type: 'autocomplete',
            name: 'commitType',
            message: 'Choose the purpose of your changes:',
            source: (answersSoFar, input) => Promise.resolve(
                readCommitTypes().types.map((commitType) => ({
                    name: `${commitType.emoji} - ${commitType.description}`,
                    value: commitType
                }))
            )
        },
        {
            name: 'ticketNumber',
            message: "Enter ticket # for reference, or commit title:"
        },
        {
            name: 'message',
            message: "Enter commit message:"
        },
        {
            name: 'pushToOrigin',
            type: 'confirm',
            default: false,
            message: 'Push to origin?:'
        }
    ];
}

const buildAddFilesInquireQuestions = (): Array<Object> => {
    return [
        {
            name: 'addFiles',
            type: 'confirm',
            default: false,
            message: 'Include file(s) listed above in what will be committed?:'
        }
    ]
}

export { buildCommitInquireQuestions, buildAddFilesInquireQuestions }
