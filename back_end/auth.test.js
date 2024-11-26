const request = require('supertest');
const app = require('./app.js'); // 导入你的 Express 应用

describe('Auth API', () => {
    // 测试用户注册
    describe('POST /auth/register', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/auth/register')
                .send({
                    username: 'testuser1',
                    password: 'testpassword1'
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User registered successfully');
            expect(response.body.user).toHaveProperty('username', 'testuser1');
        });

        it('should return 400 if username or password is missing', async () => {
            const response = await request(app)
                .post('/auth/register')
                .send({
                    username: '',
                    password: ''
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Username and password are required');
        });

        it('should return 400 if username already exists', async () => {
            // 先注册一个用户
            await request(app)
                .post('/auth/register')
                .send({
                    username: 'duplicateuser',
                    password: 'testpassword'
                });

            // 再次尝试注册相同的用户
            const response = await request(app)
                .post('/auth/register')
                .send({
                    username: 'duplicateuser',
                    password: 'testpassword'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Username already exists');
        });
    });

    // 测试用户登录
    describe('POST /auth/login', () => {
        it('should log in an existing user', async () => {
            // 先注册用户
            await request(app)
                .post('/auth/register')
                .send({
                    username: 'loginuser',
                    password: 'loginpassword'
                });

            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: 'loginuser',
                    password: 'loginpassword'
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful');
            expect(response.body).toHaveProperty('token');
        });

        it('should return 404 if user does not exist', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: 'nonexistentuser',
                    password: 'password'
                });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User not found');
        });

        it('should return 401 if password is incorrect', async () => {
            // 先注册用户
            await request(app)
                .post('/auth/register')
                .send({
                    username: 'wrongpassworduser',
                    password: 'correctpassword'
                });

            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: 'wrongpassworduser',
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Incorrect password');
        });
    });
});
