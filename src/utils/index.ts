const { validationResult } = require('express-validator');

export const validateRequest = (req): { error: Array<string>; message: string; isError: boolean; } => {
    const result = { error: [], message: '', isError: false };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        result.error = errors.array();
        result.message = 'Wrong request data';
        result.isError = true;
    }
    return result;
};

