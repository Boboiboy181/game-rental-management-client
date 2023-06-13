const OrderSummary = () => {
  return (
    <div className="pre-order-summary basis-[47.5%]">
      <h4 className="text-xl mb-4">Order Summary</h4>
      <div className="bg-white border rounded-md overflow-hidden">
        <ul className="product-list">
          <li className="flex border-b p-6 justify-between">
            <div className="image-container w-1/6 rounded-md h-1/6">
              <img
                className="w-full h-full object-contain rounded-md"
                src="https://res.cloudinary.com/dmiznj9ec/image/upload/v1686103577/m3xctcwzf0s2eaidkjbh.png"
                alt="product-image"
              />
            </div>
            <div className="product-description basis-[90%] pl-6">
              <div className="flex justify-between">
                <p className="text-lg">FIFA 22</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
              <p className="text-black/[.5] text-[14px]">Genre: Sport</p>
              <p className="text-black/[.5] text-[14px]">Language: English</p>
              <div className="flex justify-between items-center mt-3">
                <p>30.000</p>
                <select name="" id="" className="rounded-md cursor-pointer">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
          </li>
          <li className="flex border-b p-6 justify-between">
            <div className="image-container w-1/6 rounded-md h-1/6">
              <img
                className="w-full h-full object-contain rounded-md"
                src="https://res.cloudinary.com/dmiznj9ec/image/upload/v1686103577/m3xctcwzf0s2eaidkjbh.png"
                alt="product-image"
              />
            </div>
            <div className="product-description basis-[90%] pl-6">
              <div className="flex justify-between">
                <p className="text-lg">FIFA 22</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
              <p className="text-black/[.5] text-[14px]">Genre: Sport</p>
              <p className="text-black/[.5] text-[14px]">Language: English</p>
              <div className="flex justify-between items-center mt-3">
                <p>30.000</p>
                <select name="" id="" className="rounded-md cursor-pointer">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
          </li>
        </ul>
        <div className="price p-6 border-b">
          <div className="flex items-center justify-between">
            <p className="text-black/[.7] text-sm">Subtotal</p>
            <p>600.00 VND</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-black/[.7] text-sm">Number of rental days</p>
            <p>7</p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-6 border-t">
            <p className="text-xl">Total</p>
            <p>420.000 VND</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
