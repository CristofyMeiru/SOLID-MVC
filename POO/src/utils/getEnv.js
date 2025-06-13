"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortEnv = void 0;
var getPortEnv = function () { return Number(process.env.PORT) || 3333; };
exports.getPortEnv = getPortEnv;
