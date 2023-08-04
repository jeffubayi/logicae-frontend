import { Chip } from "@mui/material";

const tomato = '#e21d1d';
const orange = '#fa5f38';
const yellow = '#f7af08';
const green = '#4caf50';
// Function to determine the color based on the number of views
function getColorForViews(views: string) {
  if (views == 'Jokes') {
    return tomato;
  } else if (views == "Pun") {
    return orange;
  } else if (views == 'Joke') {
    return yellow;
  } else if ("Riddle") {
    return green;
  } else {
    return "default"; // Default color if the number of views doesn't match any range
  }
}

export function renderViewsComponent(views: any) {
  const color = getColorForViews(views);

  return <Chip
    size="small"
    label={views}
    sx={{
      borderRadius: "10px", 
      color: color,
      backgroundColor: "background.default",
      borderColor: color,
      fontWeight: "bold"
    }}
  />;
}