import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    orderItems: {
        type: []
    },
    orderDate: {
        type: Date,
        default: new Date().toLocaleDateString()
    }
},{timestamps: true})

export const Order = mongoose.model("Order", orderSchema);