export interface CalenderResponse {
    items: CalenderItem[]
}

export interface CalenderItem {
    summary?: string
    creator?: CreatorDetails
    start: Time
    end: Time
}

interface CreatorDetails {
    email: string
}

interface Time {
    date?: string
    dateTime?: string
}