import {IterationOf} from '../../Iteration/IterationOf.ts'
import {Iteration} from '../../Iteration/Iteration.ts'
import {Pos} from '../../Iteration/Pos.ts'
import {Next} from '../../Iteration/Next.ts'
import {Key} from '../../Any/Key.ts'
import {Readonly as OReadonly} from '../Readonly.ts'
import {LastIndex} from '../../List/LastIndex.ts'
import {List} from '../../List/List.ts'
import {Depth} from '../_Internal.ts'
import {Boolean} from '../../Boolean/Boolean.ts'

/**
@hidden
*/
type ReadonlyObject<O, Path extends List<Key>, depth extends Depth, I extends Iteration = IterationOf<'0'>> =
  O extends object                                                   // If it's an object
  ? Pos<I> extends LastIndex<Path>                                   // If it's the last index
    ? OReadonly<O, Path[Pos<I>], depth>                              // Use standard ReadOnly
    : {
        [K in keyof O]: K extends Path[Pos<I>]                       // If K is part of Path
                        ? ReadonlyObject<O[K], Path, depth, Next<I>> // Continue diving
                        : O[K]                                       // Not part of path - x
      } & {}
  : O                                                                // Not an object - x

/**
@hidden
*/
type ReadonlyArrays<O, Path extends List<Key>, depth extends Depth, I extends Iteration = IterationOf<'0'>> =
  O extends object                             // Same as above, but
  ? O extends (infer A)[]                      // If O is an array
    ? ReadonlyArrays<A, Path, depth, I>[]      // Dive into the array
    : Pos<I> extends LastIndex<Path>
      ? OReadonly<O, Path[Pos<I>], depth>
      : {
          [K in keyof O]: K extends Path[Pos<I>]
                          ? ReadonlyArrays<O[K], Path, depth, Next<I>>
                          : O[K]
        } & {}
  : O

/**
Make some fields of `O` readonly at `Path` (deeply or not)
@param O to make readonly
@param Path to be followed
@param depth (?=`'flat'`) to do it deeply
@param list (?=`0`) `1` to work within object lists
@returns [[Object]]
@example
```ts
```
*/
export type Readonly<O extends object, Path extends List<Key>, depth extends Depth = 'flat', list extends Boolean = 0> = {
  0: ReadonlyObject<O, Path, depth>
  1: ReadonlyArrays<O, Path, depth>
}[list]

