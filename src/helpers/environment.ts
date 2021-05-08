let APIURL = '';

switch(window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:3000'
        break
    case 'https://rainbowconnector.herokuapp.com/auth':
        APIURL = `https://rainbow-connector.herokuapp.com`
}

export default APIURL;