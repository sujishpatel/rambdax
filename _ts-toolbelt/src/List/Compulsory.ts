import {Depth} from '../Object/_Internal.ts'
import {CompulsoryPart} from '../Object/Compulsory.ts'
import {List} from './List.ts'
import {_Pick} from '../Object/Pick.ts'

/**
Make that `L`'s fields cannot be [[Nullable]] or [[Optional]] (it's like
[[Required]] & [[NonNullable]] at once).
@param L to make compulsory
@param depth (?=`'flat'`) to do it deeply
@returns [[List]]
@example
```ts
```
*/
export type Compulsory<L extends List, depth extends Depth = 'flat'> =
    CompulsoryPart<L, depth>
