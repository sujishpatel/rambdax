import {Compulsory as OCompulsory} from '../Object/Compulsory.ts'
import {ObjectOf} from './ObjectOf.ts'
import {List} from './List.ts'

/**
Get the keys of `L` that are [[Compulsory]]

(⚠️ needs `--strictNullChecks` enabled)
@param L
@returns [[Key]]
@example
```ts
```
*/
export type CompulsoryKeys<L extends List> =
    OCompulsory<ObjectOf<L>>
