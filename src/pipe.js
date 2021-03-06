import { compose } from './compose.js'

export function pipe(...fns){
  if (fns.length === 0)
    throw new Error('pipe requires at least one argument')

  return compose(...fns.reverse())
}
