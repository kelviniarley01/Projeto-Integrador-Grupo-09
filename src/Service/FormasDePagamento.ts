import Stripe from 'stripe';
import { Transaction, PaymentData } from '../types';
import config from '../config';

class PaymentService {
  private stripeClient: Stripe;

  constructor() {
    this.stripeClient = new Stripe(config.stripe.secretKey, {
      apiVersion: '2022-11-15',
    });
  }

  public async processPayment(paymentData: PaymentData): Promise<Transaction> {
    const { amount, currency, source } = paymentData;

    try {
      const charge = await this.stripeClient.charges.create({
        amount,
        currency,
        source,
      });

      return {
        id: charge.id,
        amount: charge.amount,
        currency: charge.currency,
        status: charge.status,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Payment processing failed: ${message}`);
    }
  }
}

export default new PaymentService();
