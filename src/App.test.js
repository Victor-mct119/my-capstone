import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App profile settings', () => {
  test('allows users to update profile information', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Ava Chen' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'ava@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/bio/i), {
      target: { value: 'Product designer and traveler.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save profile/i }));

    expect(screen.getByText(/profile updated successfully/i)).toBeInTheDocument();
    expect(screen.getByText(/ava chen/i)).toBeInTheDocument();
  });
});
