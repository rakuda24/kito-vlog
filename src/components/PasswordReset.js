// PasswordReset.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Button, Container, Form, Alert } from 'react-bootstrap';


const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('パスワードリセットメールを送信しました。メールをご確認ください。');
      setError('');
    } catch (error) {
      setMessage('');
      setError('エラーが発生しました。メールアドレスを確認してください。');
      console.error('Password reset error:', error.message);
    }
  };

  return (
    <Container className="mt-5">
      <h3 className="text-center">パスワードリセット</h3>
      <Form onSubmit={handlePasswordReset} className="mt-4">
        <Form.Group controlId="formEmail">
          <Form.Label>メールアドレス</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 w-100">
          リセットメールを送信
        </Button>
      </Form>
      {message && <Alert variant="success" className="mt-3">{message}</Alert>}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Container>
  );
};

export default PasswordReset;
