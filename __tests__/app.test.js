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
  test("200: responds with an object of category data", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
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

  test("404: returns an error message when passed endpoint that doesn't exist", () => {
    return request(app)
      .get("/api/category")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});

describe.only("GET: /api/reviews/:review_id", () => {
  test("200: responds with review object", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual({
          review_id: 1,
          title: "Agricola",
          review_body: "Farmyard fun!",
          designer: "Uwe Rosenberg",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          votes: 1,
          category: "euro game",
          owner: "mallionaire",
          created_at: expect.any(String),
        });
      });
  });

  test("400: returns an error message when passed a bad review id", () => {
    return request(app)
      .get("/api/reviews/myReviews")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid id");
      });
  });

  test("404 returns an error message when passed a review id that doesn't exist", () => {
    return request(app)
      .get("/api/reviews/8000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});

