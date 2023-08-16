export const lat_long ={
    "Bhiwani": {
        "latitude": 28.791052,
        "longitude": 76.143875
    },
    "Faridabad": {
        "latitude": 28.427902,
        "longitude": 77.329409
    },
    "Fatehabad": {
        "latitude": 29.516385,
        "longitude": 75.4548
    },
    "Panchkula": {
        "latitude": 30.722619,
        "longitude": 76.880191
    },
    "Rohtak": {
        "latitude": 28.888214,
        "longitude": 76.587935
    },
    "Karnal": {
        "latitude": 29.692495,
        "longitude": 76.985142
    },
    "Rewari": {
        "latitude": 28.198138,
        "longitude": 76.615433
    },
    "Panipat": {
        "latitude": 29.387951,
        "longitude": 76.968552
    },
    "Yamunanagar": {
        "latitude": 30.30369,
        "longitude": 77.307789
    },
    "Nuh Mewat": {
        "latitude": 28.099046069577,
        "longitude": 77.02292666409046
    },
    "Mahendragarh": {
        "latitude": 28.045836,
        "longitude": 76.11006
    },
    "Gurugram": {
        "latitude": 28.466248,
        "longitude": 77.028569
    },
    "Jind": {
        "latitude": 29.318821,
        "longitude": 76.313347
    },
    "Kaithal": {
        "latitude": 29.804185,
        "longitude": 76.399321
    },
    "Sirsa": {
        "latitude": 29.531177,
        "longitude": 75.026343
    },
    "Charkhi Dadri": {
        "latitude": 28.597892777830666,
        "longitude": 76.27070811025918
    },
    "Jhajjar": {
        "latitude": 28.601349,
        "longitude": 76.6536
    },
    "Hisar": {
        "latitude": 29.151765,
        "longitude": 75.725027
    },
    "Palwal": {
        "latitude": 28.147539614049613,
        "longitude": 77.32686067977056
    },
    "Sonipat": {
        "latitude": 28.979449,
        "longitude": 77.024728
    },
    "Kurukshetra": {
        "latitude": 29.962444,
        "longitude": 76.838151
    },
    "Ambala": {
        "latitude": 30.376076,
        "longitude": 76.78821
    }
}

// export const getLatLong =(district:string)=>{
//     return lat_long?.[district]
// }

export const getLatitude =(district:string)=>{
    return lat_long?.[district]?.latitude
}

export const getLongitude =(district:string)=>{
    return lat_long?.[district]?.longitude
}