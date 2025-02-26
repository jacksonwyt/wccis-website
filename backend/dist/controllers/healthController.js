"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthStatus = void 0;
const getHealthStatus = (req, res) => {
    res.status(200).json({ status: 'Backend is healthy' });
};
exports.getHealthStatus = getHealthStatus;
