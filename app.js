const express = require('express');
const geoip = require('geoip-lite');
const axios = require('axios');

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const ipList = forwarded.split(',');
    return ipList[ipList.length - 1];
  }
  return req.connection.remoteAddress;
};

const app = express();

app.get('/', async (req, res) => {
  const userIp = getClientIp(req);

  try {
    const response = await axios.get(`https://ipinfo.io/${userIp}/json?token=19ddd5f80d1757`);
    const { loc } = response.data;

    if (loc) {
      const [latitude, longitude] = loc.split(',').map(parseFloat);
      console.log('User IP:', userIp);
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
      res.json({ latitude, longitude });
    } else {
      console.error('Location information not found.');
      res.status(404).json({ error: 'Location not found for the given IP' });
    }
  } catch (error) {
    console.error('Error fetching location:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
