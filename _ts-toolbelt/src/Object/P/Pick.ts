import {IterationOf} from '../../Iteration/IterationOf.ts'
import {Iteration} from '../../Iteration/Iteration.ts'
import {Pos} from '../../Iteration/Pos.ts'
import {Next} from '../../Iteration/Next.ts'
import {Key} from '../../Any/Key.ts'
import {_Pick as _OPick} from '../Pick.ts'
import {LastIndex} from '../../List/LastIndex.ts'
import {List} from '../../List/List.ts'
import {Boolean} from '../../Boolean/Boolean.ts'
import {_ListOf} from '../ListOf.ts'

/**
@hidden
*/
type Action<O extends object, Path extends List<Key>, I extends Iteration = IterationOf<'0'>> =
  O extends List
  ? _ListOf<_OPick<O, Path[Pos<I>]>>
  : _OPick<O, Path[Pos<I>]>

/**
@hidden
*/
type PickObject<O, Path extends List<Key>, I extends Iteration = IterationOf<'0'>> =
  O extends object                                // If it's an object
  ? Action<O, Path, I> extends infer Picked       // Pick the current index
    ? Pos<I> extends LastIndex<Path>              // If it's the last index
      ? Picked                                    // Return the picked object
      : {                                         // Otherwise, continue diving
          [K in keyof Picked]: PickObject<Picked[K], Path, Next<I>>
        } & {}
    : never
  : O                                             // Not an object - x

/**
@hidden
*/
type PickList<O, Path extends List<Key>, I extends Iteration = IterationOf<'0'>> =
  O extends object                  // Same as above, but
  ? O extends (infer A)[]           // If O is an array
    ? PickList<A, Path, I>[]        // Dive into the array
    : _OPick<O, Path[Pos<I>]> extends infer Picked
      ? Pos<I> extends LastIndex<Path>
        ? Picked
        : {
            [K in keyof Picked]: PickList<Picked[K], Path, Next<I>>
          } & {}
      : never
  : O

/**
Extract out of `O` the fields at `Path`
@param O to extract from
@param Path to be followed
@param list (?=`0`) `1` to work within object lists
@returns [[Object]]
@example
```ts
```
*/
export type Pick<O extends object, Path extends List<Key>, list extends Boolean = 0> = {
  0: PickObject<O, Path>
  1: PickList<O, Path>
}[list]

// todo propagate this new way of doing, remove mcpower version
