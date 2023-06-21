interface TargetSearchEntity {
    type?: string,
    inBusinessNews?: boolean,
    sparkId?: number,
    entityId?: number,
    inn: number,
    maxFullness?: boolean
}
interface TargetSearchEntitiesContext {
    targetSearchEntities?: TargetSearchEntity[],
    onlyMainRole?: boolean,
    onlyWithRiskFactors?: boolean,
    tonality?: string,

}
interface SearchContext {
    targetSearchEntitiesContext: TargetSearchEntitiesContext,
}
interface DateInterval {
    startDate: string,
    endDate: string
}


export type { TargetSearchEntity, TargetSearchEntitiesContext, SearchContext, DateInterval }