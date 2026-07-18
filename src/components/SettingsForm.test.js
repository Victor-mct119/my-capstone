import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SettingsForm from './SettingsForm';

describe('SettingsForm', () => {
  it('submits successfully with valid data', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/first name/i), 'Ada');
    await user.type(screen.getByLabelText(/last name/i), 'Lovelace');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await user.type(screen.getByLabelText(/^password/i), 'P@ssword1');
    await user.type(screen.getByLabelText(/confirm password/i), 'P@ssword1');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(await screen.findByText(/settings saved successfully/i)).toBeInTheDocument();
  });

  it('shows an error when the email format is invalid', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/first name/i), 'Ada');
    await user.type(screen.getByLabelText(/last name/i), 'Lovelace');
    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/^password/i), 'P@ssword1');
    await user.type(screen.getByLabelText(/confirm password/i), 'P@ssword1');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows an error when the password is too short', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/first name/i), 'Ada');
    await user.type(screen.getByLabelText(/last name/i), 'Lovelace');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await user.type(screen.getByLabelText(/^password/i), 'Ab1!');
    await user.type(screen.getByLabelText(/confirm password/i), 'Ab1!');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(screen.getByText(/password must be at least 8 characters and include at least one number and one special character/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows an error when the password lacks a number', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/first name/i), 'Ada');
    await user.type(screen.getByLabelText(/last name/i), 'Lovelace');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await user.type(screen.getByLabelText(/^password/i), 'Password!');
    await user.type(screen.getByLabelText(/confirm password/i), 'Password!');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(screen.getByText(/password must be at least 8 characters and include at least one number and one special character/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows an error when the password lacks a special character', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/first name/i), 'Ada');
    await user.type(screen.getByLabelText(/last name/i), 'Lovelace');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await user.type(screen.getByLabelText(/^password/i), 'Password1');
    await user.type(screen.getByLabelText(/confirm password/i), 'Password1');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(screen.getByText(/password must be at least 8 characters and include at least one number and one special character/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows an error when confirm password does not match', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/first name/i), 'Ada');
    await user.type(screen.getByLabelText(/last name/i), 'Lovelace');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await user.type(screen.getByLabelText(/^password/i), 'P@ssword1');
    await user.type(screen.getByLabelText(/confirm password/i), 'P@ssword2');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables the submit button while the request is pending', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/first name/i), 'Ada');
    await user.type(screen.getByLabelText(/last name/i), 'Lovelace');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await user.type(screen.getByLabelText(/^password/i), 'P@ssword1');
    await user.type(screen.getByLabelText(/confirm password/i), 'P@ssword1');

    const submitButton = screen.getByRole('button', { name: /save settings/i });
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(screen.getByText(/settings saved successfully/i)).toBeInTheDocument());
  });
});
