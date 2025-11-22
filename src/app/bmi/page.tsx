'use client';

import {useState} from 'react';
import {NumberInput, Button, Container, Title, Text, Slider} from '@mantine/core';

export default function BMIPage() {
    const [weight, setWeight] = useState<number | string>('');
    const [height, setHeight] = useState<number | string>('');
    const [bmi, setBmi] = useState<number | null>(null);

    const calculateBMI = () => {
        if (typeof weight === 'number' && typeof height === 'number' && height > 0) {
            const bmiValue = weight / ((height / 100) ** 2);
            setBmi(Number(bmiValue.toFixed(2)));
        }
    };

    const getBMICategory = (bmiValue: number): string => {
        if (bmiValue < 18.5) return 'Underweight';
        if (bmiValue < 25) return 'Normal';
        if (bmiValue < 30) return 'Overweight';
        return 'Obese';
    };

    const bmiMarks = [
        {value: 15, label: '15'},
        {value: 18.5, label: '18.5'},
        {value: 25, label: '25'},
        {value: 30, label: '30'},
        {value: 35, label: '35'},
        {value: 40, label: '40'},
    ];

    return (
        <Container size="xs" mt={50}>
            <Title order={1} mb={20}>BMI Calculator</Title>

            <NumberInput
                label="Weight (kg)"
                placeholder="Enter weight"
                value={weight}
                onChange={setWeight}
                mb={15}
            />

            <NumberInput
                label="Height (cm)"
                placeholder="Enter height"
                value={height}
                onChange={setHeight}
                mb={20}
            />

            <Button onClick={calculateBMI} fullWidth>
                Calculate BMI
            </Button>

            {bmi !== null && (
                <>
                    <Text size="xl" mt={20} fw={700}>
                        Your BMI: {bmi} ({getBMICategory(bmi)})
                    </Text>

                    <Slider
                        mt={30}
                        mb={10}
                        value={Math.min(Math.max(bmi, 15), 40)}
                        min={15}
                        max={40}
                        step={0.1}
                        marks={bmiMarks}
                        disabled
                        color={
                            bmi < 17 ? 'grape' :          // Severe thinness
                                bmi < 18.5 ? 'blue' :         // Underweight
                                    bmi < 25 ? 'green' :          // Normal weight
                                        bmi < 30 ? 'yellow' :         // Overweight
                                            bmi < 35 ? 'orange' :         // Obesity Class I
                                                bmi < 40 ? 'red' :            // Obesity Class II
                                                    bmi < 45 ? 'pink' :           // Obesity Class III (40-44.9)
                                                        'dark'                         // Extreme Obesity (≥45)
                        }
                        label={(val) => val.toFixed(1)}
                    />
                </>
            )}
        </Container>
    );
}
