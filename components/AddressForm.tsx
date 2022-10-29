import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from '../styles/AddressForm.module.css'

function AddressForm(props: { handler: (address: string) => void }) {

  const [values, setValues] = useState({
    address: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.handler(values.address)
  };

  const handleAddressInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((values) => ({
      ...values,
      address: event.target.value,
    }));
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="bg-gradient-to-bl from-[#9945FF]/80 to-[#14F195]/80 w-5/6 p-[2px] rounded-xl mx-auto">
        <input
          id="public-key"
          className="bg-black/70 focus:bg-black text-white font-semibold text-opacity-100 w-full px-5 rounded-xl py-3"
          type="text"
          placeholder="Public Address, e.g. 7C4jsPZpht42Tw6MjXWF56Q5RQUocjBBmciEjDa8HRtp"
          name="firstName"
          value={values.address}
          onChange={handleAddressInputChange}
        />
        </div>
        <br />
        <div className="bg-gradient-to-tr from-[#9945FF]/80 to-[#14F195]/80 w-2/6 mb-10 p-[2px] rounded-xl mx-auto">
        <button type="submit" className="px-5 py-3 w-full rounded-xl font-semibold text-opacity-100 bg-black/80">
          Check SOL Balance
        </button>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;