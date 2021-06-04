import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51ItCjpGRgyOQYvOkJX6YCsMK9CT10ylRYPnPfIlYuBMr6aKFeElHCIYFCpKn9iuodeEhMT2nLfmJXTklDCC1a3t100GE0vqluZ'

    const onToken = token => {
        axios({ 
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment Successful')
        }).catch (error => {
            console.log('payment error: ', JSON.parse(error));
            alert(
                'There was an issue with your payment. Please make sure you use the provided credit card'
            );
        });
    };

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Crwn Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton