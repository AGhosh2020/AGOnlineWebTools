const express = require('express');
const path = require('path');
const app = express();
const requestIP = require('request-ip');
const axios = require('axios');
const whoiser = require('whoiser');
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;
dotenv.config();
app.use(express.json());
app.get('/ipdata', async (req, res) => 
{
      try 
      {
        const ipAddress = requestIP.getClientIp(req);
        const response = await axios.post(`https://ipinfo.io/${ipAddress}?token=${process.env.IP_INFO_API_KEY}`);
        res.json(response.data);
      } 
      catch (error) 
      {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});
app.post('/search-whois', async(req, res) => {
  try 
  {
    const { whoislookupsearch } = req.body;
    if(whoislookupsearch.length==0)
    {
      throw new Error('Empty Search Field Error');
    }
    else
    {
      let whoisinfo = await whoiser(whoislookupsearch);
      res.json(whoisinfo);
    }
   
} catch (error) {
    
    console.error('Error processing data:', error);
    if(error.message.includes("Please enter domain name or IP in the input search field"))
    {
      res.status(400 ).json({ error: 'Empty Search Field Error' });
    }
    else
    {
      res.status(500).json({ error: 'Internal Server Error' });
    }
   
}
});
app.post('/ip-info-search', async(req, res) => 
{
  const { ipaddresssearch } =  req.body;
  const ipAddress = ipaddresssearch;
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
  if(!ipaddresssearch)
  {
       return res.status(400).json({error :"Please enter IP address in the input search field"});
  }
  if (!isValidIP(ipaddresssearch)) 
  {
      return res.status(400).json({ error: 'Invalid IP address format' });
  }
  if(isPrivateIP(ipaddresssearch)) 
  {
    return res.status(400).json({ error: 'It is a private IP address'});
  }
  try 
  {
        const response = await axios.get(`https://ipinfo.io/${ipAddress}?token=${process.env.IP_INFO_API_KEY}`);
        res.json(response.data);
  } 
  catch (error) 
  {
      console.error('Error occurred:', error);
      res.status(500).json({ error: error.message });
  }
});
app.use(express.static(path.join(__dirname, 'public')));

const allowedRoutes = ['/home', '/ipsysinfo', '/whois', '/randompasswordgenerator', '/ipinfosearch'];

app.get(allowedRoutes, (req, res) => {

  res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

app.get('*', (req, res) => {
  // Redirect to the custom 404 page
  res.status(404).redirect('/404NotFound.html');
});

 app.get('/404NotFound', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404NotFound.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);


});

   