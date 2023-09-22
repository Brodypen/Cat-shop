function addCss(fileName) {

  var head = document.head;
  var link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;

  head.appendChild(link);
}

const renderGift = async () => {
  const requestedID = parseInt(window.location.href.split("/").pop());
  const response = await fetch("/gifts");
  const data = await response.json();

  addCss("../style.css");

  const giftContent = document.getElementById("cat-content");
  let gift;
  gift = data.find((gift) => gift.id === requestedID);
  console.log("rendering GIfts");
  if (gift) {
    document.getElementById("cat-image").src = gift.image;
    document.getElementById("name").textContent = gift.name;
    document.getElementById("submittedBy").textContent =
      "Submitted by: " + gift.submittedBy;
    document.getElementById("age").textContent = "Age: " + gift.age;
    document.getElementById("tags").textContent = "Tags: " + gift.tags;
    document.getElementById("description").textContent = gift.description;
    document.title = `UnEarthed - ${gift.name}`;
  } else {
    const message = document.createElement("h2");
    message.textContent = "No Gifts Available 😞";
    giftContent.appendChild(message);
  }
};

renderGift();
