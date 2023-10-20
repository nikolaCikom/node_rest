export const checkName = (name) => {
    if (name === "") {
        alert("Molimo unesite ime.");
        return false;
    }
    
    return true;
}