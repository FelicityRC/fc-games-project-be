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
      .then((response) => {
        const {
          body: { body },
        } = response;
        body.forEach((property) => {
          expect(property).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });

  test("404: bad request error message when given invalid file path", () => {
    return request(app)
      .get("/api/category")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
