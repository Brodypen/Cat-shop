const renderCats = async () => {
  const response = await fetch("/gifts");
  console.log(response);
  const data = await response.json();
  console.log(data);

  const mainContent = document.getElementById("main-content");

  if (data) {
    console.log(data.map((cat) => cat.name));
    data.map((cat) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const topContainer = document.createElement("div");
      topContainer.classList.add("top-container");

      const bottomContainer = document.createElement("div");
      bottomContainer.classList.add("bottom-container");

      topContainer.style.backgroundImage = `url(${cat.image})`;

      const name = document.createElement("h3");
      name.textContent = cat.name;
      bottomContainer.appendChild(name);

      const Age = document.createElement("p");
      Age.textContent = "Age: " + cat.age;
      bottomContainer.appendChild(Age);

      const tags = document.createElement("p");
      tags.textContent = "Tags: " + cat.tags;
      bottomContainer.appendChild(tags);

      const link = document.createElement("a");
      link.textContent = "Read More >";
      link.setAttribute("role", "button");
      link.href = `/gifts/${cat.id}`;
      bottomContainer.appendChild(link);

      card.appendChild(topContainer);
      card.appendChild(bottomContainer);
      mainContent.appendChild(card);
    });
  } else {
    const message = document.createElement("h2");
    message.textContent = "No Cats Available 😞";
    mainContent.appendChild(message);
  }
};
const requestedUrl = window.location.href.split("/").pop();
if (requestedUrl) {
  window.location.href = "../404.html";
} else {
  renderCats();
}
