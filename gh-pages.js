import { publish } from "gh-pages";

publish(
  "build", // path to public directory
  {
    branch: "gh-pages",
    repo: "https://github.com/el3um4s/memento-sveltekit-and-github-pages.git", // Update to point to your repository
    user: {
      name: "sharu725", // update to use your name
      email: "sharath.dt@gmail.com", // Update to use your email
    },
    dotfiles: true,
  },
  () => {
    console.log("Deploy Complete!");
  }
);
