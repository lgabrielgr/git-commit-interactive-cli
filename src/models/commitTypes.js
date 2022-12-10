// @flow
export type Commits = {
    types: CommitType[]
}

export type CommitType = {
    emoji: string,
    emojiCode: string,
    description: string,
    messagePrefix: string
}
