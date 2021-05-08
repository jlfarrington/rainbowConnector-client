let APIURL = '';

switch(window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:3000'
        break
    case 'https://rainbowconnector.herokuapp.com/auth':
        APIURL = 'https://rainbow-connector.herokuapp.com'
        break
    case 'https://rainbowconnector.herokuapp.com/':
        APIURL = 'https://rainbow-connector.herokuapp.com'
        break
    case 'http://rainbowconnector.herokuapp.com/':
        APIURL = 'http://rainbow-connector.herokuapp.com'
        break
    case 'http://rainbowconnector.herokuapp.com/auth':
        APIURL = 'http://rainbow-connector.herokuapp.com'
        break
    
}
export default APIURL;