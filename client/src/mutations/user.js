import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation createUser($input: UserInput) {
        createUser(input: $input) {
            id, username, age
        }
    }
`

/* Параметр указывается через $ , дальше указывается тип параметра 

{id, username, age} данные которые мы получаем в ответе 
*/
