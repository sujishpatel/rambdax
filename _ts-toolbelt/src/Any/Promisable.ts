import {Promise} from '../Any/Promise.ts'

/**
 * A way to say that you can handle `Promises` and non-`Promises`. This
 * is often the case if you're a heavy user of `await` and `async`.
 * @param A Any type
 * @returns `A | Promise<A>`
 * @example
 */
export type Promisable<A extends any> =
    A | Promise<A>
