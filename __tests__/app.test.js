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

describe.only("Northcoders Backend Games Project", () => {
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
          expect(body.review).toEqual(
            expect.objectContaining({
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
            })
          );
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

    test("404: returns an error message when passed a review id that doesn't exist", () => {
      return request(app)
        .get("/api/reviews/8000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("not found");
        });
    });
  });

  describe("GET: /api/users", () => {
    test("200: responds with an array of objects containing user data", () => {
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

    test("404: returns an error message when passed an end point that doesn't exist", () => {
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

    test("400: returns an error message when sending an empty object", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("no votes to add");
        });
    });

    test("400: returns an error message when no value has been sent over in the inc_votes object", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({ inc_votes: NaN })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("no votes to add");
        });
    });
  });

  describe("GET: /api/reviews/:review_id (comment_count)", () => {
    test("200: responds with total count of comments with corresponding review id", () => {
      return request(app)
        .get("/api/reviews/3")
        .expect(200)
        .then(({ body }) => {
          expect(body.review.review_id).toEqual(3);
          expect(body.review.comment_count).toEqual(3);
          expect.objectContaining({
            review_id: 3,
            comment_count: 3,
          });
        });
    });
  });

  describe("GET: /api/reviews", () => {
    test("200: returns array of reviews with expected properties including comment count for each review and sorted by date order descending", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body.reviews)).toEqual(true);
          expect(body.reviews.length).toEqual(13);
          expect(body.reviews).toBeSortedBy("created_at", { descending: true });
          body.reviews.forEach((review) => {
            expect(review).toEqual(
              expect.objectContaining({
                review_id: expect.any(Number),
                owner: expect.any(String),
                title: expect.any(String),
                category: expect.any(String),
                review_img_url: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                designer: expect.any(String),
                comment_count: expect.any(Number),
              })
            );
          });
        });
    });

    test("200: returns reviews filtered by category specified when given category query", () => {
      return request(app)
        .get("/api/reviews?category=euro%20game")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body.reviews)).toEqual(true);
          expect(body.reviews.length).toEqual(1);
          body.reviews.forEach((review) => {
            expect(review).toEqual(
              expect.objectContaining({
                category: "euro game",
              })
            );
          });
        });
    });

    test("404: responds with not found msg when query entered that doesn't exist", () => {
      return request(app)
        .get("/api/reviews?category=biscuits")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("category not found");
        });
    });
  });

  describe("GET: /api/reviews/:review_id/comments", () => {
    test("200: return array of comments for the given review_id with each comment containing the expected properties and listed by most recent comments first", () => {
      return request(app)
        .get("/api/reviews/3/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toBeSortedBy("created_at", {
            descending: true,
          });
          body.comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                review_id: expect.any(Number),
              })
            );
          });
        });
    });

    test("400: returns an error message when passed an invalid type of review id", () => {
      return request(app)
        .get("/api/reviews/hello/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid id");
        });
    });

    test("404: returns an error message when passed a review id that doesn't exist in the database", () => {
      return request(app)
        .get("/api/reviews/80000/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("not found");
        });
    });
  });
});
