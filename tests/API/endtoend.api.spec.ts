import { test, expect } from '@playwright/test';

const username = `user_${Date.now()}`;
const userID = Date.now();
const baseURL = process.env.BASE_URL || 'https://petstore.swagger.io/v2';

test('Petstore User API - POST → GET → PUT', async ({ request }) => {
  // POST - Create user
  const postResponse = await request.post(`${baseURL}/user`, {
    data: {
      id: userID,
      username,
      firstName: 'Christ',
      lastName: 'Ario',
      email: 'christ.ario@test.com',
      password: 'password123',
      phone: '08123456789',
      userStatus: 1,
    },
  });

  expect(postResponse.status()).toBe(200);
  const postBody = await postResponse.json();
  expect(postBody.message).toBe(userID.toString());

  // GET - Verify user created
  const getResponse = await request.get(`${baseURL}/user/${username}`);
  expect(getResponse.status()).toBe(200);

  const getBody = await getResponse.json();
  expect(getBody.username).toBe(username);
  expect(getBody.firstName).toBe('Christ');

  // PUT - Update user
  const putResponse = await request.put(`${baseURL}/user/${username}`, {
    data: {
      id: userID,
      username,
      firstName: 'Christ Updated',
      lastName: 'Ario',
      email: 'christ.updated@test.com',
      password: 'newpassword123',
      phone: '08999999999',
      userStatus: 1,
    },
  });

  expect(putResponse.status()).toBe(200);
  const putBody = await putResponse.json();
  expect(putBody.message).toBe(userID.toString());
});
