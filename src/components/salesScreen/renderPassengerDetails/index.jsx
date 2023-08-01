import { useDispatch, useSelector } from 'react-redux';
import { setPassName, setPassSurname } from '../../configure';

function PassengerDetailBox({ passengerIndex, passengerType }) {
    const dispatch = useDispatch();
    const passName = useSelector((state) => state.passCheck.passName);
    const passSurname = useSelector((state) => state.passCheck.passSurname);

    const handleNameChange = (e) => {
        const newName = e.target.value;
        const currentPassNames = [...passName];
        currentPassNames[passengerIndex - 1] = newName;
        dispatch(setPassName(currentPassNames));
    };

    const handleSurnameChange = (e) => {
        const newSurname = e.target.value;
        const currentPassSurnames = [...passSurname];
        currentPassSurnames[passengerIndex - 1] = newSurname;
        dispatch(setPassSurname(currentPassSurnames));
    };

    return (
        <div key={passengerIndex} className='flight-contanier-box'>
            <div className='passenger-leftInfo'>
                <h4>{`${passengerIndex}. ${passengerType}`}</h4>
            </div>
            <div className="flight-box-name">
                <div className="no">
                    <input placeholder="First Name" onChange={handleNameChange} required />
                </div>
            </div>
            <div className="flight-box-surname">
                <div className="no">
                    <input placeholder="Last Name" onChange={handleSurnameChange} required />
                </div>
            </div>
            <div className="flight-box-id">
                <div className="time">
                    <input placeholder="ID Number" type="text" />
                </div>
            </div>
            <div className="flight-box-birth">
                <div className="arrive-title">Birth Date:</div>
                <div className="arrive">
                    <input placeholder="Gidiş tarihini seçiniz." type="date" name="birth-date" />
                </div>
            </div>
        </div>
    );
}

function RenderPassengerDetails() {
    const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);
    const passengerCounts = [passengerInfo.adults, passengerInfo.children, passengerInfo.babies];

    const passengerDetails = [];
    for (let i = 0; i < passengerCounts.length; i++) {
        for (let j = 1; j <= passengerCounts[i]; j++) {
            let passengerIndex = passengerCounts.slice(0, i).reduce((acc, count) => acc + count, 0) + j;
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

            passengerDetails.push(<PassengerDetailBox key={passengerIndex} passengerIndex={passengerIndex} passengerType={passengerType} />);
        }
    }

    return (
        <div className='flight-passenger-container'>
            {passengerDetails}
        </div>
    );
}

export default RenderPassengerDetails;
