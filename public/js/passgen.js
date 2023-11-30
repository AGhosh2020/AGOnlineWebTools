
let pass_error = document.getElementsByClassName("pass_error");
let pass_err_msg = document.getElementsByClassName("pass_err_msg");
let error_pass = ["Please select password length","Select at least one option","Generate the Random Password First","Password generation failed. Please try again."];
let passlengthoptgrpname = ["Select One","Weak", "Moderate", "Strong", "Toughest", "Complexity"];
let password_length_wmst = range(7,101);
let password_length_complexity = range(1024, 11265, 1024);
let password_length_selectone = ["Select One"];
let password_length_range = password_length_selectone.concat(password_length_wmst,password_length_complexity);
let isLoadedSelectOption = false;
function range(start, stop, step=1)
{
    let length = Math.ceil((stop - start) / step);
    return Array.from({length}, (_, i) => (i * step) + start);
}
function password_length()
{
    if(isLoadedSelectOption == true)
    {
        //Already loaded so need to load select option id and value
    }
    else 
    {
        let passlengthoptions = document.getElementById("passlength");
        let passtypeoptiongroup0 = document.createElement("OPTGROUP");
        let passtypeoptiongroup1 = document.createElement("OPTGROUP");
        let passtypeoptiongroup2 = document.createElement("OPTGROUP");
        let passtypeoptiongroup3 = document.createElement("OPTGROUP");
        let passtypeoptiongroup4 = document.createElement("OPTGROUP");
        let passtypeoptiongroup5 = document.createElement("OPTGROUP");
        for(i=0;i<password_length_range.length;i++)
        {  
            let option = document.createElement("option");
            option.id = password_length_range[i];
            option.text = password_length_range[i];
            passlengthoptions.add(option);
            if(password_length_range[i]=="Select One")
            {
                passtypeoptiongroup0.setAttribute("label", passlengthoptgrpname[0]);
                passtypeoptiongroup0.appendChild(passlengthoptions[i]);  
                passlengthoptions.appendChild(passtypeoptiongroup0);
            }
            else if(password_length_range[i]<12)
            {
                passtypeoptiongroup1.setAttribute("label", passlengthoptgrpname[1]);
                passtypeoptiongroup1.appendChild(passlengthoptions[i]);  
                passlengthoptions.appendChild(passtypeoptiongroup1);
                    
            }
            else if(password_length_range[i]<16)
            {
                passtypeoptiongroup2.setAttribute("label", passlengthoptgrpname[2]);
                passtypeoptiongroup2.appendChild(passlengthoptions[i]);  
                passlengthoptions.appendChild(passtypeoptiongroup2);
                    
            }
            else if(password_length_range[i]<20)
            {
                passtypeoptiongroup3.setAttribute("label", passlengthoptgrpname[3]);
                passtypeoptiongroup3.appendChild(passlengthoptions[i]);  
                passlengthoptions.appendChild(passtypeoptiongroup3);
            }
            else if(password_length_range[i]<102)
            {
                passtypeoptiongroup4.setAttribute("label", passlengthoptgrpname[4]);
                passtypeoptiongroup4.appendChild(passlengthoptions[i]);  
                passlengthoptions.appendChild(passtypeoptiongroup4);
                
                    
            }
            else 
            {
                passtypeoptiongroup5.setAttribute("label", passlengthoptgrpname[5]);
                passtypeoptiongroup5.appendChild(passlengthoptions[i]);  
                passlengthoptions.appendChild(passtypeoptiongroup5);
                                
            }
        }
        isLoadedSelectOption = true;   
    }  
}
function generate_password()
{  
    try
    {
        let passlengthoptions = document.getElementById("passlength");
        let r = passlengthoptions.selectedIndex;
        let numbers = document.getElementById("num");
        let symbols = document.getElementById("sys");
        let uppercase = document.getElementById("uppercase");
        let lowercase = document.getElementById("lowercase"); 
        let copypassword = document.getElementById("copypassword");
        let no;
        let sym;
        let up;
        let lp;
        let combinedpassword;
  
        if(passlengthoptions.options[r].id!="Select One" && (numbers.checked || symbols.checked || uppercase.checked || lowercase.checked ))
        {
         
                    clear_all_error_msg();
                    let randomgeneratedpassword="";
                    let randomgeneratedpasswordoutput = document.getElementById("randomgeneratedpasswordoutput");
                    let passwordLength = passlengthoptions.options[r].id;
                        
                    if(numbers.checked)
                    {
                        no = "01234567890";
                    }
                    else
                    {
                        no = "";
                    }
                    if(symbols.checked)
                    {
                        sym = "@!#$%^&*()*/~{}:'/.,?<>:{}+-?:[]?.,/.,';'][][=-=-*";
                    }
                    else
                    {
                        sym = "";
                    }
                    if(uppercase.checked)
                    {
                        up = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    }    
                    else
                    {
                        up = "";
                    }
                    if(lowercase.checked)
                    {
                        lp = "abcdefghijklmnopqrstuvwxyz";
                    }
                    else
                    {
                        lp = "";
                    }
                    combinedpassword = no + sym + up + lp;
                    for (i = 1; i <= passwordLength; ++i)
                    {
                        randomgeneratedpassword += combinedpassword.charAt(Math.floor(Math.random() * combinedpassword.length));
                    }
                    randomgeneratedpasswordoutput.value = randomgeneratedpassword;
                    randomgeneratedpassword = "";
                    combinedpassword = "";
                    if(copypassword.checked)
                    {
                        copy_password();
                    }
        
        
        }
        else
        {
            if(passlengthoptions.options[r].id==="Select One")
            {
                pass_error[0].style.display = "block";
                pass_err_msg [0].textContent = error_pass[0];
            }
            else
            {
                pass_error[0].style.display = "none";
                pass_err_msg [0].textContent = null;
            }
            if(!numbers.checked && !symbols.checked && !uppercase.checked && !lowercase.checked)
            {
                pass_error[1].style.display = "block";
                pass_err_msg [1].textContent = error_pass[1];
            }
            else
            {
                pass_error[1].style.display = "none";
                pass_err_msg [1].textContent = null;
            }
        }
        
    }   
    catch(error)
    {       
        pass_error[2].style.display = "block";
        pass_err_msg [2].textContent = error_pass[3];
        console.log(error);
    }

 
}
function copy_password()
{
 
    let randomgeneratedpasswordoutput = document.getElementById("randomgeneratedpasswordoutput");   
    if(randomgeneratedpasswordoutput.value.length==0)
    {
        pass_error[2].style.display = "block";
        pass_err_msg[2].textContent = error_pass[2];
    }
    else
    {
        randomgeneratedpasswordoutput.select();
        randomgeneratedpasswordoutput.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(randomgeneratedpasswordoutput.value);
      
    } 

}
function clear_all_error_msg()
{
    for(i=0;i<pass_error.length;i++)
    {
        if(pass_error[i].style.display==="block")
        {
            pass_error[i].style.display = "none";
            pass_err_msg[i].textContent = null;
        }       
    }
}
function clear_the_password_textbox()
{
    let randomgeneratedpasswordoutput = document.getElementById("randomgeneratedpasswordoutput");
    if(randomgeneratedpasswordoutput.value.length>0)
    {
        randomgeneratedpasswordoutput.value=null;
    }
}
function uncheck_all_passoption()
{
    let passoption = document.getElementsByClassName('passoption');
    for(var i=0;i<passoption.length;i++)
    {
        if(passoption[i].checked==true)
        {

            passoption[i].checked = false;
        }
     
    }
}
function reset_clear()
{ 
    let passlengthoptions = document.getElementById("passlength");
    passlengthoptions.selectedIndex=0;
    uncheck_all_passoption();
    clear_the_password_textbox();
    clear_all_error_msg();
}
function close_button(i)
{
    if(i==="one")
    {
        pass_error[0].style.display = "none";
        pass_err_msg[0].textContent = null;
    }
    else if(i==="two")
    {
        pass_error[1].style.display = "none";
        pass_err_msg[1].textContent = null;
    }
    else if(i==="three")
    {
        pass_error[2].style.display = "none";
        pass_err_msg[2].textContent = null;
    }
  
  
}
function revisiting_the_passgenranpage()
{

    clear_the_password_textbox();
    clear_all_error_msg();
}
