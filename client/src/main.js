const postsContainer = document.getElementById("posts-container");
const postForm = document.getElementById("postForm");
const likes = 0;
let avatar = 0;

async function fetchData() {
  const response = await fetch("https://hotelcalifornia-server.onrender.com/");
  const data = await response.json();
  displayPosts(data);
}

function displayPosts(data) {
  data.forEach((post) => {
    // postsContainer.textContent = "";
    const newPost = document.createElement("div");
    newPost.setAttribute("class", "post");
    postsContainer.appendChild(newPost);
    // Loop through each post
    for (const [key, value] of Object.entries(post)) {
      const div = document.createElement("div");
      div.setAttribute("class", `${key}`);
      if (key === "created_at") {
        div.textContent = new Date(value).toLocaleDateString("en-GB");
      } else if (key === "avatar") {
        div.style.backgroundImage = `url("./public/${value}.png")`;
      } else if (key === "likes") {
        const likeButton = insertLikeButton();
        div.append(value);
        div.append(likeButton);
        likeButton.addEventListener("click", () =>
          addLike(post.id, post.likes)
        );
      } else {
        div.textContent = `${value}`;
      }
      newPost.append(div);
    }
    const deleteButton = insertDeleteButton();
    newPost.append(deleteButton);
    deleteButton.addEventListener("click", () => handleDeletePost(post.id));
  });

  // DELETE BUTTON
  function insertDeleteButton() {
    const deleteButton = document.createElement("button");
    deleteButton.className = "px-3 py-2 bg-blue-600 text-white rounded-lg";
    deleteButton.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>`;
    return deleteButton;
  }

  // LIKE BUTTON
  function insertLikeButton() {
    const likeButton = document.createElement("button");
    likeButton.className = "px-1 fill-red-500 rounded-lg";
    likeButton.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>`;
    return likeButton;
  }
}

// ## ADD LIKE ##
async function addLike(id, likes) {
  console.log(`You are liking post ${id} with ${likes} likes`);
  likes++;
  console.log(`Likes now is ${likes} likes`);
  try {
    const response = await fetch(
      `https://hotelcalifornia-server.onrender.com/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes }),
      }
    );
    const result = await response.json();
    console.log(result);
    fetchData();
  } catch (error) {
    console.error(error);
  }
}

// ## CHARACTER COUNT FOR TEXT AREA ##
const characterCount = document.getElementById("character-count");
const messageArea = document.getElementById("text");
const maxLength = messageArea.getAttribute("maxlength");
messageArea.addEventListener("input", () => {
  const currentLength = messageArea.value.length;
  characterCount.textContent = `${currentLength} / ${maxLength} characters`;
});
// ## HANDLE NEW POST ##

async function handleSubmitPost(event) {
  event.preventDefault();
  const formData = new FormData(postForm);
  const title = formData.get("title");
  const username = formData.get("username");
  const text = formData.get("text");
  createAvatar();
  console.log("Form data:", { title, username, text, avatar, likes }); // Debug log

  try {
    const response = await fetch(
      "https://hotelcalifornia-server.onrender.com/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, username, avatar, text, likes }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      postForm.reset(); // Clear the form
      postsContainer.textContent = ""; // Clear the screen
      await fetchData(); // Wait for data to load
    } else {
      console.error("Error saving message:", result);
    }
  } catch (error) {
    console.error(error);
  }
}

// Create Random avatar
function createAvatar() {
  avatar = Math.floor(Math.random() * 10);
  return avatar;
}
// ## HANDLE DELETE ##

async function handleDeletePost(id) {
  try {
    const response = await fetch(
      `https://hotelcalifornia-server.onrender.com/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // Refresh the posts after successful deletion
      postsContainer.textContent = "";
      await fetchData();
    } else {
      console.error("Error deleting post:", response.statusText);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

postForm.addEventListener("submit", handleSubmitPost);
fetchData();
