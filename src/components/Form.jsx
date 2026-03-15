import { useActionState } from 'react';

import supabase from '../data/supabase-client.js';

const Form = ({ metrics }) => {

    const [error, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const newDeal = {
                name: formData.get('name'),
                value: formData.get('value'),
            };
            console.log(newDeal);
            const { error } = await supabase.from('sales_deals').insert(newDeal);
            if (error) {
                console.error('Error adding deal: ', error.message);
                return new Error('Failed to add deal');
            }

            return null;
        },
        null // Initial state
    );

    const generateOptions = () => {
        return metrics.map((metric) => (
            <option key={metric.name} value={metric.name}>
                {metric.name}
            </option>
        ));
    };

    return (
        <div className="add-form-container">
            <form
                action={submitAction}
                aria-label="Add new sales deal"
                aria-describedby="form-description"
                className="w-full flex justify-center gap-8 items-center"
            >
                <div id="form-description" className="sr-only">
                    Use this form to add a new sales deal. Select a sales rep and enter
                    the amount.
                </div>

                <label htmlFor="deal-name">
                    Name:
                    <select
                        id="deal-name"
                        name="name"
                        defaultValue={metrics?.[0]?.name || ''}
                        aria-required="true"
                        aria-invalid={error ? 'true' : 'false'}
                        disabled={isPending}
                    >
                        {generateOptions()}
                    </select>
                </label>

                <label htmlFor="deal-value">
                    Amount: $
                    <input
                        id="deal-value"
                        type="number"
                        name="value"
                        defaultValue={0}
                        className="w-15 outline-none p-1 border-b border-gray"
                        min="0"
                        step="10"
                        aria-required="true"
                        aria-invalid={error ? 'true' : 'false'}
                        aria-label="Deal amount in dollars"
                        disabled={isPending}
                    />
                </label>

                <button
                    className="bg-green-500 cursor-pointer px-3 py-1.5 rounded-lg text-white"
                    type="submit"
                    disabled={isPending}
                    aria-busy={isPending}
                >
                    {isPending ? 'Adding...' : "Add Deal"}
                </button>
            </form>

            {error && (
                <div role='alert' className="error-message">
                    {error.message}
                </div>
            )}
        </div>
    );
};

export default Form;
