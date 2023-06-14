export const timeConverter = (timestamp: number) => {
  if (!timestamp) {
    return timestamp;
  }

  let date = new Date(timestamp);
  let formatedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    year: "numeric",
    month: "long",
  }); // DD MM YYYY

  return formatedDate;
};
