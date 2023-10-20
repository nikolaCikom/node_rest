const form = document.getElementById('companyForm');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  const data = {
    name: name,
    description: description,
  };

  fetch('/companies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Uspješno kreirana kompanija');
        location.replace('/companies');
      } else {
        console.error('Greška prilikom kreiranja kompanije');
      }
    })
    .catch((error) => {
      console.error('Greška prilikom slanja zahtjeva:', error);
    });
});
