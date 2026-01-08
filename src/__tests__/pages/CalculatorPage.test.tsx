import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommissionCalculator from '@/app/calculator/page';

describe('CommissionCalculator', () => {
  it('renders the calculator with initial values', () => {
    render(<CommissionCalculator />);
    
    expect(screen.getByLabelText(/Transaction Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Merchant Tier/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Payment Method/i)).toBeInTheDocument();
    expect(screen.getByText(/Calculation Breakdown/i)).toBeInTheDocument();
  });

  it('calculates the commission correctly on initial load', () => {
    render(<CommissionCalculator />);
    
    // Initial state: amount=100, tier=standard, payment=card
    // Percentage Commission: 1.5%, Base Commission: ₦50.00
    // Commission Fee: (1.5 / 100) * 100 + 50 = 1.5 + 50 = 51.50
    // Amount Merchant Earns: 100 - 51.50 = 48.50
    
    expect(screen.getByText('1.5%')).toBeInTheDocument();
    expect(screen.getByText('₦50.00')).toBeInTheDocument();
    expect(screen.getByText('₦51.50')).toBeInTheDocument();
    expect(screen.getByText('₦48.50')).toBeInTheDocument();
  });

  it('shows an error message for transaction amount less than 100', () => {
    render(<CommissionCalculator />);
    const amountInput = screen.getByLabelText(/Transaction Amount/i);
    
    fireEvent.change(amountInput, { target: { value: '99' } });
    
    expect(screen.getByText('Transaction amount must be at least ₦100.')).toBeInTheDocument();
  });

  it('shows an error message when amount exceeds capAmount', () => {
    render(<CommissionCalculator />);
    
    // Switch to a tier/method with a cap
    const tierSelect = screen.getByLabelText(/Merchant Tier/i);
    fireEvent.change(tierSelect, { target: { value: 'standard' } });
    
    const paymentMethodSelect = screen.getByLabelText(/Payment Method/i);
    fireEvent.change(paymentMethodSelect, { target: { value: 'wallet' } });
    
    // Wallet cap for Standard is 1000
    const amountInput = screen.getByLabelText(/Transaction Amount/i);
    fireEvent.change(amountInput, { target: { value: '1001' } });
    
    expect(screen.getByText('Amount for this payment method cannot exceed ₦1000.')).toBeInTheDocument();
  });

  it('recalculates when the merchant tier is changed', () => {
    render(<CommissionCalculator />);
    const amountInput = screen.getByLabelText(/Transaction Amount/i);
    fireEvent.change(amountInput, { target: { value: '1000' } });

    const tierSelect = screen.getByLabelText(/Merchant Tier/i);
    fireEvent.change(tierSelect, { target: { value: 'gold' } });
    
    // Gold tier, Card payment method for 1000
    // Percentage Commission: 1.1%, Base Commission: ₦40.00
    // Commission Fee: (1.1 / 100) * 1000 + 40 = 11 + 40 = 51.00
    // Amount Merchant Earns: 1000 - 51.00 = 949.00

    expect(screen.getByText('1.1%')).toBeInTheDocument();
    expect(screen.getByText('₦40.00')).toBeInTheDocument();
    expect(screen.getByText('₦51.00')).toBeInTheDocument();
    expect(screen.getByText('₦949.00')).toBeInTheDocument();
  });

  it('recalculates when the payment method is changed', () => {
    render(<CommissionCalculator />);
    const amountInput = screen.getByLabelText(/Transaction Amount/i);
    fireEvent.change(amountInput, { target: { value: '1000' } });

    const paymentMethodSelect = screen.getByLabelText(/Payment Method/i);
    fireEvent.change(paymentMethodSelect, { target: { value: 'bankTransfer' } });
    
    // Standard tier, Bank Transfer for 1000
    // Percentage Commission: 1.0%, Base Commission: ₦30.00
    // Commission Fee: (1.0 / 100) * 1000 + 30 = 10 + 30 = 40.00
    // Amount Merchant Earns: 1000 - 40.00 = 960.00

    expect(screen.getByText('1.0%')).toBeInTheDocument();
    expect(screen.getByText('₦30.00')).toBeInTheDocument();
    expect(screen.getByText('₦40.00')).toBeInTheDocument();
    expect(screen.getByText('₦960.00')).toBeInTheDocument();
  });
});
