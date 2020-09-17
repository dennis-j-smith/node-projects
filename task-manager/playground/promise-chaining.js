require('../src/db/mongoose')

const User = require('../src/models/user')


// User.findByIdAndUpdate('5f3dc4462c55b84ba4493cb1', {age: 1}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})

    return count
}

updateAgeAndCount('5f3dc4462c55b84ba4493cb1', 12).then((count) => {
    console.log(count)
})