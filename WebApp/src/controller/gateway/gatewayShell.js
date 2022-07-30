'use strict';

import whiteList from './whiteList.json' assert { type: 'json' };

export default class GatewayShell {
    constructor(url, method) {
        this.url = url;
        this.method = method;
    }

    get(request, response, task) {
        try {
            if (this.url !== request.url) {
                response.writeHead(404, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ statusCode: 404, message: 'page not found' }));
            }
            else if ((this.method && request.method) !== 'GET') {
                response.writeHead(405, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ statusCode: 405, message: 'method not allowed' }));
            }
            else {
                response.writeHead(200, { 'Content-Type': 'application/json' })
                response.end(task);
            }
        }
        catch (error) {
            throw new Error('GatewayShell Error', { cause: error });
        }
    };
};

export class FireWall {
    constructor(remoteIp) {
        this.remoteIp = remoteIp;
    }

    blockList(response) {
        try {
            if (whiteList.includes(this.remoteIp) === false) {
                response.writeHead(403, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ statusCode: 403, message: 'forbidden' }));
              }
              else {
                return false;
              }
        }
        catch (error) {
            throw new Error('FireWall Error', { cause: error });
        }
    };
};