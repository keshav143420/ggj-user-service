"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRouter = void 0;
const express_1 = require("express");
const createUserRouter = (userController) => {
    const router = (0, express_1.Router)();
    router.post('/users', (req, res) => userController.createUser(req, res));
    return router;
};
exports.createUserRouter = createUserRouter;
//# sourceMappingURL=UserRoutes.js.map