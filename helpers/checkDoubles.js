export default function checkDoubles(arrays, value) {
  const newArray = arrays.filter((item) => item.includes(value))
  return newArray.length > 0
}   
