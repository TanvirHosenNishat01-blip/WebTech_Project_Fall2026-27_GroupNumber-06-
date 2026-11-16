function logIn_collect_data()
{

    let username = validUsername();
    let pass = validPassword();

    return false;
    
}

function validUsername() {
    let Username = document.getElementById("UserName").value.trim();
    let Error = document.getElementById("UsernameError");

    if (Username === "") {
        Error.textContent = "* Please fill the username";
        return false;
    }
    else if (Username.length < 3) {
        Error.textContent = "* Username must be at least 3 character";
        return false;
    }
    else {
        Error.textContent = "";
        return true;
    }
}

function validPassword() {
    let Password = document.getElementById("Password").value;
    let Error = document.getElementById("PasswordError");

    if (Password === "") {
        Error.textContent = "* Please give a Password";
        return false;
    }
    else if (Password.length < 8) {
        Error.textContent = "* Password must be at least 8 character";
        return false;
    }
    else {
        Error.textContent = "";
        return true;
    }
}