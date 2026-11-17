function history_collect_data()
{
    let hospitalName = validHospitalName();
    let totalNumBag = validTotalNumBag();
    let Ddate = validDonationDate();
    
    return false;
}


function validDonationDate() 
{
    let date = document.getElementById("DDate").value;
    let Error = document.getElementById("DDateError");
    let show_date = document.getElementById("ShowDonationDate");

    if(date == "") 
    {
        Error.innerHTML = "* Please select donation date";
        return false;
    } 
    else 
    {
        Error.innerHTML = "";
        show_date.innerHTML = date;
        return true;
    }
}


function validHospitalName()
{
    let Hname= document.getElementById("Hospitalname").value;
    let Error = document.getElementById("HospitalNameError");
    let show_name = document.getElementById("ShowHName");

    if(Hname=="")
    {
        Error.innerHTML = "* Please enter your name";
        return false;
    }
    else if (Hname.length<7)
    {
        Error.innerHTML = "* Name must be at least 7 character";
        return false;
    }
    else{
        Error.innerHTML = "";
        show_name.innerHTML = Hname;
        return true;
    }
    
} 

function validTotalNumBag()
{
    let totalNum = document.getElementById("totalNumBag").value;
    let Error = document.getElementById("totalNumBagError");
    let show_num = document.getElementById("ShowNum");

    if(totalNum==="")
    {
        Error.innerHTML = "* Please enter how many bags";
        return false;
    }
    else if(totalNum<0 || totalNum>5)
    {
        Error.innerHTML = "* Invalid";
        return false;
    }
    else{
        Error.innerHTML = "";
        show_num.innerHTML = totalNum;
        return true;
    }
}
