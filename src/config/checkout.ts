export const CURRENCY_SYMBOL = '₹';

export const SHIPPING_FREE_THRESHOLD = 999; // Free shipping above this subtotal
export const SHIPPING_FEE = 79; // Standard shipping fee

export const GST_RATE = 0.18; // 18% GST

export const COD_ENABLED = true;
export const COD_FEE = 49; // COD service fee

export type WalletProvider = 'PhonePe' | 'Paytm' | 'Google Pay';
export const WALLET_PROVIDERS: WalletProvider[] = ['PhonePe', 'Paytm', 'Google Pay'];

export const NETBANKING_BANKS = [
  'HDFC Bank',
  'ICICI Bank',
  'State Bank of India',
  'Axis Bank',
  'Kotak Mahindra Bank'
];

export const DEFAULT_COUNTRY = 'IN';



