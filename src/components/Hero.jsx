import { useState, useEffect } from 'react';
import { Chart } from 'react-charts';

import supabase from '../data/supabase-client.js';
import Form from './Form.jsx';

const Hero = () => {

    const [metrics, setMetrics] = useState([]);

    const fetchMetrics = async () => {
        try {
            const { data, error } = await supabase
                .from('sales_deals')
                .select(
                    `name, value.sum()`,
                );

            if (error) throw error;
            setMetrics(data);
        } catch (error) {
            console.error('Fetching data from supabase', error);
        }
    };

    useEffect(() => {
        fetchMetrics();

        const channel = supabase
            .channel('deal-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'sales_deals'
                },
                (payload) => {
                    fetchMetrics();
                })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    console.log(metrics);

    const chartData = [
        {
            data: metrics.map((metric) => (
                {
                    primary: metric.name,
                    secondary: metric.sum,
                }
            ))
        }
    ];

    const y_max = () => {
        if (metrics.length > 0) {
            const maxSum = Math.max(...metrics.map((m) => m.sum));
            return maxSum + 2000;
        }
        return 5000;
    };

    const primaryAxis = {
        getValue: (d) => d.primary,
        scaleType: 'band',
        padding: 0.2,
        position: 'bottom',
    };

    const secondaryAxes = [
        {
            getValue: (d) => d.secondary,
            scaleType: 'linear',
            min: 0,
            max: y_max(),
            padding: {
                top: 20,
                bottom: 40,
            },
        },
    ];

    return (
        <section className="w-full p-10">
            <div className="container-card space-y-5">
                <h1 className="text-center font-bold text-xl">User sales data</h1>

                <div className='chart-container'>
                    <Chart
                        options={{
                            data: chartData,
                            primaryAxis,
                            secondaryAxes,
                            type: 'bar',
                            color: 'text-black',
                            defaultColors: ['#58d675'],
                            tooltip: {
                                show: false,
                            },
                        }}
                    />
                </div>

                <Form metrics={metrics} />
            </div>
        </section>
    );
};

export default Hero;