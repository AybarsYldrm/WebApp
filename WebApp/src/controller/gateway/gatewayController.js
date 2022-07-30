'use strict';

import { FireWall } from "./gatewayShell.js";
import { tokenApi } from "./api/tokenApi.js";

export function gatewayController(request, response) {
    var remoteIp = request.headers['X-Forwarded-For'] || request.connection.remoteAddress;
    remoteIp = remoteIp.toString().replace('::ffff:', '');
    var remotePort = request.headers['x-forwarded-for'] || request.connection.remotePort;
    var date = new Date().toISOString();
    var fireWall = new FireWall(remoteIp);

    try {
        if (fireWall.blockList(response) !== false) {
            console.log(`\x1b[36m[${date}] \x1b[31mforriben \x1b[32m${remoteIp}:${remotePort} \x1b[37mtried to login`);
        }
        else {
            tokenApi(request, response);
        }
    }
    catch (error) {
        throw new Error('Gateway Error', { cause: error });
    }
};