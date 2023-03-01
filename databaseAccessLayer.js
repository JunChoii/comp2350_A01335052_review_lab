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
async function addRestaurant(postData) {
  let sqlInsertSalt = `
INSERT INTO restaurant (restaurant_id, name, description)
VALUES (:restaurant_id, :name, :description);
`;
  let params = {
    restaurant_id: postData.restaurant_id,
    name: postData.name,
    description: postData.description,
  };
  console.log(sqlInsertSalt);
  try {
    const results = await database.query(sqlInsertSalt, params);
    let insertedID = results.insertId;
    let updatePasswordHash = `
UPDATE restaurant
SET password_hash = sha2(concat(:password,:pepper,password_salt),512)
WHERE web_user_id = :userId;
`;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function deleteRestaurant(restaurant_id) {
  let sqlDeleteUser = `
   DELETE FROM restaruant
   WHERE restaruant_id = :restaurant_id
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

////
const passwordPepper = "SeCretPeppa4MySal+";
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
    let insertedID = results.insertId;
    let updatePasswordHash = `
UPDATE review
SET password_hash = sha2(concat(:password,:pepper,password_salt),512)
WHERE web_user_id = :userId;
`;
    let params2 = {
      password: postData.password,
      pepper: "passwordPepper",
      userId: insertedID,
    };
    console.log(updatePasswordHash);
    const results2 = await database.query(updatePasswordHash, params2);
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
