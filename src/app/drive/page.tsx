'use client';

import { Title, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';

const checkDriveStatus = async (): Promise<boolean> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRIVE_API_URL}/status`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.ok;
};

export default function DrivePage() {
    const { refetch } = useQuery({
        queryKey: ['driveStatus'],
        queryFn: checkDriveStatus,
        enabled: false,
    });

    const handleCheckStatus = async () => {
        const result = await refetch();

        if (result.isSuccess && result.data) {
            notifications.show({
                message: 'drive available',
                color: 'green',
                position: 'top-right',
            });
        } else {
            notifications.show({
                message: 'drive temporarily down',
                color: 'red',
                position: 'top-right',
            });
        }
    };

    return (
        <div>
            <Title order={1}>Drive</Title>
            <Button onClick={handleCheckStatus} mt="md">
                Check Drive Status
            </Button>
        </div>
    );
}
