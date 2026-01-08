export interface PaymentMethodDetails {
  percentageCommission: number;
  baseCommission: number;
  capAmount: number | null;
}

export interface Tier {
  name: string;
  description: string;
  paymentMethods: {
    card: PaymentMethodDetails;
    bankTransfer: PaymentMethodDetails;
    ussd: PaymentMethodDetails;
    wallet: PaymentMethodDetails;
  };
}

export interface CommissionData {
  tiers: {
    standard: Tier;
    silver: Tier;
    gold: Tier;
    platinum: Tier;
  };
}

export const commissionData: CommissionData = {
  tiers: {
    standard: {
      name: "Standard",
      description: "For new merchants",
      paymentMethods: {
        card: {
          percentageCommission: 1.5,
          baseCommission: 50,
          capAmount: null,
        },
        bankTransfer: {
          percentageCommission: 1.0,
          baseCommission: 30,
          capAmount: 2000,
        },
        ussd: {
          percentageCommission: 0.8,
          baseCommission: 40,
          capAmount: null,
        },
        wallet: {
          percentageCommission: 0.5,
          baseCommission: 20,
          capAmount: 1000,
        },
      },
    },
    silver: {
      name: "Silver",
      description: "For merchants processing ₦5M+ monthly",
      paymentMethods: {
        card: {
          percentageCommission: 1.3,
          baseCommission: 50,
          capAmount: null,
        },
        bankTransfer: {
          percentageCommission: 0.8,
          baseCommission: 25,
          capAmount: 1500,
        },
        ussd: {
          percentageCommission: 0.6,
          baseCommission: 35,
          capAmount: null,
        },
        wallet: {
          percentageCommission: 0.4,
          baseCommission: 15,
          capAmount: 800,
        },
      },
    },
    gold: {
      name: "Gold",
      description: "For merchants processing ₦20M+ monthly",
      paymentMethods: {
        card: {
          percentageCommission: 1.1,
          baseCommission: 40,
          capAmount: null,
        },
        bankTransfer: {
          percentageCommission: 0.6,
          baseCommission: 20,
          capAmount: 1000,
        },
        ussd: {
          percentageCommission: 0.5,
          baseCommission: 30,
          capAmount: null,
        },
        wallet: {
          percentageCommission: 0.3,
          baseCommission: 10,
          capAmount: 500,
        },
      },
    },
    platinum: {
      name: "Platinum",
      description: "For enterprise merchants processing ₦100M+ monthly",
      paymentMethods: {
        card: {
          percentageCommission: 0.9,
          baseCommission: 30,
          capAmount: null,
        },
        bankTransfer: {
          percentageCommission: 0.4,
          baseCommission: 15,
          capAmount: 800,
        },
        ussd: {
          percentageCommission: 0.4,
          baseCommission: 25,
          capAmount: null,
        },
        wallet: {
          percentageCommission: 0.2,
          baseCommission: 10,
          capAmount: 300,
        },
      },
    },
  },
};