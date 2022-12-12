// @flow
import inquirer from 'inquirer'
import inquirerAutocompletePrompt from 'inquirer-autocomplete-prompt'
import type {CommitType} from "../models/commitTypes.js";

inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt)

const buildInquireQuestions = (commitTypes: Array<CommitType>): Array<Object> => {
    return [
        {
            type: 'autocomplete',
            name: 'commitType',
            message: 'Choose the purpose of your changes:',
            source: (answersSoFar, input) => Promise.resolve(
                commitTypes.map((commitType) => ({
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

export default buildInquireQuestions
