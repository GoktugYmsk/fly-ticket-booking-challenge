import React from 'react'
import { useSelector } from 'react-redux';

import DateTime from 'react-datetime';

function CalenderLeft({ handleDateChange, getNextDay }) {

    const selectedDate = useSelector((state) => state.optionDateDepp.selectedDate);

    const renderCalendar = () => {
        const currentMonth = new Date().getMonth() + 1;
        const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

        const isValidDate = (current) => {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

            return (
                current.toDate().getMonth() === currentMonth - 1 ||
                current.toDate().getMonth() === nextMonth - 1
            ) && current.toDate() >= currentDate;
        };

        return (
            <div className='calendar'>
                <DateTime
                    required
                    value={getNextDay() || selectedDate}
                    onChange={handleDateChange}
                    dateFormat='DD/MM/YYYY'
                    timeFormat={false}
                    closeOnSelect
                    viewMode='months'
                    isValidDate={isValidDate}
                    renderMonth={(props, month, year) => (
                        <div {...props}>
                            {month === currentMonth || month === nextMonth ? (
                                <div>{`${month}/${year}`}</div>
                            ) : null}
                        </div>
                    )}
                />
            </div>
        );
    };

    return (
        <>
            {renderCalendar()}
        </>
    )
}

export default CalenderLeft
