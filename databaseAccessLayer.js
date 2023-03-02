const database = include("/databaseConnection");

async function getRestaurant() {
  let sqlQuery = `
		SELECT restaurant_id, name, description FROM restaurant;
	`;

  try {
    const results = await database.query(sqlQuery);
    console.log(results[0]);
    return results[0];
  } catch (err) {
    console.log("Error selecting from restaurant table");
    console.log(err);
    return null;
  }
}

////
async function addRestaurant(restaurant) {
  let sqlInsertRestaurant = `
INSERT INTO restaurant (name, description)
VALUES (:name, :description);
`;
  let params = {
    id: restaurant.restaurant_id,
    name: restaurant.name,
    description: restaurant.description,
  };
  console.log(sqlInsertRestaurant);
  try {
    const results = await database.query(sqlInsertRestaurant, params);
    return results[0];
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function deleteRestaurant(restaurant_id) {
  let sqlDeleteRestaurant = `
   DELETE FROM restaurant
   WHERE restaurant_id = :restaurant_id
   `;
  let params = {
    restaurant_id: restaurant_id,
  };
  console.log(sqlDeleteRestaurant);
  try {
    await database.query(sqlDeleteRestaurant, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getReview() {
  let sqlQuery = `
		SELECT review_id, restaurant_id, reviewer_name, details, rating
		FROM review;
	`;

  try {
    const results = await database.query(sqlQuery);
    console.log(results[0]);
    return results[0];
  } catch (err) {
    console.log("Error selecting from todo table");
    console.log(err);
    return null;
  }
}

async function addReview(postData) {
  let sqlInsertSalt = `
INSERT INTO review (review_id, restaurant_id, reviewer_name, details, rating)
VALUES (:review_id, :restaurant_id, :reviewer_name, :details, :rating);
`;
  let params = {
    review_id: postData.review_id,
    restaurant_id: postData.restaurant_id,
    reviewer_name: postData.reviewer_name,
    details: postData.details,
    rating: postData.rating,
  };
  console.log(sqlInsertSalt);
  try {
    const results = await database.query(sqlInsertSalt, params);
    console.log(results[0]);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function deleteReview() {
  let sqlDeleteReview = `
   DELETE FROM review
   WHERE review_id = :reviewer_name
   `;
  console.log(sqlDeleteReview);
  try {
    await database.query(sqlDeleteReview, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  getRestaurant,
  addRestaurant,
  deleteRestaurant,
  getReview,
  addReview,
  deleteReview,
};
