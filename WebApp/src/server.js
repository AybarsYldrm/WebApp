'use strict';    

import { networkInterfaces } from 'os';
import { createServer } from 'http';
import { gatewayController } from './controller/gateway/gatewayController.js';
import { port, version } from '../applicationUtil.js';

var date = new Date().toISOString();
var address, ifaces = networkInterfaces();

for (var dev in ifaces) {
    ifaces[dev].filter(function(details) { details.family === 'IPv4' && details.internal === false ? address = details.address : undefined });
}

createServer(function(request, response) {
   gatewayController(request, response);
}).listen(port, function() { console.log(`\x1b[36m[${date}] \x1b[37mserver is run \x1b[32m${address}:${port} \x1b[33m${version}v`) });