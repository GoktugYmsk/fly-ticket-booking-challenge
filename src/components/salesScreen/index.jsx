import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPassSurname } from '../configure';
import './index.scss'

function SalesScreen() {
    const [surname, setSurname] = useState('')
    const flightTicket = useSelector((state) => state.passTicket.flightTicket);

    const totalPassenger = sessionStorage.getItem('totalPassenger')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log('flightTicket', flightTicket)

    const handlePayScreenClick = () => {
        dispatch(setPassSurname(surname))
        navigate('/pay-screen')
    }

    const handleSurnameChange = (e) => {
        setSurname(e.target.value)
    }

    const totalPrice = flightTicket.priceDetail.basePrice.amount * totalPassenger

    console.log('totalPrice', totalPrice)

    return (
        <div className='salesScreen-container' >
            <div className='salesScreen-container-content' >
                <div className='salesScreen-container-content__box' >
                    <p>{flightTicket.airline}</p>
                    <p>{flightTicket.flightNo}</p>
                    <p>{flightTicket.depTime}</p>
                    <p>{flightTicket.arrTime}</p>
                </div>
                <div className='salesScreen-container-content__box__price' >
                    <p>Yolcu sayısı</p>
                    <p>Fiyat</p>
                    <p>Vergi/Harç</p>
                    <p>Hizmet Bedeli</p>
                    <p>Toplam  </p>
                </div>
                {totalPrice} $
                <div>
                    {totalPassenger}
                </div>
                <div className='salesScreen-container-content__box__passDetail' >
                    <div className='passenger-leftInfo' >
                        <h3>1.yetişkin</h3>
                        <input type='radio' />
                        <input type='radio' />
                    </div>
                    <div className='passenger-rightInfo' >
                        <input placeholder='İsim ' />
                        <input onChange={handleSurnameChange} placeholder='Soyisim' />
                        <input placeholder='Doğum Tarihi' />
                        <input placeholder='TC Kimlik no' />
                        <div className='passenger-rightInfo-detail' >
                            <input type='radio' />
                            <p>TC vatandaşı değilim</p>
                        </div>
                    </div>
                </div>
                <div className='salesScreen-container-content__box__contact' >
                    <div className='salesScreen-container-content__box__contact-top' >
                        <h3>İletişim Bilgileri</h3>
                        <div className='salesScreen-container-content__box-contact-mail-phone' >
                            <input placeholder='E-posta' />
                            <input placeholder='Cep telefonu' />
                        </div>
                    </div>
                    <div className='salesScreen-container-content__box-campains' >
                        <input type='radio' />
                        <p>Fırsat ve kampanyalardan haberdar olmak istiyorum</p>
                    </div>
                </div>
                <div className='salesScreen-container-content__box__invoice' >
                    <h4>Fatura Bilgileri</h4>
                    <div className='salesScreen-container-content__box__invoice-input'>
                        <input type='radio' />
                        <p>Şahıs</p>
                        <input type='radio' />
                        <p>Şirket</p>
                        <input type='radio' />
                        <p>Şahıs Şirketi</p>
                    </div>
                    <div className='salesScreen-container-content__box__invoice-passengerInfo' >
                        <input placeholder='İsim' />
                        <input placeholder='Soyisim' />
                        <input placeholder='TC Kimlik No' />
                        <input type='raido' />
                        <p>Tc vatandaşı değilim</p>
                    </div>
                    <h3>Fatura bilgilerinin doğruluğunu kontrol ediniz</h3>
                </div>
                <div className='salesScreen-container-content__box__insurance' >
                    <h4>Uçak Bileti Sigortası</h4>
                    <div className='salesScreen-container-content__box__insurance-content' >
                        <div className='salesScreen-container-content__box__insurance-content__left' >
                            <input type='radio' />
                            <p>Sigorta yaptırmak istiyorum</p>
                        </div>
                        <p>(2 Kişi) Toplam Fiyat ....</p>
                    </div>
                    <p>Detaylara Göz at</p>
                </div>
            </div>
            <h4 className='payScreen-h4' onClick={handlePayScreenClick} >Ödeme ekranına geç</h4>
        </div>
    )
}

export default SalesScreen