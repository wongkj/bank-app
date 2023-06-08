"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = require("mongoose");
const accountSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Account must have a name']
    },
    balance: {
        type: Number,
        required: [true, 'Account must have a value']
    }
});
exports.Account = (0, mongoose_1.model)('Account', accountSchema);
