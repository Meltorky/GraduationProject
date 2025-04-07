export async function getAllProducts() {
  const response = await fetch("https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Product/get-all-products?pagenum=1&Maxpagesize=50&pagesize=50");
  if (!response.ok) {
    throw { message: "Failed to fetch posts.", status: 500 };
  }
  return response.json();
}

// export async function getSlowPosts() {
//   await timeout(Math.random() * 6000 + 500);
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//   if (!response.ok) {
//     throw { message: "Failed to fetch posts.", status: 500 };
//   }
//   return response.json();
// }

export async function getSlowPosts() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, Math.random() * 6000 + 500);
  });

  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error(`Failed to fetch posts. ${response.status}`);
  }
  return response.json();
}

export async function getPost(id) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + id
  );
  if (!response.ok) {
    throw { message: "Failed to fetch post.", status: 500 };
  }
  return response.json();
}

export async function savePost(post) {
  if (post.title.trim().length < 5 || post.body.trim().length < 10) {
    throw { message: "Invalid input data provided.", status: 422 };
  }

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw { message: "Could not save post.", status: 500 };
  }
}
