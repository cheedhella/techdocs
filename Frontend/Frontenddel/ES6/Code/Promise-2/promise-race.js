// after 0.5 seconds, if the getData() has not resolved, then show 
// the Loading indicator
const TIMEOUT = 500;
const DATA_LOAD_TIME = 5000;

function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const message = 'Promise.race() Demo';
            resolve(message);
        }, DATA_LOAD_TIME);
    });
}

function showContent(message) {
    document.querySelector('#message').textContent = message;
}

function timeout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(), TIMEOUT);
    });
}

function showLoadingIndicator() {
    document.querySelector('#loader').className = 'loader';
}

function hideLoadingIndicator() {
    document.querySelector('#loader').className = '';
}


// handle button click event
const btn = document.querySelector('#btnGet');

btn.addEventListener('click', () => {
    // reset UI if users click the second time
    reset();

    // show content or loading indicator
    Promise.race([getData()
            .then(showContent)
            .then(hideLoadingIndicator), timeout()
        ])
        .catch(showLoadingIndicator);
});

// reset UI
function reset() {
    hideLoadingIndicator();
    showContent('');
}