'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  commissionData,
  Tier,
  PaymentMethodDetails,
} from '@/constant/commissionData';

type TierKey = keyof typeof commissionData.tiers;
type PaymentMethodKey = keyof Tier['paymentMethods'];

const CommissionCalculator = () => {
  const [amount, setAmount] = useState<number>(100);
  const [tier, setTier] = useState<TierKey>('standard');
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodKey>('card');

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setAmount(isNaN(value) ? 0 : value);
    },
    []
  );

  const handleTierChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTier(e.target.value as TierKey);
      // Reset payment method when tier changes, as available methods might differ in a real-world scenario
      // For this problem, they are the same, but this is good practice.
      const newTierData = commissionData.tiers[e.target.value as TierKey];
      const firstPaymentMethod = Object.keys(
        newTierData.paymentMethods
      )[0] as PaymentMethodKey;
      setPaymentMethod(firstPaymentMethod);
    },
    []
  );

  const handlePaymentMethodChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPaymentMethod(e.target.value as PaymentMethodKey);
    },
    []
  );

  const {
    percentageCommission,
    baseCommission,
    capAmount,
  }: PaymentMethodDetails = useMemo(() => {
    return commissionData.tiers[tier].paymentMethods[paymentMethod];
  }, [tier, paymentMethod]);

  const calculation = useMemo(() => {
    if (amount < 100) {
      return {
        error: 'Transaction amount must be at least ₦100.',
      };
    }
    if (capAmount !== null && amount > capAmount) {
      return {
        error: `Amount for this payment method cannot exceed ₦${capAmount}.`,
      };
    }

    const commissionFee =
      (percentageCommission / 100) * amount + baseCommission;
    const merchantEarnings = amount - commissionFee;

    return {
      commissionFee,
      merchantEarnings,
    };
  }, [amount, percentageCommission, baseCommission, capAmount]);

  const tierOptions = useMemo(
    () =>
      (Object.keys(commissionData.tiers) as TierKey[]).map((tierKey) => (
        <option key={tierKey} value={tierKey}>
          {commissionData.tiers[tierKey].name}
        </option>
      )),
    []
  );

  const paymentMethodOptions = useMemo(
    () =>
      (
        Object.keys(
          commissionData.tiers[tier].paymentMethods
        ) as PaymentMethodKey[]
      ).map((methodKey) => (
        <option key={methodKey} value={methodKey}>
          {methodKey.charAt(0).toUpperCase() +
            methodKey.slice(1).replace(/([A-Z])/g, ' $1')}
        </option>
      )),
    [tier]
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-gray-50">
      <div className="w-full max-w-4xl rounded-xl bg-white p-6 sm:p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Commission Calculator
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Input Section */}
          <div className="flex flex-col space-y-6">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-semibold text-gray-700"
              >
                Transaction Amount (₦)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter amount"
                min="100"
              />
            </div>

            <div>
              <label
                htmlFor="tier"
                className="block text-sm font-semibold text-gray-700"
              >
                Merchant Tier
              </label>
              <select
                id="tier"
                value={tier}
                onChange={handleTierChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {tierOptions}
              </select>
            </div>

            <div>
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-semibold text-gray-700"
              >
                Payment Method
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {paymentMethodOptions}
              </select>
            </div>
          </div>

          {/* Calculation Display */}
          <div className="flex flex-col justify-center rounded-lg bg-gray-100 p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Calculation Breakdown
            </h2>
            {'error' in calculation ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-center font-semibold text-red-500">
                  {calculation.error}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Percentage Commission:</span>
                  <span className="font-medium">{percentageCommission}%</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Base Commission:</span>
                  <span className="font-medium">
                    ₦{baseCommission.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Commission Fee:</span>
                  <span className="font-medium">
                    ₦{calculation.commissionFee?.toFixed(2) ?? '0.00'}
                  </span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Amount Merchant Earns:</span>
                  <span className="text-green-600">
                    ₦{calculation.merchantEarnings?.toFixed(2) ?? '0.00'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CommissionCalculator;