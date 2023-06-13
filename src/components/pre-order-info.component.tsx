const ContactInfo = () => {
  return (
    <div className="contact-information basis-[47.5%]">
      <h4 className="text-lg mb-4">Pre-order Information</h4>
      <form action="">
        <div className="mb-4">
          <label htmlFor="fullname" className="text-black/[.5] text-xs">
            Full name
          </label>
          <input
            type="text"
            className="w-full rounded-md"
            name="fullname"
            placeholder="Full name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone-number" className="text-black/[.5] text-xs">
            Phone number
          </label>
          <input
            type="text"
            className="w-full rounded-md"
            name="phone-number"
            placeholder="Phone number"
          />
        </div>
        <fieldset className="flex justify-between items-center">
          <legend className="mb-3">Please select your day of rental:</legend>
          <div>
            <input
              className="appearance-none checked:bg-gray-300 mr-2"
              type="radio"
              name=""
              id="one-day"
            />
            <label htmlFor="one-day">1 day</label>
          </div>
          <div>
            <input
              className="appearance-none checked:bg-gray-300 mr-2"
              type="radio"
              name=""
              id="three-day"
            />
            <label htmlFor="three-day">3 days</label>
          </div>
          <div>
            <input
              className="appearance-none checked:bg-gray-300 mr-2"
              type="radio"
              name=""
              id="seven-days"
            />
            <label htmlFor="seven-days">7 days</label>
          </div>
          <div>
            <input
              className="appearance-none checked:bg-gray-300 mr-2"
              type="radio"
              name=""
              id="fourteen-days"
            />
            <label htmlFor="fourteen-days">14 days</label>
          </div>
          <div>
            <input
              className="appearance-none checked:bg-gray-300 mr-2"
              type="radio"
              name=""
              id="thirty-days"
            />
            <label htmlFor="thirty-days">30 days</label>
          </div>
          <div>
            <input
              className="appearance-none checked:bg-gray-300 mr-2"
              type="radio"
              name=""
              id="sixty-days"
            />
            <label htmlFor="sixty-days">60 days</label>
          </div>
        </fieldset>
        <button
          className="rounded-md bg-blue-500 text-white px-6 py-2 transition duration-500 hover:bg-indigo-500 w-full mt-5"
          type="submit"
        >
          Confirm order
        </button>
      </form>
    </div>
  );
};

export default ContactInfo;
