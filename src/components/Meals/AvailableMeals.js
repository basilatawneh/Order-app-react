import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
    const [mealsData, setMealsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const res = await fetch(
                'https://orders-ada3e-default-rtdb.firebaseio.com/meals.json'
            );
            const resData = await res.json();
            const mealsData = [];
            if (!res.ok) {
                console.log("SDFS")
                throw new Error("There is an Error !!");
            }
            for (let key in resData) {
                mealsData.push({
                    id: key,
                    name: resData[key].name,
                    description: resData[key].description,
                    price: resData[key].price
                })
            }
            setIsLoading(false)
            setMealsData(mealsData);
        }
        fetchMeals().catch(error => {
            console.log(error);
            setIsLoading(true);
            setHttpError(error.message);
        });
    }, []);

    const mealsList = mealsData.map(meal => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            price={meal.price}
            description={meal.description}
        />));
    if (httpError) {
        return <div className={classes.httpError}>
            {httpError}
        </div>
    }
    return (
        <>
            {isLoading ?
                <div className={classes.loadingMessage}> Loading...</div > :
                <section className={classes.meals}>
                    <Card>
                        <ul>
                            {mealsList}
                        </ul>
                    </Card>
                </section>
            }
        </>

    )

};

export default AvailableMeals