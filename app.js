const express = require('express');
const geoip = require('geoip-lite');

const app = express();

app.get('/', (req, res) => {
    // Get the user's IP address from the request
    const userIp = req.ip;

    // Use the geoip.lookup function to get location information
    const geo = geoip.lookup(userIp);

    // Check if the location information is available
    
    // Check if the location information is available
    if (geo) {
        console.log('User IP:', userIp);
        console.log('User Location:', geo);
        res.json(geo); // Send location information as JSON response
    } else {
        console.log('Location not found for the given IP.');
        res.status(404).json({ error: 'Location not found for the given IP' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
