export interface ElviaConsumptionResponse {
    meteringpoints: MeteringPoint[]
}

export interface MeteringPoint {
    meteringPointId: string
    metervalue: MeterValue
}

interface MeterValue {
    timeSeries: TimeSerie[]
}

export interface TimeSerie {
    startTime: string
    endTime: string
    value: number
}