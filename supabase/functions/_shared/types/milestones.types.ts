export type FoundMilestone = {
    report_id: string
    repository: string
    title: string
    detail: string
}

export interface MilestoneScan {
    scanned: number
    found: number
    remaining: boolean
}
