import { test, expect } from '@playwright/test';

const username = `user_${Date.now()}`;
const userID = Date.now();
const baseURL = process.env.BASE_URL || 'https://petstore.swagger.io/v2';

test.describe('Petstore User API', () => {
  test('POST /user - Create user', async ({ request }) => {
    const response = await request.post(`${baseURL}/user`, {
      data: {
        id: userID,
        username: username,
        firstName: 'Christ',
        lastName: 'Ario',
        email: 'christ.ario@test.com',
        password: 'password123',
        phone: '08123456789',
        userStatus: 1,
      },
    });

    console.log('POST /user:', response.status(), await response.text());
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.message).toBe(userID.toString());
  });

  test('GET /user/{username} - Get user by username', async ({ request }) => {
    const response = await request.get(`${baseURL}/user/${username}`);

    console.log('GET /user/{username}:', response.status(), await response.text());
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.username).toBe(username);
    expect(body.firstName).toBe('Christ');
  });

  test('PUT /user/{username} - Update user', async ({ request }) => {
    const response = await request.put(`${baseURL}/user/${username}`, {
      data: {
        id: userID,
        username: username,
        firstName: 'Christ Updated',
        lastName: 'Ario',
        email: 'christ.updated@test.com',
        password: 'newpassword123',
        phone: '08999999999',
        userStatus: 1,
      },
    });

    console.log('PUT /user/{username}:', response.status(), await response.text());
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.message).toBe(userID.toString());
  });
});
