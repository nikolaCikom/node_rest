export const checkEmail = () => {
    const email = 'example@example.com'
    var regex = '[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+'

    console.log(regex.test(email))

    // return regex.test(email)
} 
checkEmail()