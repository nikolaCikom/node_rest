function login(event) {
  var usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!usernameRegex.test(username)) {
    document.getElementById('username').classList.add('is-invalid');
    document.getElementById('errorUsername').innerHTML = `Please provide a valid username`;

    event.preventDefault();
  }

  //   if (!passwordRegex.test(password)) {
  //     alert("Morate uneti lozinku.");
  //     event.preventDefault();
  //   }

  let loginData = {
    username: username,
    password: password,
  };

  fetch('http://localhost:3000/loginAuth', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        location.replace('/');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
