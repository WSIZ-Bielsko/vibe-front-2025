'use client';

import '@mantine/core/styles.css';
import {ColorSchemeScript, MantineProvider, mantineHtmlProps, AppShell} from '@mantine/core';
import {Navbar} from './components/Navbar';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {checkSession} from './api/actions';

import '@mantine/notifications/styles.css';
import {Notifications} from "@mantine/notifications";

import {TanStackProvider} from './providers/TanStackProvider';


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        checkSession().then(setIsLoggedIn);
    }, [pathname]);

    return (
        <html lang="en" {...mantineHtmlProps}>
        <head>
            <ColorSchemeScript defaultColorScheme="dark"/>
        </head>
        <body>
        <MantineProvider defaultColorScheme="dark">
            <TanStackProvider>

                <Notifications/>

                <AppShell
                    header={{height: 60, collapsed: !isLoggedIn, offset: true}}
                    padding="md"
                >
                    <AppShell.Header>
                        <Navbar/>
                    </AppShell.Header>
                    <AppShell.Main>
                        {children}
                    </AppShell.Main>
                </AppShell>
            </TanStackProvider>
        </MantineProvider>
        </body>
        </html>
    );
}
