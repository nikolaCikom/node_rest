
fetch(`http://localhost:3000/getcompanies?page=${1}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const cardContainer = document.getElementById("card-container");

  data.data.forEach((e) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("col-md-4"); 

  cardDiv.innerHTML = `
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">${e.name}</h5>
        <p class="card-text">${e.description}</p>
        <a class="btn btn-primary" href="/companies/${e.id}">View Company</a>
      </div>
    </div>
  `;

  cardContainer.appendChild(cardDiv);
  
});

    })
    .catch(err => {
        console.error("Fetch error:", err);
    });