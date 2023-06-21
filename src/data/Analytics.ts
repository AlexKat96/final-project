interface IntervalPoint {
    date: Date,
    value: number
}
interface HistogramData {
    data: [IntervalPoint],
    histogramType: string
}

export type { IntervalPoint, HistogramData }