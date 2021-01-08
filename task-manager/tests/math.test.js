const {
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
    } = require("../src/math");
    
test("Should convert 32 F to 0 C", () =>
expect(fahrenheitToCelsius(32)).toBe(0));
    
test("Should convert 0 C to 32 F", () =>
expect(celsiusToFahrenheit(0)).toBe(32));

// test('Async test demo', (done) => {

//     setTimeout(() => {
//         expect(1).toBe(1)
//         done()
//     }, 2000)
 
// })

test('add', (done) => {

    const result = add(2, 34).then((sum) => {
        expect(sum).toBe(36)
        done()
    });

})

test("Should add two numbers async/await", async() => {
    const sum = await add(23, 33)
    expect(sum).toBe(56)
})