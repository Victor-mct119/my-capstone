import React, { useState } from 'react';

function App() {
  const [profile, setProfile] = useState({
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    bio: 'Building thoughtful products and learning every day.',
  });
  const [savedMessage, setSavedMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((currentProfile) => ({ ...currentProfile, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSavedMessage('Profile updated successfully.');
  };

  return (
    <div style={{ maxWidth: '640px', margin: '3rem auto', padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Settings</h1>
      <p style={{ color: '#4b5563' }}>Update your public profile information below.</p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <label style={{ display: 'grid', gap: '0.35rem' }}>
          <span>Name</span>
          <input aria-label="Name" name="name" value={profile.name} onChange={handleChange} />
        </label>

        <label style={{ display: 'grid', gap: '0.35rem' }}>
          <span>Email</span>
          <input aria-label="Email" name="email" type="email" value={profile.email} onChange={handleChange} />
        </label>

        <label style={{ display: 'grid', gap: '0.35rem' }}>
          <span>Bio</span>
          <textarea aria-label="Bio" name="bio" rows="4" value={profile.bio} onChange={handleChange} />
        </label>

        <button type="submit" style={{ padding: '0.75rem 1rem', cursor: 'pointer' }}>
          Save Profile
        </button>
      </form>

      {savedMessage ? <p style={{ marginTop: '1rem', color: '#15803d' }}>{savedMessage}</p> : null}

      <section style={{ marginTop: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Preview</h2>
        <p><strong>{profile.name}</strong></p>
        <p>{profile.email}</p>
        <p>{profile.bio}</p>
      </section>
    </div>
  );
}

export default App;
