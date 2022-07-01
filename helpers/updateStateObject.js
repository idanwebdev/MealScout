
export default function updateStateObject(oldObject, updateObject) {
let objectCopy = Object.assign({},oldObject)
let updatedCopy = Object.assign({}, updateObject)
delete objectCopy['owner']
Object.keys(objectCopy.products).forEach((item) => {
  if (updatedCopy[item]) {
    updatedCopy[item] = updatedCopy[item].concat(objectCopy.products[item])
  } else {
    updatedCopy[item] = objectCopy.products[item] 
  }
})
return updatedCopy
}