const crypto = require("crypto"); 
const RazorPay = require("razorpay");


class RazorpayPaymentService { 
    constructor() {
        this._instance = new RazorPay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });
    }
 
    async getPaymentInfo(paymentId) {
        return await this._instance.payments.fetch(paymentId);
    }

    async createOrder(amount, user) {
        let receipt = `${user.name}_${Date.now()}`;
        receipt = receipt.length > 40 ? receipt.slice(0, 39) : receipt;
        let orderParams = {
            amount: amount * 100, 
            currency: "INR",
            payment_capture: true,
            // receipt: uuid.v5(),
            receipt,
        };

        const order = await this._instance.orders.create(orderParams);

        return {
            receipt: order.receipt,
            orderId: order.id,
            status: order.status,
        };
    }

    async verifyPayment(orderId, paymentId, signature) {
        // const expectedSignature = crypto
        //     .createHmac("sha256", process.env.KEY_SECRET)
        //     .update(`${orderId}|${paymentId}`)
        //     .digest("hex");

        let body = `${orderId}|${paymentId}`;
        
        const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");

      console.log(expectedSignature ,signature)
        if (expectedSignature === signature) {
            return true;
        }
        return false;
    }

  
    async transferViaPayment(paymentId, amount, account){
        await this._instance.payments.transfer(paymentId, {
        transfers: [
            { 
            amount,
            account,
            currency: "INR"
            }
        ]
            
        })
    }


  
    
} 

module.exports = RazorpayPaymentService;
