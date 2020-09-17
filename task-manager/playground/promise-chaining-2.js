require('../src/db/mongoose')

const Task = require('../src/models/task')

// Task.findByIdAndDelete('5f3dc63ec6cda55d48ae402d').then((task) => {
//     console.log(task);
//     return Task.countDocuments({complete: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async(taskId) => {

    await Task.findByIdAndDelete(taskId);
    const count = await Task.countDocuments({complete: false})
    return count;
}

deleteTaskAndCount('5f3dc63ec6cda55d48ae402d').then((count) => {
    console.log('count ' + count)
})