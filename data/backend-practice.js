// XMLHttpRequest is a built in class
// message = request
const xhr = new XMLHttpRequest();

// the first parameter is the event we're looking for, the second is what to do
// after the event happens (after response has loaded)
// the response can be JSON, text, html, or an image
xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

// get information from backend
// second parameter is where to send message
xhr.open('GET', 'https://supersimplebackend.dev');

xhr.send();
