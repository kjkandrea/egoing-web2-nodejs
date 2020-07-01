const _ = require('underscore')
const arr = [3, 6, 9, 1, 12]

console.log(arr[0],' equal ',_.first(arr))
console.log(arr[arr.length - 1],' equal ',_.last(arr))

//console.log(_.first)