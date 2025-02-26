"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const errors_1 = require("../types/errors");
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body);
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return next(errors_1.AppError.validation(error.errors));
        }
        return next(error);
    }
};
exports.validate = validate;
