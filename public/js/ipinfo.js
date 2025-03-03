

async function getIP() 
{
    let need = document.getElementById("need");
    let infoip = document.getElementsByClassName("infoip");
    response = fetch("/ipdata")
    .then(response => response.json())
    .then(data => {
        document.getElementsByClassName('pleasewait')[0].style.display = 'none';
        need.style.display = 'block';
        var infodisplay = [data.ipaddress, data.country, data.city, data.postalCode, data.timezone, data.lat, data.lon];
        for(i=0;i<infoip.length;i++)
        {
            

            if(infodisplay[i]==undefined)
            {
                infoip[i].textContent = "Not Available";
               
            }
            else
            {
                infoip[i].textContent = infodisplay[i];
            }
        }
    })
    .catch(error => {
        document.getElementsByClassName('pleasewait')[0].style.display = 'none';
        need.style.display = 'block';
        for(i=0;i<infoip.length;i++)
        {
          
            infoip[i].textContent = "Not Available";


        }
        console.error(error);
   
    });
}
function getSysInfo()
{

    let sysinfo = document.getElementsByClassName("sysinfo");
    
    let browserInfo = getBrowserInfo();

    let OSplatform = getPlatformInfo();
   
    let BrowserArchitecture = BrowserArchitureInfo();





    let sysinfotouser = [navigator.userAgent, browserInfo.browser,navigator.language,window.innerWidth + " X " + window.innerHeight,BrowserArchitecture.Arch,OSplatform.platform];
    
    for(i=0;i<sysinfo.length;i++)
    {
            if(sysinfotouser[i]==undefined || sysinfotouser[i]==null || sysinfotouser=="")
            {
                sysinfo[i].textContent = "Not Available";
            }
            else
            {
                sysinfo[i].textContent = sysinfotouser[i];
            }

    }
   

    
   
}
function BrowserArchitureInfo()
{
    let userAgent = navigator.userAgent.toLowerCase();
    if(userAgent.includes("linux i686") || userAgent.includes("x86") || userAgent.includes("i686") || userAgent.includes("win32") || userAgent.includes("wow64") || userAgent.includes("i386"))
    {
        if(userAgent.includes("x86_64"))
        {
            return{Arch: "x64"}

        }
        else
        {
            return{Arch: "x86"}
        }
     
    }
    else  if( userAgent.includes("amd64") || userAgent.includes("x64") || userAgent.includes("win64") || userAgent.includes("x86_64") || userAgent.includes("intel mac os x"))
    {
        return{Arch: "x64"}
    }
    else  if(userAgent.includes("aarch64") || userAgent.includes("armv7l") || userAgent.includes("arm") ||  userAgent.includes("ARM")  || userAgent.includes("android") || userAgent.includes("iphone") || userAgent.includes())
    {
        return{Arch: "ARM"}
    }
    else  if(userAgent.includes("ppc"))
    {
        return{Arch: "PowerPC"}
    }
    else  if(userAgent.includes("sparc64"))
    {
        return{Arch: "SPARC64 V"}
    }
    else if(userAgent.includes("9x") || userAgent.includes("win98") || userAgent.includes("nt 3.1") || userAgent.includes("nt 3.5") || userAgent.includes("nt 3.51") || userAgent.includes("nt 4.0") || userAgent.includes("nt 5.0") || userAgent.includes("nt 5.1"))
    {
        return{Arch: "x86"}
    } 
    else
    {
        return{Arch: "Not Available"}
    }
}
function getBrowserInfo()
{
        //Check it is a brave web browser or not
        if (navigator.brave) 
        {
            return {browser: "Brave"}
        }
        else
        {
            let userAgent = navigator.userAgent.toLowerCase();
    
            //<!--- Firefox & Firefox based browser --->
            if(userAgent.includes("rv") && userAgent.includes("gecko") && userAgent.includes("firefox"))
            {
                //It's apply to Firefox Desktop and Android
                return {browser: "Mozilla Firefox"}
            }
            
            else if(userAgent.includes("khtml") && userAgent.includes("gecko") && userAgent.includes("fxios"))
            {
                //It's apply to Firefox on Apple iPhone, iPad and iPod
                return {  browser: "Mozilla Firefox"}
            }
            //<!--- Firefox --->

            //<!-- Chrome and Chromium based browsers -->
            else if(userAgent.includes("khtml") && userAgent.includes("gecko") && userAgent.includes("chrome"))
            {   
            
                if(userAgent.includes("edg"))
                {  
                    //It's apply to Microsoft Edge Desktop 
                    return {  browser: "Microsoft Edge"}
                }
                else if(userAgent.includes("edga"))
                {
                    //It's apply to Microsoft Edge Android 
                    return {  browser: "Microsoft Edge"}
                }
                //OPiOS
                else if(userAgent.includes("opr"))
                {
                    //It's apply to Opera in Desktop and Android
                    return {  browser: "Opera"}
                }
                else if(userAgent.includes("vivaldi"))
                {
                    //It's apply to Opera in Desktop and Android
                    return {  browser: "Vivaldi"}
                }
                else if(userAgent.includes("samsung"))
                {
                    //It's apply to Opera in Desktop and Android
                    return {  browser: "Samsung Internet Browser"}
                }
        
                else
                {   
                    //It's apply to Chrome in Desktop and Android also other chromium based browsers.
                    return {  browser: "Google Chrome"}
            
                }
            }
            else if(userAgent.includes("gecko") && userAgent.includes("crios"))
            {
                //It's apply to Chrome in Apple iPhone, iPad and iPod
                return {  browser: "Google Chrome"}
            }
            else if(userAgent.includes("gecko") && userAgent.includes("edgios"))
            {
                //It's apply to Microsoft Edge in Apple iPhone, iPad and iPod
                return {  browser: "Microsoft Edge"}
            }
            //<!--- Chrome and Chromium based browsers  -->
            
            
            //<!--- Safari -->
            else if(userAgent.includes("khtml") && userAgent.includes("gecko") && userAgent.includes("safari"))
            {
                return {  browser: "Safari"}
            }
            //<!-- Safari -->
        

            else
            {
                return {  browser: "Not Available"}

            }
        }
        
        
}
function getPlatformInfo()
{
        let userAgent = navigator.userAgent.toLowerCase();
        if(userAgent.includes("windows"))
        {
            if(userAgent.includes("xbox"))
            {
                return {  platform: "Xbox" };

            }
            else if(userAgent.includes("9x") || userAgent.includes("win98"))
            {
                return {  platform: "Windows 9x" };

            }
            else if(userAgent.includes("nt 3.1"))
            {
                return {  platform: "Windows NT 3.1" };

            }
            else if(userAgent.includes("nt 3.5"))
            {
                return {  platform: "Windows NT 3.5" };

            }
            else if(userAgent.includes("nt 3.51"))
            {
                return {  platform: "Windows NT 3.51" };

            }
            else if(userAgent.includes("nt 4.0"))
            {
                return {  platform: "Windows NT 4.0" };

            }
            else if(userAgent.includes("nt 5.0"))
            {
                return {  platform: "Windows 2000" };

            }
            else if(userAgent.includes("nt 5.1"))
            {
                return {  platform: "Windows XP" };

            }
            else if(userAgent.includes("nt 5.2"))
            {
                return {  platform: "Windows Server 2003/Windows XP x64" };

            }
            else if(userAgent.includes("nt 6.0"))
            {
                return {  platform: "Windows Vista" };

            }
            else if(userAgent.includes("nt 6.1"))
            {
                return {  platform: "Windows 7" };

            }
            else if(userAgent.includes("nt 6.2"))
            {
                return {  platform: "Windows 8" };

            }
            else if(userAgent.includes("nt 6.3"))
            {
                return {  platform: "Windows 8.1" };

            }
            else if(userAgent.includes("nt 10.0"))
            {
           

               
                    return { platform : "Windows 10 or later"}
                }
        
                
                        
            
        
                
        }
        else if(userAgent.includes("linux") || userAgent.includes("android"))
        {
            if(userAgent.includes("android"))
            {
                return {  platform: "Android" };
            }
            else
            {
                return {  platform: "Linux" };
            }
              
            
        }
      
        else if(userAgent.includes("mac") && userAgent.includes("os") && userAgent.includes("x"))
        {
         
            if(userAgent.includes("iphone") || userAgent.includes("ipod"))
            {
                return {  platform: "iOS" };
    
            }
            else if(userAgent.includes("ipad"))
            {
                return {  platform: "iPadOS" };
    
            }
            else if(userAgent.includes("macintosh;"))
            {
                return {  platform: "macOS" };
            }
          
           
        }
       
        else if(userAgent.includes("freebsd"))
        {
            return {  platform: "FreeBSD" };

        }
        else if(userAgent.includes("openbsd"))
        {
            return {  platform: "OpenBSD" };

        }
        else if(userAgent.includes("netbsd"))
        {
            return {  platform: "NetBSD" };

        }
        else if(userAgent.includes("cros"))
        {
            return {  platform: "Chrome OS" };

        }
        else if(userAgent.includes("playstation"))
        {
            return {  platform: "PlayStation" };

        }
       else
       {
        return {  platform: "Not Available" };

       }
        
}
