export const canUseDom = () => typeof window !== 'undefined'

export const isArray = prop => Object.prototype.toString.call(prop) === '[object Array]'
