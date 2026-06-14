const express = require('express');
const path = require('path');
const db = require('./db');
const session = require('express-session');
const { error } = require('console');
const { request } = require('http');

function isLoggedin(req, res, next) {
    if (req.session.librarian) {
        next();
    } else {
        res.redirect('/');
    }
}
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(
    session({
        secret: "librarysecret",
        resave: false,
        saveUninitialized: false
    })
);

app.get('/', (req, res) => {
    res.render("login", { error: null });

})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.get(`select * from LIBRARIANS
            WHERE email=? and password=?`, [email, password], (err, row) => {
        if (row) {
            req.session.librarian = row;
            res.redirect("/dashboard")
        }
        else {
            res.render("login", { error: "Invalid Credentails" })
        }
    })
})

app.get("/dashboard", isLoggedin, (request, response) => {
    db.get(`Select count(*) as totalBooks from BOOKS`, (err, books) => {
        db.get(`Select count(*) as totalBorrowed from BORROWEDBOOKS`, (err, borrowed) => {
            db.get(`Select count(*) as totalVisits from LibraryVisits`, (err, visits) => {
                response.render("dashboard", {
                    librarian: request.session.librarian,
                    totalBooks: books.totalBooks,
                    totalBorrowed: borrowed.totalBorrowed,
                    totalVisits: visits.totalVisits
                })
            })
        })

    })
})
app.get(`/books`, (request, response) => {
    db.all(`select * from BOOKS`, (err, rows) => {
        response.render("books", { books: rows })
    })
})

app.get('/books/add', (request, response) => {
    response.render("addbook");
})

app.post('/books/add', (request, response) => {
    const title = request.body.title;
    const author = request.body.author;
    const quantity = request.body.quantity;

    db.run(`insert into BOOKS(TITLE,AUTHOR,QUANTITY)
        values(?,?,?)`, [title, author, quantity], (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Students inserted successfully");
            response.redirect("/books");
        }
    })
})
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
})
app.get('/books/delete/:id', (request, response) => {
    db.run(`delete from   BOOKS 
            where BOOKID = ?`, [request.params.id], (err) => {
        if (!err) {
            response.redirect("/books")
        }
    })
})

app.get('/books/edit/:id', (request, response) => {
    db.get(`SELECT * FROM BOOKS WHERE BOOKID = ?`, [request.params.id], (err, book) => {
        response.render("editbook", { book: book });
    });
})
app.post('/books/edit/:id', (request, response) => {
    const title = request.body.title;
    const author = request.body.author;
    const quantity = request.body.quantity;
    db.run(`Update  BOOKS 
            set TITLE = ?,AUTHOR= ?,QUANTITY=? WHERE BOOKID = ?`, [title, author, quantity, request.params.id], (err) => {
        if (!err) {
            response.redirect("/books")
        }
    })
})

app.get('/students', (request, response) => {
    db.all('select * from STUDENT', (err, rows) => {
        if (err) {
            response.redirect("/dashboard");
        }
        else {
            response.render("students", { students: rows })
        }

    })
})

app.post('/students/add', (request, response) => {
    const usn = request.body.usn;
    const name = request.body.name;
    const branch = request.body.branch;
    db.run(`INSERT INTO STUDENT(USN, NAME, BRANCH) VALUES(?,?,?)`,
        [usn, name, branch], (err) => {
            if (err) {
                console.log(err);
            }
            else {
                response.redirect("/students");
            }
        })
})
app.get('/students/delete/:usn', (request, response) => {
    db.run(`delete from STUDENT where USN=?`, [request.params.usn], (err) => {
        if (!err) response.redirect("/students");
    })
})

app.get('/borrowed', (request, response) => {
    db.all(`SELECT * FROM BORROWEDBOOKS`, (err, rows) => {
        db.all(`SELECT * FROM STUDENT`, (err2, students) => {
            db.all(`SELECT * FROM BOOKS`, (err3, books) => {
                response.render("borrowed", { borrowed: rows, students: students, books: books });
            });
        });
    });
});

app.post('/borrowed/add', (request, response) => {
    const usn = request.body.usn;
    const bookid = request.body.bookid;
    const today = new Date().toISOString().split('T')[0];
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 15);
    const returnStr = returnDate.toISOString().split('T')[0];

    db.run(`INSERT INTO BORROWEDBOOKS(USN, BOOKID, BORROW_DATE, RETURN_DATE, STATUS)
            VALUES(?,?,?,?,'BORROWED')`, [usn, bookid, today, returnStr], (err) => {
        if (err) console.log(err);
        else response.redirect("/borrowed");
    });
});

app.get('/borrowed/return/:id', (request, response) => {
    db.run(`UPDATE BORROWEDBOOKS SET STATUS='RETURNED' WHERE BBOOKID=?`,
        [request.params.id], (err) => {
            if (!err) response.redirect("/borrowed");
        });
});

app.listen('5000', () => {
    console.log('Chal raha hai 5000 pe ')
});
