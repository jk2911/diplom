import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react"

export function PaymentForm(){
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    // const handleSubmit = async (e:any)=>{
    //     e.preventDefault();

    //     const {error, paymentMethod} = await stripe.createPaymentMethod({
    //         type:"card", 
    //         card: elements.getElement(CardElement)
    //     })
    // }

    return(<div>

    </div>)
}