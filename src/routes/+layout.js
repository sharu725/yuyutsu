export const load = async ({ fetch }) => {
  // Use a `limit` querystring parameter to fetch a limited number of posts
  // e.g. fetch('posts.json?limit=5') for 5 most recent posts
  const res = await fetch("/api/posts.json");
  const posts = await res.json();

  return {
    posts,
  };
};
