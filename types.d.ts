export declare type Operator = {
    type: string
    countryName: string
    countryCode: string
    mcc: string
    mnc: string
    brand: string
    operator: string
    status: string
    bands: string
    notes: string
}

export declare const all: () => Operator[];

export declare const filter: (filters?: {
    countryCode?: string
    mcc?: string
    mnc?: string
    mccmnc?: string
    statusCode?: string
}) => Operator[];

export declare const find: (filters? : {
    countryCode?: string
    mcc?: string
    mnc?: string
    mccmnc?: string
    statusCode?: string
}) => Operator;

export declare const statusCodes: () => string[];

export {};
