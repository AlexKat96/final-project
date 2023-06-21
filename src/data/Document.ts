interface Attributes {
    isTechNews?: boolean,
    isAnnouncement?: boolean,
    isDigest?: boolean,
    wordCount?: number,
    excludeTechNews?: boolean,
    excludeAnnouncements?: boolean,
    excludeDigests?: boolean

}

interface Content {
    markup: string
}

interface Title {
    text: string,
    markup: string
}

interface Source {
    id: number,
    name: string,
    categoryId: number,
    levelId: number,
    groupId: number
}
interface Author {
    name: string
}

export type { Attributes, Source, Author, Title, Content }