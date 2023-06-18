let APIURL = 'https://rainbowconnector-api.onrender.com';

switch(window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:3000'
        break
    case 'https://rainbowconnector-ui.onrender.com/auth':
        APIURL = 'https://rainbowconnector-api.onrender.com'
        break
    case 'https://rainbowconnector-ui.onrender.com/':
        APIURL = 'https://rainbowconnector-api.onrender.com'
        break
    case 'http://rainbowconnector-ui.onrender.com/':
        APIURL = 'http://rainbowconnector-api.onrender.com'
        break
    case 'http://rainbowconnector-ui.onrender.com/auth':
        APIURL = 'http://rainbowconnector-api.onrender.com'
        break
    
}
export default APIURL;