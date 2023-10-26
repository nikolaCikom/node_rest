const form = document.getElementById('companyForm');
const companyId = updateCompanyButton.getAttribute('data-companyId');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  const formData = new FormData();

  formData.append('name', name);
  formData.append('description', description);

  const imageInput = document.getElementById('image');
  const imageFile = imageInput.files[0];

  formData.append('image', imageFile);

  fetch(`/companies/${companyId}`, {
    method: 'PUT',
    body: formData,
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
