export enum Protocol {
    BASE = "://",
    HTTP = "http",
    HTTPS = "https"
}

export class ProtocolFormatter {
    static format(p: Protocol): string {
        return `${p}${Protocol.BASE.toString()}`;
    }
}