const batch = 1508; // change to your own batch id
const baseUrl = "https://wagon-chat.herokuapp.com/";

// Your turn to code!
// const messageList = document.querySelector(".list-unstyled");
const messageList = document.querySelector(".whole-chat");

const url = `https://wagon-chat.herokuapp.com/${batch}/messages`;

const postMessage = (event) => {
  event.preventDefault();
  const yourComment = document.getElementById("your-message");
  // const yourName = document.getElementById("your-name").value;
  const yourName = document.getElementById("your-name");
  console.log(yourName);
  const message = { author: yourName.value, content: yourComment.value };
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      yourComment.value = "";
      const currentTime = Date.now();
      const postedTime = Date.parse(data.created_at);
      const postedAgo = Math.floor((currentTime - postedTime) / 60000);
      console.log(postedAgo);
      // messageList.insertAdjacentHTML("beforeend", `<li>${data.content} (posted ${postedAgo}) by ${data.author}</li>`);
      messageList.insertAdjacentHTML("beforeend", `
        <div class="message">
        <img src="userpicture.png" alt="user picture" class="user-profile-picture">
        <div class="message-content">
          <p>${data.author}<span> (${postedAgo} minutes ago)</span></p>
          <p>${data.content}</p>
        </div>
      </div>
        `);
    });
};

// const form = document.querySelector("#comment-form");
const form = document.querySelector("form");
console.log(form);
form.addEventListener("submit", postMessage);

const getMessage = (event) => {
  messageList.innerHTML = "";
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      (data.messages).forEach((message) => {
        const currentTime = Date.now();
        const postedTime = Date.parse(message.created_at);
        const postedAgo = Math.floor((currentTime - postedTime) / 60000);
        console.log(postedAgo);
        // messageList.insertAdjacentHTML("beforeend", `<li>${message.content} (posted ${postedAgo} minutes ago) by ${message.author}</li>`);
        messageList.insertAdjacentHTML("beforeend", `
        <div class="message">
        <img src="userpicture.png" alt="user picture" class="user-profile-picture">
        <div class="message-content">
          <p>${message.author}<span> (${postedAgo} minutes ago)</span></p>
          <p>${message.content}</p>
        </div>
      </div>
        `);
        //test
      });
    });
};

// const refreshButton = document.querySelector("#refresh");
// refreshButton.addEventListener("click", getMessage);

// refresh auto
setInterval(getMessage, 10000);
