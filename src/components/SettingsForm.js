import { useState } from 'react';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const initialErrors = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SettingsForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: '' }));
    }

    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validate = () => {
    const nextErrors = { ...initialErrors };

    if (!values.firstName.trim()) {
      nextErrors.firstName = 'First name is required.';
    }

    if (!values.lastName.trim()) {
      nextErrors.lastName = 'Last name is required.';
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    const passwordPattern = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!values.password) {
      nextErrors.password = 'Password is required.';
    } else if (!passwordPattern.test(values.password)) {
      nextErrors.password = 'Password must be at least 8 characters and include at least one number and one special character.';
    }

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      setSuccessMessage('');
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setSuccessMessage('Settings saved successfully.');
    setValues(initialValues);
    setErrors(initialErrors);
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'grid', gap: '1rem' }}>
      <h1 style={{ margin: 0 }}>Settings</h1>

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <div>
          <label htmlFor="firstName" style={{ display: 'block', marginBottom: '0.25rem' }}>First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: errors.firstName ? '1px solid #dc2626' : '1px solid #cbd5e1' }}
          />
          {errors.firstName ? <div id="firstName-error" role="alert" style={{ color: '#dc2626', marginTop: '0.25rem' }}>{errors.firstName}</div> : null}
        </div>

        <div>
          <label htmlFor="lastName" style={{ display: 'block', marginBottom: '0.25rem' }}>Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: errors.lastName ? '1px solid #dc2626' : '1px solid #cbd5e1' }}
          />
          {errors.lastName ? <div id="lastName-error" role="alert" style={{ color: '#dc2626', marginTop: '0.25rem' }}>{errors.lastName}</div> : null}
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.25rem' }}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: errors.email ? '1px solid #dc2626' : '1px solid #cbd5e1' }}
          />
          {errors.email ? <div id="email-error" role="alert" style={{ color: '#dc2626', marginTop: '0.25rem' }}>{errors.email}</div> : null}
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.25rem' }}>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: errors.password ? '1px solid #dc2626' : '1px solid #cbd5e1' }}
          />
          {errors.password ? <div id="password-error" role="alert" style={{ color: '#dc2626', marginTop: '0.25rem' }}>{errors.password}</div> : null}
        </div>

        <div>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.25rem' }}>Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: errors.confirmPassword ? '1px solid #dc2626' : '1px solid #cbd5e1' }}
          />
          {errors.confirmPassword ? <div id="confirmPassword-error" role="alert" style={{ color: '#dc2626', marginTop: '0.25rem' }}>{errors.confirmPassword}</div> : null}
        </div>
      </div>

      {successMessage ? <div role="status" style={{ color: '#15803d' }}>{successMessage}</div> : null}

      <button type="submit" disabled={isSubmitting} style={{ padding: '0.75rem 1rem', borderRadius: '4px', border: 'none', background: isSubmitting ? '#94a3b8' : '#2563eb', color: '#fff', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
        {isSubmitting ? 'Saving…' : 'Save Settings'}
      </button>
    </form>
  );
}

export default SettingsForm;
