console.log("Client side JavaScript is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  console.log("testing");
  e.preventDefault();
  console.log(search.value);
  message1.textContent = 'Loading......'
  fetch(`http://localhost:3000/weather?address=${search.value}`).then(
    (response) => {
      response.json().then((data) => {
        console.log(data);
        if (data.error) {
          message1.textContent = data.error;
        } else {
          message1.textContent = data.forecast;
          message2.textContent = data.location;
        }
      });
    }
  );
});
