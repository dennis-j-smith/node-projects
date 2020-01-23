// Object property shorthand

const name = 'Dennis'
const userAge = 47

const user = {
  name,
  age: userAge,
  location: 'Baltimore'
}

console.log(user)

// Object destructuring

const product = {
  label: 'Red Notebook',
  price: 3,
  stock: 201,
  salePrice: undefined
}

//const label = product.label

const {label: productLabel, stock} = product

console.log(productLabel)
console.log(stock)
