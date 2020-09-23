
const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const GAMES_URL = `${BASE_URL}/games`

let pastGames

document.addEventListener("DOMContentLoaded", function(e) {
    getPastGames()
})

function getPastGames() {
    return fetch(`${GAMES_URL}`)
    .then(resp => resp.json())
    .then(json => {
        console.log(json)
        pastGames = json
        displayGames()
    })
}

function signIn(name) {
    let configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({name: `${name}`})
    }

    fetch(`${USERS_URL}`, configurationObject)
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
            User.logIn(json)
        })
        .catch(error => console.log(error.message))
}

function patchNewScore(username, score) {
    let configurationObject = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({name: `${username}`, score: `${score}`})
    }

    fetch(`${USERS_URL}/${user().id}`, configurationObject)
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
            user().update(json)
            removeAllChildNodes(bestScoreDiv())
            getPastGames()
        })
        .catch(error => console.log(error.message))
}

function deleteUser() {
    configurationObject = {
        method: "DELETE",
        body: JSON.stringify({name: `${user().name}`})
    }

    return fetch(`${USERS_URL}/${user().id}`, configurationObject)
        .then(resp => resp.json())
        .then(json => {
            removeAllChildNodes(bestScoreDiv())
            getPastGames()
        })
        .catch(error => console.log(error.message))
}

function displayGames() {
    let ul = document.createElement("ul")
    ul.className = "collection"
    bestScoreDiv().appendChild(ul)
    if (pastGames.length != 0)
    for (const game of pastGames.slice(0, 10)) {
        let li = document.createElement("li")
        li.className = "collection-item"
        li.innerHTML = `<b>${game.score}</b> by player: ${game.user}`
        ul.appendChild(li)
    } else {
        ul.innerHTML = "<b>Let's make some history!!</b>"
    }
}