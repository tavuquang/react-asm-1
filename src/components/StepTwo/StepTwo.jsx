import { Button, Select, Form } from 'antd';

import classes from './StepTwo.module.css';
import dataDishes from '../../data/dishes.json';

export const StepTwo = ({ onSaveData, onPrevious, onNext, data }) => {
    const { dishes } = dataDishes;

    const { mealSelected } = data;
    // console.log(mealSelected);
    const availableRestaurants = [];

    dishes.forEach(dish => {
        if (dish.availableMeals.includes(mealSelected) && !availableRestaurants.includes(dish.restaurant)) {
            availableRestaurants.push(dish.restaurant);
        }
    });

    const restaurants = availableRestaurants.map(restaurant => ({
        value: restaurant,
        label: restaurant
    }));

    const onFinish = (e) => {
        onSaveData(e);
        onNext();
    }

    return (
        <div className={classes.container}>
            <Form onFinish={onFinish}>
                <div className={classes.wrapFormControl}>
                    <div className={classes.formControl}>
                        <p>Please Select a Restaurant</p>
                        <Form.Item name="restaurantSelected"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Select
                                placeholder='---'
                                style={{ width: 150 }}
                                options={restaurants}
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className={classes.button}>
                    <Button onClick={() => { onPrevious() }}>Previous</Button>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Next</Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}