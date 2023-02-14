const Summit = document.querySelector("#submit");
const enter_password = document.querySelector("#password");
const output = document.querySelector("#output");

Summit.addEventListener("click", function () {
const pass = enter_password.value;
if (pass == "Chong") {
  alert ("Password correct");
  } else {
  alert("Password Incorrect");
  }
  });