import {Repeat} from './List/Repeat.ts'
import {Equals} from './Any/Equals.ts'
import {ComputeRaw} from './Any/Compute.ts'
import {True, False, Boolean} from './Boolean/Boolean.ts'

/**
Test should pass
*/
export type Pass = True

/**
Test should fail
*/
export type Fail = False

/**
Check or test the validity of a type
@param debug to debug with parameter hints (`ctrl+p`, `ctrl+shift+space`)
@example
```ts
// see in `tst` folder
```
*/
export declare function check<Type, Expect, Outcome extends Boolean>(debug?: ComputeRaw<Type>): Equals<Equals<Type, Expect>, Outcome>

/**
Validates a batch of [[check]]
@param checks a batch of [[check]]
@example
```ts
// see in `tst` folder
```
*/
export declare function checks(checks: Partial<Repeat<Pass, '30'>>): void;
