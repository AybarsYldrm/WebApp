'use strict';

import GatewayShell from "../gatewayShell.js";
import WebCrypto from "../../service/webCrypto.js";

const gatewayShell = new GatewayShell('/tokenApi', 'GET');
const webCrypto = new WebCrypto('Super Governor');

export function tokenApi(request, response) {
    var task = JSON.stringify({ token: webCrypto.encrypt('0ec2baccdedb228ee9a8d8d35d806654|f105064d0393d6ce005613e5a3175817') });
    gatewayShell.get(request, response, task);
};