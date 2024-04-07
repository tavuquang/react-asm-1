import { useState } from 'react';

import { Select, InputNumber, Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import classes from './StepThree.module.css';
import dataDishes from '../../data/dishes.json';

export const StepThree = ({ onSaveData, onPrevious, onNext, data }) => {
    const { dishes } = dataDishes;
    const { mealSelected, restaurantSelected } = data;
    const nameDishes = [];
    const [list, setList] = useState([]);
    const [values, setValues] = useState({
        dish: '',
        quantity: 1
    });
    const [total, setTotal] = useState(0);
    const [showTotalNoti, setShowTotalNoti] = useState(false);

    dishes.forEach(dish => {
        if (dish.restaurant === restaurantSelected && dish.availableMeals.includes(mealSelected)
            && !nameDishes.includes(dish.name)) {
            nameDishes.push(dish.name);
        }
    });

    const selectDish = nameDishes.map(nameDish => ({
        value: nameDish,
        label: nameDish
    }));

    const onChangeSelect = (e) => {
        setValues(pre => ({ ...pre, dish: e }));
    }

    const onChangeQuantity = (e) => {
        setValues(pre => ({ ...pre, quantity: +e }));
    }

    const onAdd = () => {
        if (total + values.quantity <= 10 && !list.includes(values.dish)) {
            if (values.dish !== '') {

                setList(pre => ([...pre, values]));
            }
            setTotal(total + values.quantity);
            setShowTotalNoti(false);
        } else {
            setTotal(pre => pre);
            setShowTotalNoti(true);
        }
    }

    const onFinish = (e) => {
        onSaveData({ dishes: list });
        onNext();
    }

    return (
        <div className={classes.container}>
            <Form onFinish={onFinish}>
                <div className={classes.wrapFormControl}>
                    <div className={classes.wrap}>
                        <div className={classes.formControl}>
                            <p>Please Select a Dish</p>
                            <Form.Item name="dishSelected"
                                rules={[{ required: true, message: 'Please input!' }]}
                            >
                                <Select
                                    placeholder='---'
                                    style={{ width: 150 }}
                                    options={selectDish}
                                    onChange={onChangeSelect}
                                />
                            </Form.Item>
                        </div>

                        <div className={classes.formControl}>
                            <p>Please Enter no. of servings</p>
                            <Form.Item name="dishesQuantity">
                                <InputNumber min={1} max={10} defaultValue={1} onChange={onChangeQuantity} />
                            </Form.Item>
                        </div>
                    </div>

                    <ul>
                        {list.length !== 0 && list.map((item, i) => (
                            <li className={classes.item} key={i}>
                                <p>Dish: {item.dish}</p>
                                <p>Quantity: {item.quantity}</p>
                            </li>
                        ))}
                    </ul>

                    {showTotalNoti && (
                        <p className={classes.numberNotification}>Can't select the same dish twice and the total number of dishes should be greater or equal to the number of people, a maximum of 10 is allowed.</p>
                    )}

                    <div className={classes.icon}>
                        <Button type="primary" shape="circle" icon={<PlusOutlined />} disabled={false} onClick={onAdd} />
                    </div>
                </div>

                <div className={classes.button}>
                    <Button onClick={() => { onPrevious() }}>Previous</Button>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={total < data.peopleQuantity}>Next</Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}