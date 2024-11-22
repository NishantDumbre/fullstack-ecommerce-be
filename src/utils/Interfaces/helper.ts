export interface GenerateTokenHelperInterface{
    fetchedId: string
    email: string,
}

export interface ComparePasswordHelperInterface{
    password: string, 
    encodedValue: string
}