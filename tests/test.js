const request = require('supertest');
const app = require('../server');
describe('Post Endpoints', () => {
  it('should give a product', async () => {
    const x = 4, y = 8;
    const res = await request(app)
      .post('/')
      .send({
        x,
        y,
      });
    app.close(); // иначе jest не завершится  
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('Result');
    expect(res.body.Result).toEqual(Number(x) * Number(y));
  });
});
