import React from 'react'

function deneme() {

    const axios = require('axios');

    const apiUrl = 'http://webapi-dev.eba-j3p8idgy.eu-north-1.elasticbeanstalk.com/api/baseprices/getall';

    axios.get(apiUrl)
        .then(response => {
            // İstek başarılı olduğunda burası çalışır
            console.log('Veriler:', response.data);
        })
        .catch(error => {
            // İstek hata ile sonuçlanırsa burası çalışır
            console.error('Hata:', error);
        });


    return (
        <div>

        </div>
    )
}

export default deneme
