
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
else if(currentUrl === "/ipinfosearch")
    {
        pageId = "page5";
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
        case 'page5':
        {
    
            history.pushState(null,null,"/ipinfosearch");
         
            revisiting_the_ipinfosearch_search_page();
     
            break;
        }
       
    }
}
window.addEventListener('popstate', function(){
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
        case 'page5':    
        
                break;
        default:
            break;
    }
    addressBar(pageId);
}
