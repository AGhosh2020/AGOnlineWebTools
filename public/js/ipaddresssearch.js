async function send_fetch_data_ipaddresssearch()
{
    let ipaddsearcherror_errorMsg = ["Please enter IP address in the input search field","Invalid IP address format", "It is a private IP address", "Couldn't complete this task due to a network error. Please try again later or at another time."];     
    let ipaddresssearch = document.getElementById("ipaddresssearch").value;
    let wait = document.getElementById('wait1');
    let ipaddressdivcenter = document.getElementsByClassName("ipaddressdivcenter");
    let ipaddsearchinformation = document.getElementsByClassName("ipaddsearchinformation");
    let ipaddressinfo = document.getElementsByClassName("ipaddressinfo");
    let error_ipaddsearch= document.getElementsByClassName("error_ipaddsearch");
    let error_ipaddsearch_messageText = document.getElementById("error_ipaddsearch_messageText");
    if(ipaddsearchinformation[0].style.display==="block")
    {
            ipaddressdivcenter[0].style.display = "none";
            ipaddsearchinformation[0].style.display = "none";
    }
    if(error_ipaddsearch[0].style.display==="block")
    {
                error_ipaddsearch[0].style.display = "none";
                error_ipaddsearch_messageText.textContent = null;
    }
    if(ipaddresssearch.length===0)
    {
        error_ipaddsearch[0].style.display="block";
        error_ipaddsearch_messageText.textContent = ipaddsearcherror_errorMsg[0];
    }
    else if (!isValidIP(ipaddresssearch)) 
    {
        error_ipaddsearch[0].style.display = "block";
        error_ipaddsearch_messageText.textContent = ipaddsearcherror_errorMsg[1];
 
    }
    else if (isPrivateIP(ipaddresssearch)) 
    {
        error_ipaddsearch[0].style.display = "block";
        error_ipaddsearch_messageText.textContent = ipaddsearcherror_errorMsg[2];
    }
    else
    {
        try
         {
           wait.style.display = 'block';
            const response = await fetch('/ip-info-search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ipaddresssearch }),
            });
            const data = await response.json();
            if (response.ok) 
            {
                let ipaddressinfofetch = [data.ip, data.org, data.hostname, data.city, data.region, data.country, data.loc, data.postal, data.timezone];
                wait.style.display = 'none';
                ipaddressdivcenter[0].style.display = 'block';
                ipaddsearchinformation[0].style.display = 'block';
        
               
                for (let i = 0; i < ipaddressinfo.length; i++) 
                {
                    if (ipaddressinfofetch[i] === undefined) 
                    {
                        ipaddressinfo[i].textContent = "Not Available";
                    } 
                    else 
                    {
                        ipaddressinfo[i].textContent = ipaddressinfofetch[i];
                    }
                }
            } 
            else if (response.status === 400) 
            {
                throw new Error('Empty Search Field Error');
            } 
            else if (response.status === 500) 
            {
                throw new Error('Internal Server Error. Please try again later.');
            } 
            else 
            {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
        } 
        catch (error) 
        {

            console.error(error.message);
            wait.style.display = 'none';
            error_ipaddsearch[0].style.display = "block";
            error_ipaddsearch_messageText.textContent = ipaddsearcherror_errorMsg[3];
        }
        
    }
}
function buttonclose_one()
{   
   
    let error_ipaddsearch= document.getElementsByClassName("error_ipaddsearch");
    let error_ipaddsearch_messageText = document.getElementById("error_ipaddsearch_messageText");
    let ipaddressdivcenter = document.getElementsByClassName("ipaddressdivcenter");
    let ipaddsearchinformation = document.getElementsByClassName("ipaddsearchinformation");
    let ipaddressinfo = document.getElementsByClassName("ipaddressinfo");
    if( error_ipaddsearch[0].style.display==="block")
    {
        error_ipaddsearch[0].style.display = "none";
        error_ipaddsearch_messageText.textContent =  null;
    }
    else if(ipaddsearchinformation[0].style.display==="block")
    {
        ipaddressdivcenter[0].style.display = "none";
        ipaddsearchinformation[0].style.display="none";
        for(i=0;i<ipaddressinfo.length;i++)
        {
            ipaddressinfo[i].textContent = null;
        }
    }
}
function revisiting_the_ipinfosearch_search_page()
{
    let ipaddresssearch = document.getElementById("ipaddresssearch");
    let wait = document.getElementById('wait1');
    if(ipaddresssearch.value.length>0)
    {
        ipaddresssearch.value = null;
    }
    if(wait.style.display==="block")
    {
        wait.style.display = "none";
    }
    buttonclose_one();
}
function isValidIP(ipaddress) 
{

    const ipv46_regex = /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$)/gm;  

    return  ipv46_regex.test(ipaddress);
}
function isPrivateIP(ipaddress) 
{
    const privateIPv4Regex = /^(10\.\d+\.\d+\.\d+)$|^(192\.168\.\d+\.\d+)$|^(172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)$|^(127\.\d+\.\d+\.\d+)$|^(169\.254\.\d+\.\d+)$/;
    const privateIPv6Regex = /^(::1|fe80::|fc00::)/i;
    return privateIPv4Regex.test(ipaddress) || privateIPv6Regex.test(ipaddress);
}
function handleformSubmission()
{
    document.getElementById('ipsearch').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            send_fetch_data_ipaddresssearch();
        });
            function submitOnEnter(event) {
            if (event.which === 13) {
                if (!event.repeat) {
                    const newEvent = new Event("submit", {cancelable: true});
                    event.target.form.dispatchEvent(newEvent);
                    event.target.form.focus(newEvent);


                }

                event.preventDefault(); 
            }
        }
      document.getElementById("ipaddresssearch").addEventListener("keydown", submitOnEnter);
}