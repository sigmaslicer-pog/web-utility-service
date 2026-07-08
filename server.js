const express = require('express');
const corsAnywhere = require('cors-anywhere');
const app = express();
const PORT = process.env.PORT || 8080;

// Create the proxy server core
const proxyServer = corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [],
    removeHeaders: [
        'cookie',
        'cookie2',
        'x-frame-options',
        'content-security-policy',
        'frame-options'
    ]
});

// Handle proxy requests
app.all('/proxy/:url*', (req, res) => {
    // Extract the destination URL from the parameters
    const targetUrl = req.params.url + req.params[0];
    
    // Forward to the proxy handler
    req.url = '/' + targetUrl;
    proxyServer.emit('request', req, res);
});

app.listen(PORT, () => {
    console.log(`Proxy core active on port ${PORT}`);
});
