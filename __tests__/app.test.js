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

beforeEach(() => seed({ categoryData, commentData, reviewData, userData }));

afterAll(() => {
  return db.end();
});

describe("Northcoders Backend Games Project", () => {
  describe("GET: /api/categories", () => {
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

  describe("GET: /api/reviews/:review_id", () => {
    test("200: responds with review object corresponding to given review_id", () => {
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

  describe("GET: /api/users", () => {
    test("200: responds with an object of user data", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body["users"])).toEqual(true);
          expect(body.users.length).toEqual(4);
          body.users.forEach((property) => {
            expect(property).toEqual(
              expect.objectContaining({
                name: expect.any(String),
                username: expect.any(String),
                avatar_url: expect.any(String),
              })
            );
          });
        });
    });

    test("404 returns an error message when passed an end point that doesn't exist", () => {
      return request(app)
        .get("/api/myUsers")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("not found");
        });
    });
  });

  describe("PATCH: /api/reviews/:review_id", () => {
    test("200: responds with updated new votes amount on the corresponding review_id", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({ inc_votes: 10 })
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            review_id: 2,
            title: "Jenga",
            category: "dexterity",
            designer: "Leslie Scott",
            owner: "philippaclaire9",
            review_body: "Fiddly fun for all the family",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            created_at: expect.any(String),
            votes: 15,
          });
        });
    });

    test("400: returns an error message when passed a data type that isn't valid", () => {
      return request(app)
        .patch("/api/reviews/bananas")
        .send({ inc_votes: 2 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid id");
        });
    });

    test("404: returns an error message when passed a review id that doesn't exist", () => {
      return request(app)
        .patch("/api/reviews/10000")
        .send({ inc_votes: 20 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("not found");
        });
    });

    test("404: returns an error message when sending an empty object", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({})
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("not found");
        });
    });

    test("404: returns an error message when no value has been sent over in the inc_votes object", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({inc_votes: NaN})
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("not found");
        });
    });
  });
});
