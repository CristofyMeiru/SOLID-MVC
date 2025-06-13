"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
var fastify_1 = require("fastify");
var Program = /** @class */ (function () {
    function Program(app) {
        this.app = app;
    }
    Program.build = function () {
        var app = (0, fastify_1.default)({ logger: true });
        return new Program(app);
    };
    Program.prototype.addGetRoute = function (path, handle) {
        this.app.get(path, handle);
    };
    Program.prototype.addPostRoute = function (path, handle) {
        this.app.post(path, handle);
    };
    Program.prototype.start = function (port) {
        var _this = this;
        this.app.listen({ port: port }).catch(function (err) {
            _this.app.log.error(err);
            process.exit(1);
        });
    };
    Program.prototype.printRoutes = function () {
        return this.app.printRoutes();
    };
    return Program;
}());
exports.Program = Program;
