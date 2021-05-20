import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import axios from './Axios';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from './CheckoutProduct';
import './payment.css'
import { getBasketTotal } from './Reducer';
import { useStateValue } from './StateProvider'
import { useHistory } from 'react-router';
import { db } from './Firebase';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate the special stripe secret when ever the items in basket change.
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
            console.log('the secret is >>>>>>', response.data.clientSecret)

        }
        getClientSecret();
    }, [basket])

    console.log('the secret is >>>', clientSecret)

    const handleSubmit = async (event) => {
        //do all the stripe stuff.
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent = payment confirmation.

            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id) //order id
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created //timestamp when order was created
                })



            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace('/orders')
        })
    }
    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");

    }
    return (
        <div className='payment'>
            <div className="payment__container">
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>1225 S Pecan St</p>
                        <p>Arlington, TX</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (

                            <CheckoutProduct id={item.id} price={item.price} image={item.image} title={item.title} rating={item.rating} />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} // Part of the homework
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
