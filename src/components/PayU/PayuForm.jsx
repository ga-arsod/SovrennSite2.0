import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PayUForm = () => {
  const paymentData = useSelector((state) => state.payment.data);
  const [hash, setHash] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  const fetchHash = async (paymentData) => {
    try {
      const response = await fetch(`https://api.sovrenn.com/payment/payu/create-hash/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          udf1: paymentData.udf1,
          udf2: paymentData.udf2,
          txnid: paymentData.txnid,
          amount: paymentData.amount,
          productinfo: paymentData.productinfo,
          firstname: paymentData.firstname,
          email: paymentData.email,

        }),
      });

      if (response.ok) {
        const data = await response.json();
        setHash(data.data.hash);
        setIsLoading(false);
      } else {
        console.error('Error fetching hash:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchHash(paymentData);
  }, [paymentData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      action="https://test.payu.in/_payment"
      method="POST"
    >
      <input name="key" type="hidden" placeholder='key' value={paymentData.key} />
      <input name="txnid" type="hidden" placeholder='text' value={paymentData.txnid} />
      <input name="productinfo" type="hidden" placeholder='productinfo' value={paymentData.productinfo} />
      <input name="amount" type="hidden" placeholder='amount' value={paymentData.amount} />
      <input name="email" type="hidden" value={paymentData.email} placeholder='email' />
      <input name="firstname" type="hidden" placeholder='firstname' value={paymentData.firstname} />
      <input name="lastname" type="hidden" placeholder='lastname' value={paymentData.lastname} />
      <input name="surl" id="surl" type="hidden" placeholder='surl' value={paymentData.surl} />
      <input name="furl" id='furl' type="hidden" placeholder='furl' value={paymentData.furl} />
      <input name="phone" type="hidden" placeholder='phone' value={paymentData.phone} />
      <input name="state" type="hidden" placeholder='state' value={paymentData.state} />
      <input name="udf1" type="hidden" placeholder='udf1' value={paymentData.udf1} />
      <input name="udf2" type="hidden" placeholder='udf2' value={paymentData.udf2} />
      <input type="hidden" name="hash" value={paymentData.hash} />

      <button type="submit">Pay Now</button>
    </form>
  );
};

export default PayUForm;
