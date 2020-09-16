// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         //resolve([2, 4, 6])        
//         reject('Error...');
//      }, 2000)
// })

// doWorkPromise.then((result) => {
//     console.log('Success:' + result);
// }).catch((error) => {
//     console.log(error)
// })


const add = (a, b) => {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(a + b)
            }, 2000)
    })
}

// add(1, 2).then((sum) => {
//     console.log(sum);
// }).catch((e) => {
//     console.log(e);
// })

//Promise Chaining
add(1, 2).then((sum) => {
    console.log(sum)
    return add(sum, 4);
}).then((sum2) => {
    console.log(sum2)
}).catch((e) => {
         console.log(e);
})