import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPassName, setPassSurname } from '../../configure';

function RenderPassengerDetails() {
    const passName = useSelector((state) => state.passCheck.passName);
    const passSurname = useSelector((state) => state.passCheck.passSurname);
    const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);

    const dispatch = useDispatch()

    const handleNameChange = (e, passengerIndex) => {
        const newName = e.target.value;
        const currentPassNames = [...passName];
        currentPassNames[passengerIndex - 1] = newName;
        dispatch(setPassName(currentPassNames));
    };

    const handleSurnameChange = (e, passengerIndex) => {
        const newSurname = e.target.value;
        const currentPassSurnames = [...passSurname];
        currentPassSurnames[passengerIndex - 1] = newSurname;
        dispatch(setPassSurname(currentPassSurnames));
    }

    const renderPassengerDetails = () => {
        const passengerDetails = [];
        const passengerCounts = [passengerInfo.adults, passengerInfo.children, passengerInfo.babies];

        for (let i = 0; i < passengerCounts.length; i++) {
            for (let j = 1; j <= passengerCounts[i]; j++) {
                const passengerIndex = passengerCounts.slice(0, i).reduce((acc, count) => acc + count, 0) + j;
                let passengerType = '';
                switch (i) {
                    case 0:
                        passengerType = 'Adult';
                        break;
                    case 1:
                        passengerType = 'Child';
                        break;
                    case 2:
                        passengerType = 'Infant';
                        break;
                    default:
                        break;
                }

                passengerDetails.push(
                    <div key={passengerIndex} className='flight-contanier-box'>
                        <div className='passenger-leftInfo'>
                            <h4>{`${j}. ${passengerType}`}</h4>
                        </div>
                        <div className="flight-box-name">
                            <div className="no"><input placeholder="First Name" onChange={(e) => handleNameChange(e, passengerIndex)} required /></div>
                        </div>
                        <div className="flight-box-surname">
                            <div className="no"><input placeholder="Last Name" onChange={(e) => handleSurnameChange(e, passengerIndex)} required /></div>
                        </div>
                        <div className="flight-box-id">
                            <div className="time"><input placeholder="ID Number" type="text" /></div>
                        </div>
                        <div className="flight-box-birth">
                            <div className="arrive-title">Birth Date:</div>
                            <div className="arrive"><input placeholder="Gidiş tarihini seçiniz." type="date" name="birth-date" /></div>
                        </div>
                    </div>
                );
            }
        }
        return passengerDetails;
    };
    return (
        <div className='flight-passenger-container'>
            {renderPassengerDetails()}
        </div>
    )
}

export default RenderPassengerDetails
