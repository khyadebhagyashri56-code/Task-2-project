const API = "http://localhost:3000";
let currentUser = JSON.parse(localStorage.getItem("user"));

function register() {
  fetch(API + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
  }).then(() => alert("Account created! Now login."));
}

function login() {
  fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: lemail.value,
      password: lpassword.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) alert("Wrong login");
      else {
        localStorage.setItem("user", JSON.stringify(data));
        window.location = "feed.html";
      }
    });
}

function createPost() {
  fetch(API + "/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: currentUser._id,
      content: post.value,
    }),
  }).then(() => loadPosts());
}

function loadPosts() {
  fetch(API + "/posts")
    .then((res) => res.json())
    .then((data) => {
      feed.innerHTML = "";
      data.forEach((p) => {
        feed.innerHTML += `
        <div class="post">
          <b>${p.user.name}</b><br>
          ${p.content}<br>
          ❤️ ${p.likes}
          <button onclick="like('${p._id}')">Like</button>
        </div>
      `;
      });
    });
}

function like(id) {
  fetch(API + "/like/" + id, { method: "POST" }).then(() => loadPosts());
}

function logout() {
  localStorage.removeItem("user");
  window.location = "welcome.html";
}

if (currentUser) {
  pname.innerText = currentUser.name || "No Name";
  pname2.innerText = currentUser.name || "No Name";
  pemail.innerText = currentUser.email || "";
}
