import * as React from 'react';

type RentalDayListComponentProps = {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RentalDayListComponent = ({
  onChangeHandler,
}: RentalDayListComponentProps) => {
  const activeOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // add class active on selected class
    const rentalDayOptions = document.querySelectorAll(
      '.rental-day-option',
    ) as NodeListOf<HTMLDivElement>;

    rentalDayOptions.forEach((option) => {
      option.classList.remove('active');
    });

    e.currentTarget.classList.add('active');
  };

  return (
    <fieldset className="flex justify-between items-center mt-5">
      <legend className="mb-3">Select your day of rental:</legend>
      <div
        className="rental-day-option border border-gray-200 rounded-md text-center cursor-pointer hover:bg-slate-200 active"
        onClick={activeOnClick}
      >
        <input
          className="rental-day-option-btn text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 invisible hidden"
          type="radio"
          name="numberOfRentalDays"
          id="one-day"
          value="ONE_DAY"
          onChange={onChangeHandler}
        />
        <label
          className="text-sm font-medium text-gray-900 dark:text-gray-300 text-center cursor-pointer w-ful h-full px-9 py-3 block"
          htmlFor="one-day"
        >
          1 day
        </label>
      </div>
      <div
        className="rental-day-option border border-gray-200 rounded-md text-center cursor-pointer hover:bg-slate-200"
        onClick={activeOnClick}
      >
        <input
          className="rental-day-option-btn text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 invisible hidden"
          type="radio"
          name="numberOfRentalDays"
          id="three-day"
          value="THREE_DAYS"
          onChange={onChangeHandler}
        />
        <label
          className="text-sm font-medium text-gray-900 dark:text-gray-300 text-center cursor-pointer w-ful h-full px-9 py-3 block"
          htmlFor="three-day"
        >
          3 days
        </label>
      </div>
      <div
        className="rental-day-option border border-gray-200 rounded-md text-center cursor-pointer hover:bg-slate-200"
        onClick={activeOnClick}
      >
        <input
          className="rental-day-option-btn text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 invisible hidden"
          type="radio"
          name="numberOfRentalDays"
          id="seven-days"
          value="SEVEN_DAYS"
          onChange={onChangeHandler}
        />
        <label
          className="text-sm font-medium text-gray-900 dark:text-gray-300 text-center cursor-pointer w-ful h-full px-9 py-3 block"
          htmlFor="seven-days"
        >
          7 days
        </label>
      </div>
      <div
        className="rental-day-option border border-gray-200 rounded-md text-center cursor-pointer hover:bg-slate-200"
        onClick={activeOnClick}
      >
        <input
          className="rental-day-option-btn text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 invisible hidden"
          type="radio"
          name="numberOfRentalDays"
          id="fourteen-days"
          value="FOURTEEN_DAYS"
          onChange={onChangeHandler}
        />
        <label
          className="text-sm font-medium text-gray-900 dark:text-gray-300 text-center cursor-pointer w-ful h-full px-9 py-3 block"
          htmlFor="fourteen-days"
        >
          14 days
        </label>
      </div>
      <div
        className="rental-day-option border border-gray-200 rounded-md text-center cursor-pointer hover:bg-slate-200"
        onClick={activeOnClick}
      >
        <input
          className="rental-day-option-btn text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 invisible hidden"
          type="radio"
          name="numberOfRentalDays"
          id="thirty-days"
          value="THIRTY_DAYS"
          onChange={onChangeHandler}
        />
        <label
          className="text-sm font-medium text-gray-900 dark:text-gray-300 text-center cursor-pointer w-ful h-full px-9 py-3 block"
          htmlFor="thirty-days"
        >
          30 days
        </label>
      </div>
      <div
        className="rental-day-option border border-gray-200 rounded-md text-center cursor-pointer hover:bg-slate-200"
        onClick={activeOnClick}
      >
        <input
          className="rental-day-option-btn text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 invisible hidden"
          type="radio"
          name="numberOfRentalDays"
          id="sixty-days"
          value="SIXTY_DAYS"
          onChange={onChangeHandler}
        />
        <label
          className="text-sm font-medium text-gray-900 dark:text-gray-300 text-center cursor-pointer w-ful h-full px-9 py-3 block"
          htmlFor="sixty-days"
        >
          60 days
        </label>
      </div>
    </fieldset>
  );
};

export default RentalDayListComponent;
