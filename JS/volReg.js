function registration_collect_data()
{
    let Name=validName();
    let Age=validAge();
    let Email = validateEmail();
    let Gender = ValidateGender();
    let dob = validDateOfBirth();
    let BloodGroup = validateBloodGroup();
    let address = validateAddress();
    let Condition = validCondition();
    let username = validUsername();
    let pass = validPassword();

    return false;
    
}

function validName()
{
    let Vname= document.getElementById("VolunteerName").value;
    let Error = document.getElementById("NameError");
    if(Vname=="")
    {
        Error.innerHTML = "* Please enter your name";
        return false;
    }
    else if (Vname.length<7)
    {
        Error.innerHTML = "* Name must be at least 7 character";
        return false;
    }
    else{
        Error.innerHTML = "";
        return true;
    }
    
} 

function validAge()
{
    let VAge= document.getElementById("VolunteerAge").value;
    let Error = document.getElementById("AgeError");
    if(VAge=="")
    {
        Error.innerHTML = "* Please enter your Age";
        return false;
    }
    else if(VAge<0 && VAge>45)
    {
        Error.innerHTML = "Age must be between 0 to 45";
        return false;
    }
    else{
        Error.innerHTML = "";
        return true;
    }
}

function validateEmail()
{
    let Email = document.getElementById("VolunteerEmail").value.trim();
    let Error = document.getElementById("EmailError");
    let RegularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(Email==="")
    {
        Error.innerHTML = "* Please enter your e-mail address";
        return false;
    }
    else if (!RegularExpression.test(Email))
    {
        Error.innerHTML = "* Please enter the email exact format";
        return false;
    }
    else{
        Error.innerHTML = "";
        return true;
    }
    
}

function ValidateGender()
{
    let genders = document.querySelectorAll('input[name="Gender"]')
    let GenderError = document.getElementById("GenderError");
    let selectGender ="";
    
    for(let i=0; i<genders.length; i++)
    {
        if(genders[i].checked)
        {
            selectGender = genders[i].value;
            break;
        }
    }
    if(selectGender=="")
    {
        GenderError.innerHTML = "* Please enter your gender";
        return false;
    }
    else{
        GenderError.innerHTML = "";
        return true
    }

}

function validDateOfBirth() 
{
    let date = document.getElementById("DOB").value;
    let Error = document.getElementById("dobError");
    // let show_date = document.getElementById("ShowDonationDate");

    if(date == "") 
    {
        Error.innerHTML = "* Please select date of birth";
        return false;
    } 
    else 
    {
        Error.innerHTML = "";
        // show_date.innerHTML = date;
        return true;
    }
}


function validateBloodGroup()
{
    let bloodGroup = document.getElementById("BloodGroup").value;
    let ErrorBloodGroup = document.getElementById("BloodGroupError");

    if(bloodGroup === "Select Your Blood Group")
    {
        ErrorBloodGroup.innerHTML = "* Please select your blood group";
        return false;
    }
    else
    {
        ErrorBloodGroup.innerHTML = "";
        return true;
    }
}

function validateAddress()
{
    let VAddress = document.getElementById("Address").value.trim();
    let Error = document.getElementById("AddressError");

    if(VAddress == "")
    {
        Error.innerHTML = "* Please enter your present address";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}


function validCondition() 
{
    let condition = document.getElementById("Condition");
    let ErrorCondition = document.getElementById("ConditionError");

    if (!condition.checked) 
    {
        ErrorCondition.textContent = "* Please accept the terms and conditions.";
        return false;
    } 
    else 
    {
        ErrorCondition.textContent = "";
        return true;
    }
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