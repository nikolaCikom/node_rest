const deleteCompanyButton = document.getElementById('deleteCompanyButton');
const companyId = deleteCompanyButton.getAttribute('data-companyId');

deleteCompanyButton.addEventListener('click', () => {
  if (confirm('Da li ste sigurni da želite da obrišete kompaniju?')) {
    fetch(`/companies/${companyId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw new Error('Neuspešno brisanje kompanije');
      })
      .then((data) => {
        alert('Kompanija je uspešno obrisana');
      })
      .catch((error) => {
        alert('Greška prilikom brisanja kompanije: ' + error.message);
      });
  }
});
