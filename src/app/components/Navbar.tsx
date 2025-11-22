'use client';

import { Group, Burger, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkSession } from '../api/actions';

export function Navbar() {
    const [opened, { toggle }] = useDisclosure();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        checkSession().then(setIsLoggedIn);
    }, [pathname]);

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        setIsLoggedIn(false);
        router.push('/login');
        router.refresh();
    };

    if (!isLoggedIn) return null;

    return (
        <Group h="100%" px="md" justify="space-between">
            <div>BMI Calculator</div>
            <Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Button
                    variant="subtle"
                    size="sm"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Group>
        </Group>
    );
}
