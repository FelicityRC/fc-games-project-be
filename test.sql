\c nc_games_test;

--SELECT * FROM categories;
--SELECT * FROM comments;
--SELECT * FROM reviews;
--SELECT * FROM users;

--SELECT r.review_id, r.title, c.slug, r.designer, u.username, r.review_body, r.review_img_url, r.votes, r.created_at FROM reviews AS r

--SELECT r.*, u.username, c.slug FROM reviews AS r
--JOIN users AS u ON u.username=r.owner
--JOIN categories AS c ON c.slug=r.category;



