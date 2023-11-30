
let pageId;
let currentUrl = window.location.pathname;
if(currentUrl === "/home")
{
    pageId = "page1";
}
else if(currentUrl === "/ipsysinfo")
{
    pageId = "page2";
}
else if(currentUrl === "/whois")
{
    pageId = "page3";
}
else if(currentUrl === "/randompasswordgenerator")
{
    pageId = "page4";
}
else 
{
    pageId= "page1";
}
showPage(pageId);

function showPage(pageId) 
{
    var pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.classList.remove('active');
    });
    var selectedPage = document.getElementById(pageId);
    selectedPage.classList.add('active');

    initPage(pageId);
   

}

function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
} 
function addressBar(pageId)
{
    window.scrollTo(0,0); 
    switch(pageId)
    {
        case 'page1':
        {
                history.pushState(null,null,"/home");
                break;
        }
        case 'page2':
        {      
                history.pushState(null,null,"/ipsysinfo");
                getSysInfo();
                getIP();
                break;
        }
        case 'page3':
        {
                history.pushState(null,null,"/whois");
                revisiting_the_whois_search_page();
                break;
        }
      
        case 'page4':
        {

                    history.pushState(null,null,"/randompasswordgenerator");
                    revisiting_the_passgenranpage();
                    password_length();
                    break;
        }
        default:
        {
                history.pushState(null,null,"/404NotFound");
                break;
        }
    }
}
function updateContent(pageId) 
{
   
}
window.addEventListener('popstate', function(event){
        updateContent(document.location.pathname);
});
function initPage(pageId) 
{
    switch (pageId) 
    {
        case 'page1':
   
  
            break;
        case 'page2':
            
            break;
        case 'page3':
        
            break;
        case 'page4':    
    
            break;
        default:
            break;
    }
    addressBar(pageId);
}
