const avarageRating = (ratings) => {
  let sum = 0;
  for (let i = 0; i < ratings.length; i++) {
    sum += ratings[i];
  }
  return (sum / ratings.length).toFixed(2);
};

export default avarageRating;
