// FIlm Class
class Film {
    constructor(title, platform){
        this.title = title;
        this.platform = platform;
    }
}


//UI Class
class UI{
    static displayFilms(){
        const films = Store.getFilms();

        films.forEach((film) => UI.addFilm(film));
    }

    static addFilm(film) {
        const list = document.querySelector("#film-list");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.platform}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `;
        row.className = `table-secondary`
        list.appendChild(row);
    }

    static deleteFilm(el){
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove()
        }
    }

    static showAlert(message, className){
        const div = document.createElement("div");
        div.className = `alert  alert-${className} mt-4`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#film-form");
        container.insertBefore(div, form);

        setTimeout(() =>document.querySelector(".alert").remove(), 2000 )
    }


    static clearFields(){
        document.querySelector("#title").value = "";
        document.querySelector("#platform").value = "";
    }
}

// Store Class
class Store {
    static getFilms(){
        let films;
        if(localStorage.getItem("films") === null) {
            films = [];
        } else [
            films = JSON.parse(localStorage.getItem("films"))
        ]
        return films;
    }

    static addFilmLS(film){
        const films = Store.getFilms();
        films.push(film);
        localStorage.setItem("films", JSON.stringify(films))
    }

    static removeFilmLS(platform){
        const films = Store.getFilms();

        films.forEach((film, index) => {
            if(film.platform === platform){
                films.splice(index, 1)
            }
        })

        localStorage.setItem("films", JSON.stringify(films))
    }
}

//Event -> Display Book
document.addEventListener("DOMContentLoaded", UI.displayFilms);


//Event -> Add Book
document.querySelector("#film-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const platform = document.querySelector("#platform").value;

    //Validation
    if(title == "" || platform == ""){
        UI.showAlert("You should fill in all the fields!", "danger");
    } else {
        const film = new Film(title, platform);
        UI.addFilm(film);
        Store.addFilmLS(film);
        UI.showAlert("Your book has been added succesfully", "success");
        UI.clearFields();
    }
})

//Event -> Remove Book
document.querySelector("#film-list").addEventListener("click", (e) => {
    UI.deleteFilm(e.target);
    Store.removeFilmLS(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert("Your book has been deleted succesfully!", "danger");
})