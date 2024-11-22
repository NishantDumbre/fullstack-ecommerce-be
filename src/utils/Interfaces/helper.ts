export interface GenerateTokenHelperInterface{
    userId: string
    email: string,
}

export interface ComparePasswordHelperInterface{
    password: string, 
    encodedValue: string
}

// export interface DecodeTokenInterface{
//     decodeToken: (token:string) => null | {key:any}
// }

export interface DecodeTokenInterface {
    id: string;
    email: string;
}