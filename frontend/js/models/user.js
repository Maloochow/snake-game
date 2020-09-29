class User {
    static all = []

    constructor(id, name, games = [0]) {
        this.id = id
        this.name = name
        this.games = games
        User.all.push(this)
    }

    update(json) {
        this.games = json["games"]
        if (user().name === "Anonymous") {
            removeAllChildNodes(currentUserDiv())
            User.setSignInTable()
            setCurrentUserBoard()
        } else {
            removeAllChildNodes(currentUserDiv())
            setCurrentUserBoard()
        }
    }

    static setSignInTable() {
        let span = document.createElement('span')
        span.innerText = "Enter Your Player Name:"
        let form = document.createElement("form")
        let input = document.createElement("input")
        input.setAttribute("type", "text")
        input.setAttribute("id", "name")
        let submit = document.createElement("input")
        submit.setAttribute("type", "submit")
        form.appendChild(input)
        form.appendChild(submit)
        currentUserDiv().appendChild(span)
        currentUserDiv().appendChild(form)

        form.addEventListener("submit", function(e) {
            e.preventDefault();
            let name = document.getElementById("name").value
            signIn(name)
        })
    }

    static logIn(json) {
        new User(json["id"], json["name"], json["games"])
        removeAllChildNodes(currentUserDiv())
        setCurrentUserBoard()
    }

    static get last() {
        let i = User.all.length
        return User.all[i-1]
    }

}

function setCurrentUserBoard() {
    let span = document.createElement('span')
    span.innerHTML = `<b>Score Board for ${user().name}</b>`
    let ul = document.createElement('ul')
    if (user().games.length == 0) {
        let li = document.createElement("li")
        li.innerHTML = "<em>No past scores available<em>"
        ul.appendChild(li)
        userbestDiv().innerText = "Best: 0"
    } else {
        for (const score of user().games.slice(0, 15)) {
            let li = document.createElement("li")
            li.innerText = score
            ul.appendChild(li)
        }
        userbestDiv().innerText = `Best: ${user().games[0]}`
    }
    currentUserDiv().appendChild(span)
    currentUserDiv().appendChild(ul)
    usernameDiv().innerText = `Current Player: ${user().name}`
    user().name === "Anonymous" ? null : setLogOutBtn()
    user().name === "Anonymous" ? null : setDeleteBtn()
}

function setLogOutBtn() {
    let logOutBtn = document.createElement("button")
    logOutBtn.innerHTML = "Log Out"
    logOutBtn.id = "log-out-btn"
    logOutBtn.addEventListener("click", function(e) {
        User.all.pop()
        removeAllChildNodes(currentUserDiv())
        User.setSignInTable()
        usernameDiv().innerText = `Current Player: Anonymous`
        userbestDiv().innerText = "Best: 0"
    })
    currentUserDiv().appendChild(logOutBtn)
}

function setDeleteBtn() {
    let deleteUserBtn = document.createElement("button")
    deleteUserBtn.innerHTML = "Delete Player"
    deleteUserBtn.id = "delete-user-btn"
    deleteUserBtn.addEventListener("click", function(e) {
        deleteUser()
        removeAllChildNodes(currentUserDiv())
        User.setSignInTable()
        usernameDiv().innerText = `Current Player: Anonymous`
        userbestDiv().innerText = "Best: 0"
    })
    currentUserDiv().appendChild(deleteUserBtn)
}