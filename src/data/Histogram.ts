import { Attributes, Source, Author, Title, Content } from "./Document"
import { TargetSearchEntity, TargetSearchEntitiesContext, SearchContext, DateInterval } from "./Search"


interface ScanDoc {
    schemaVersion: string,
    id: string,
    version: number,
    issueDate: Date,
    url: string,
    author: Author,
    source: Source,
    dedupClusterId: string,
    title: Title,
    content: Content,
    attributes: Attributes,
    language: string

}
interface SearchResultItem {
    encodedId: string,
    influence: number,
    number: number
}
interface EventFiltersInfo {
    usedCompanyCount: number,
    companyLimit: number
}


interface Histograms {
    intervalType: string,
    histogramTypes: string[],
    issueDateInterval: DateInterval,
    searchContext: SearchContext,
    similarMode: string,
    limit: number,
    sortType: string,
    sortDirectionType: string,
    attributeFilters: Attributes
}


export type { Histograms }