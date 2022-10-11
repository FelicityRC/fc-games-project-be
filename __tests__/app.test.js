const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const app = require("../app.js");
const request = require("supertest");
const {
  categoryData,
  commentData,
  reviewData,
  userData,
} = require("../db/data/test-data");
const { expect } = require("@jest/globals");

beforeEach(() => seed({ categoryData, commentData, reviewData, userData }));

afterAll(() => {
  return db.end();
});

describe.only("GET: /api/categories", () => {
  test("200: responds with array of category objects with slug & description properties", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        console.log(body)
       expect(Array.isArray(body["categories"])).toEqual(true);
        expect(body.categories.length).toEqual(4);
        body.categories.forEach((property) => {
          expect(property).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });

  test("404: bad request error message endpoint doesn't exist", () => {
    return request(app)
      .get("/api/category")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
