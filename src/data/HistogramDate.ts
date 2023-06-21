interface Analytics {
    data: [data]

}
interface data {
    data: {
        date: string,
        value: number
    }[],
    histogramType: string;
}[]

export type { Analytics, data }