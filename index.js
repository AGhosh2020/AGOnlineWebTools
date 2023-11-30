const express = require('express');
const path = require('path');
const app = express();
const requestIP = require('request-ip');
const maxmind = require('maxmind');
const whoiser = require('whoiser');
const port = process.env.PORT || 5000;
app.use(express.json());
app.get('/ipdata', async (req, res) => {
      try {
       
        const ipAddress = requestIP.getClientIp(req);
        const geolite2 = await import('geolite2-redist');
        const reader = await geolite2.open(
            'GeoLite2-City',
            (dbPath) => maxmind.open(dbPath)
        );

        const response = reader.get(ipAddress);
        reader.close();
        const ipData = {
              ipaddress : ipAddress,
              country: response.country.names.en,
              city: response.city.names.en,
              postalCode: response.postal.code,
              timezone: response.location.time_zone,
              lat: response.location.latitude,
              lon: response.location.longitude
      
        }
        res.json(ipData);

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});
app.post('/search-whois', async(req, res) => {
  try {
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
    if(error.message.includes("Empty Search Field Error"))
    {
      res.status(400 ).json({ error: 'Empty Search Field Error' });
    }
    else
    {
      res.status(500).json({ error: 'Internal Server Error' });
    }
   
}
});
   
app.use(express.static(path.join(__dirname, 'public')));

const allowedRoutes = ['/home', '/ipsysinfo', '/whois', '/randompasswordgenerator'];

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
