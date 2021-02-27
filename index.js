let url = 'https://api.chucknorris.io/jokes/random';
let joke = document.querySelector("#joke");

//XHR way to make requests

let xhrBtn = document.querySelector("#xhr");
xhrBtn.addEventListener("click", function () {
    let XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
            joke.innerText = JSON.parse(XHR.responseText).value;
        } else {
            console.log("There was a problem!")
        }
    }
    XHR.open("GET", url);
    XHR.send();
})

//Fetch way to make requests


const fetchBtn = document.querySelector("#fetch");

fetchBtn.addEventListener("click", function () {
    fetch(url)
        .then(handleErrors)
        .then(parseJSON)
        .then(updateJoke)
        .catch(displayErrors)
})

function handleErrors(res) {
    if (!res.ok) {
        throw Error(res.status);
    }
    return res;
}

function parseJSON(response) {
    return response.json();
}

function updateJoke(data) {
    joke.innerText = data.value
}

function displayErrors(err) {
    console.log("inside displayErrors")
    console.log(err);
}

//jquery way to make requests

$("#jquery").click(function () {
    $.getJSON(url)
        .done(function (data) {
            $("#joke").text(data.value);
        })
        .fail(function () {
            alert("Request is not possible")
        })
});


//axios way to make requests

let axiosBtn = document.querySelector("#axios");
axiosBtn.addEventListener("click", function () {
    axios.get(url)
        .then(function (res) {
            joke.innerText = res.data.value
        })
        .catch(function () {
            console.log("ERR")
        })
})
