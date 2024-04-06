import { Button } from 'antd';

import classes from './Review.module.css';

export const Review = ({ onPrevious, data }) => {

    const onClick = () => {
        console.log(data);
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <p>Meal: </p>
                <p>{data.mealSelected}</p>
            </div>
            <div className={classes.content}>
                <p>No. of. People: </p>
                <p>{data.peopleQuantity}</p>
            </div>
            <div className={classes.content}>
                <p>Restaurant: </p>
                <p>{data.restaurantSelected}</p>
            </div>
            <div className={classes.content}>
                <p>Dishes: </p>
                <ul>
                    {data.dishes.map((dish, i) => (
                        <li key={i}>{dish.dish} - {dish.quantity}</li>
                    ))}
                </ul>
            </div>

            <div className={classes.button}>
                <Button onClick={() => { onPrevious() }}>Previous</Button>
                <Button type="primary" onClick={onClick}>Submit</Button>
            </div>
        </div>
    )
}