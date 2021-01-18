const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDB } = require('./fixtures/db')


beforeEach(setupDB)

// afterEach(() => {
//     console.log('afterEach')
// })

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Dennis',
        email: 'foo1@bar.com',
        password: 'MyPass123'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Asserttions about the response
    expect(response.body.user.name).toBe('Dennis')

    expect(response.body).toMatchObject({
        user: {
            name: 'Dennis',
            email: 'foo1@bar.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass123')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    console.log(response.body)
    const dbuser = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(dbuser.tokens[1].token)
})

test('Should not login non existent user', async () => {
    await request(app).post('/users/login').send({
        email: 'test123@example.com',
        password: 'foo'
    }).expect(400)
})

test('Should get profile for user', async () => {
    const response = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')        
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        const dbuser = await User.findById(userOne._id)
        expect(dbuser).toBeNull()
})

test('Should not delete account for unauthenticate user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async() => {
    await request(app).post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async() => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Chet"

        }).expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Chet')
})

test('Should not update invalid user fields', async() => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: "Philly"

        }).expect(400)
})