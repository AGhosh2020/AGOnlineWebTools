let whois_errorMsg = ["Please enter domain name or IP in the input search field ","It seems this domain name or IP doesn't exist", "Couldn't complete this task due to a network error. Please try again later or at another time."];        
async function send_fetch_data_whois()
{
    let whoislookupsearch = document.getElementById('whoislookupsearch').value;
    let wait = document.getElementById('wait');
    let dataneed = document.getElementsByClassName("dataneed");
    let whoisdata = document.getElementById("whoisdata");
    let whoisdatafor = document.getElementById("whoisdatafor");
    let error_whoisdata= document.getElementsByClassName("error_whoisdata");
    let error_whois_search_messageText = document.getElementById("error_whois_search_messageText");
 
        if(dataneed[0].style.display==="block")
        {
            whoisdata.textContent =  null;
            whoisdatafor.textContent = null;
            dataneed[0].style.display = "none";
        }
        else if(error_whoisdata[0].style.display==="block")
        {
            error_whoisdata[0].style.display="none";
            
           
            error_whois_search_messageText.textContent = null;
        }
        if(whoislookupsearch.length===0)
        {
            error_whoisdata[0].style.display="block";
            error_whois_search_messageText.textContent = whois_errorMsg[0];
        }
        else
        {
            try 
            {
                wait.style.display = 'block';
                const response = await fetch('/search-whois', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ whoislookupsearch }),
                });
            
                const data = await response.json();
                if (response.ok) {
                    let whoisdatajson = JSON.stringify(data, null, 2);
                    wait.style.display = 'none';
                    dataneed[0].style.display = 'block';
                    whoisdatafor.textContent = whoislookupsearch;
                    whoisdata.textContent = whoisdatajson;
                }
                else if(response.status === 400)
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
                error_whoisdata[0].style.display="block";
                if(error.message.includes("Empty Search Field Error"))
                {
                    error_whois_search_messageText.textContent = whois_errorMsg[0];
                }
                else if (error.message.includes('Internal Server Error')) 
                {
                    error_whois_search_messageText.textContent = whois_errorMsg[1];
                } 
                else 
                {
                    error_whois_search_messageText.textContent = whois_errorMsg[2];
                }
            }
       
        }
       
}

function buttonclose()
{   
    let error_whoisdata= document.getElementsByClassName("error_whoisdata");
    let dataneed = document.getElementsByClassName("dataneed");
    let whoisdata = document.getElementById("whoisdata");
    let whoisdatafor = document.getElementById("whoisdatafor");
    if( error_whoisdata[0].style.display==="block")
    {
        error_whoisdata[0].style.display = "none";
        error_whois_search_messageText.textContent =  null;
    }
    else if(dataneed[0].style.display==="block")
    {
        dataneed[0].style.display="none";
        whoisdatafor.textContent = null;
        whoisdata.textContent =  null;
    }
   

}
function revisiting_the_whois_search_page()
{  
    let whoislookupsearch = document.getElementById('whoislookupsearch');
    let wait = document.getElementById('wait');
    if(whoislookupsearch.value.length>0)
    {
        whoislookupsearch.value = null;
    } 
    if(wait.style.display==="block")
    {
        wait.style.display = "none";
    }
    buttonclose();
}
function handleformSubmission()
{

    document.getElementById('whoisSearchDomain').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        send_fetch_data_whois();
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
  document.getElementById("whoislookupsearch").addEventListener("keydown", submitOnEnter);
}