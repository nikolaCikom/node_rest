function register() {
    const username = document.getElementById("username").value
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const repeatPassword = document.getElementById("repeatPassword").value 

    if (password !== repeatPassword) {
        alert("Lozinke se ne podudaraju. Molimo ponovite unos.")
        return; 
    }

    let registerData = {
        username: username,
        name: name,
        email: email,
        password: password,
        repeatPassword: repeatPassword
    }

    fetch("http://localhost:3000/registerAuth", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(registerData)
    }).then(response => {
        console.log(response)
        if(response.ok) {
            location.replace('/')
        }
        return response.json()
    }).then(data => {
        console.log(data)
        
    }).catch(err => {
        console.log(err)
    })
}