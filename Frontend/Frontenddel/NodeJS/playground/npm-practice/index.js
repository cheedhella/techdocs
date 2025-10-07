const {v4} = require('uuid'); 

function displayRandomString() {
    if (typeof document !== 'undefined') { 
        const first = document.getElementById('first');
        first.innerHTML = v4();
    }
}
displayRandomString();