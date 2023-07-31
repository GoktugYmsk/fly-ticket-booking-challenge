import React from 'react'
import { useSelector } from 'react-redux';

import DateTime from 'react-datetime';

function CalendarRigth({ handleDateChangeArrive, getNextDay }) {

    const selectedDate = useSelector((state) => state.optionDateDepp.selectedDate);

    const renderCalendarRight = () => {
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
                    onChange={handleDateChangeArrive}
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
            {renderCalendarRight()}
        </>
    )
}

export default CalendarRigth
