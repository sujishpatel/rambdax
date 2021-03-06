import {Key} from '../Any/Key.ts'
import {Boolean} from '../Boolean/Boolean.ts'

/**
@hidden
*/
export type AtBasic<O extends object, K extends Key> =
    K extends keyof O
    ? O[K]
    : never

/**
@hidden
*/
export type AtStrict<O extends object, K extends Key> =
    O[K & keyof O] // this is so that we can query `string | number`

/**
@hidden
*/
export type AtLoose<O extends object, K extends Key> =
    O extends unknown
    ? AtStrict<O, K>
    : never

/**
Get in `O` the type of a field of key `K`
@param O to extract from
@param K to extract at
@param strict (?=`1`) `0` to work with unions
@returns [[Any]]
@example
```ts
import {O} from 'ts-toolbelt'

type User = {
    info: {
        name: string
        age: number
        payment: {}
    }
    id: number
}

type test0 = O.At<User, 'id'> // number
```
*/
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>
    0: AtLoose<O, K>
}[strict]
