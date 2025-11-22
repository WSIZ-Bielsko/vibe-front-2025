'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextInput, PasswordInput, Button, Container, Title, Alert } from '@mantine/core';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [passphrase, setPassphrase] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, passphrase }),
        });

        if (response.ok) {
            router.push('/bmi');
        } else {
            setError('Invalid username or passphrase');
        }
    };

    return (
        <Container size="xs" mt={50}>
            <Title order={1} mb={20}>Login</Title>

            <form onSubmit={handleLogin}>
                <TextInput
                    label="Username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    mb={15}
                />

                <PasswordInput
                    label="Passphrase"
                    placeholder="Enter passphrase"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    required
                    mb={20}
                />

                {error && (
                    <Alert color="red" mb={15}>
                        {error}
                    </Alert>
                )}

                <Button type="submit" fullWidth>
                    Login
                </Button>
            </form>
        </Container>
    );
}
