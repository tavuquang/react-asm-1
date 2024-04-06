import { Select, InputNumber, Button, Form } from 'antd';
import classes from './StepOne.module.css';

export const StepOne = ({ onSaveData, onNext }) => {
    const meals = [
        { value: 'breakfast', label: 'Breakfast' },
        { value: 'lunch', label: 'Lunch' },
        { value: 'dinner', label: 'Dinner' },
    ]

    const onFinish = (e) => {
        onSaveData(e);
        onNext();
    }

    return (
        <div className={classes.container}>
            <Form onFinish={onFinish}>
                <div className={classes.wrapFormControl}>
                    <div className={classes.formControl}>
                        <p>Please Select a meal</p>
                        <Form.Item name="mealSelected"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Select
                                placeholder='---'
                                style={{ width: 120 }}
                                options={meals}
                            />
                        </Form.Item>
                    </div>

                    <div className={classes.formControl}>
                        <p>Please Enter Number of people</p>
                        <Form.Item name="peopleQuantity"
                            rules={[{ required: true, message: 'Please input!' }]}>
                            <InputNumber min={1} max={10} defaultValue={1} />
                        </Form.Item>
                    </div>
                </div>

                <div className={classes.button}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Next</Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}