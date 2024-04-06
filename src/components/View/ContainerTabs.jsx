import { Tabs } from 'antd';
import { useState } from 'react';
import { StepOne } from '../StepOne/StepOne';
import { StepTwo } from '../StepTwo/StepTwo';
import { StepThree } from '../StepThree/StepThree';
import { Review } from '../Review/Review';

export const ContainerTabs = () => {
    const [valuesInput, setValuesInput] = useState({
        mealSelected: '',
        peopleQuantity: 1,
        restaurantSelected: '',
        dishes: []
    });
    const [step, setStep] = useState(1);

    const handleNextButton = () => {
        if (step < 4) {
            setStep(step + 1);
        }
    }

    const handlePreviousButton = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    const handleInputValues = (values) => {
        setValuesInput(pre => ({ ...pre, ...values }))
    }

    const arrayTabs = [
        {
            key: 1,
            label: 'Step 1',
            view: <StepOne onNext={handleNextButton} onSaveData={handleInputValues} />
        },
        {
            key: 2,
            label: 'Step 2',
            view: <StepTwo onNext={handleNextButton} onPrevious={handlePreviousButton} onSaveData={handleInputValues} data={valuesInput} />
        },
        {
            key: 3,
            label: 'Step 3',
            view: <StepThree onNext={handleNextButton} onPrevious={handlePreviousButton} onSaveData={handleInputValues} data={valuesInput} />
        },
        {
            key: 4,
            label: 'Review',
            view: <Review onPrevious={handlePreviousButton} data={valuesInput} />
        }
    ];

    return (
        <Tabs
            activeKey={step}
            centered
            items={arrayTabs.map((item) => {
                return {
                    label: `${item.label}`,
                    key: item.key,
                    children: item.view,
                    disabled: true
                };
            })}
        />
    );
};