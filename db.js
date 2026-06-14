const sqlite3 = require('sqlite3');

//create database / connect to the db file
const db = new sqlite3.Database("library.db", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database');
    }
})

db.serialize(FUNCTIONS) THIS WILL RUN THE CODE IN THE SERIALIZED ORDER
db.serialize(() => {
    ///Librarian table
    db.run(
        `create TABLE if not exists LIBRARIANS(
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT,
        EMAIL VARCHAR(50),
        PASSWORD VARCHAR(50)
    )`, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Table created successfully");
        }
    }
    )

    //Student table
    db.run(
        `create TABLE if not exists STUDENT(
        USN VARCHAR(10) PRIMARY KEY,
        NAME TEXT,
        BRANCH TEXT
    )`, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Table created successfully");
        }
    }
    )

 //   Books table
    db.run(
        `create TABLE if not exists BOOKS(
        BOOKID INTEGER PRIMARY KEY AUTOINCREMENT,
        TITLE TEXT,
        AUTHOR VARCHAR(50),
        QUANTITY INTEGER
    )`, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Table created successfully");
        }
    }
    ) 

   // Borrowed Books
    db.run(
        `create TABLE if not exists BORROWEDBOOKS(
        BBOOKID INTEGER PRIMARY KEY AUTOINCREMENT,
        USN VARCHAR(10),
        BOOKID INTEGER,
        BORROW_DATE INTEGER,
        RETURN_DATE INTEGER,
        STATUS VARCHAR(20)
    )`, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Table created successfully");
        }
    }
    )
    // libraryvisits
    db.run(
        `create TABLE if not exists LIBRARYVISITS(
        BBOOKID INTEGER PRIMARY KEY AUTOINCREMENT,
        USN VARCHAR(10),
        ENTRY_TIME INTEGER,
        EXIT_TIME INTEGER,
        DURATION INTEGER
    )`, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Table created successfully");
        }
    }
    )
})
// // db.serialize(FUNCTIONS) THIS WILL RUN THE CODE IN SERIALIZED ORDER
db.serialize(() => {
db.run(`INSERT OR IGNORE INTO LIBRARIANS(NAME,EMAIL,PASSWORD) VALUES
    ('Rajesh Kumar','rajesh@library.com','admin123'),
    ('Aamir Khan','PK@gmail.com','REMOTWA'),
    ('Manoj Bajpayee','WASSEYPUR@gmail.com','CHAVI_KAHA_HE')`);

db.run(`INSERT OR IGNORE INTO STUDENT(USN,NAME,BRANCH) VALUES
    ('4NM23CS001','Aarav Singh','CSE'),
    ('4NM23CS002','Sneha Rao','CSE'),
    ('4NM23CS003','Kiran Mehta','CSE'),
    ('4NM23EC001','Rohan Verma','ECE'),
    ('4NM23EC002','Divya Nair','ECE'),
    ('4NM23ME001','Faizal Khan','MECH'),
    ('4NM23IS001','Tanvi Joshi','ISE'),
    ('4NM23IS002','Danish Khan','ISE'),
    ('4NM23CV001','Sardar Khan','CIVIL'),
    ('4NM23AI001','Definite Bhai','AIML')`);

db.run(`INSERT OR IGNORE INTO BOOKS(TITLE,AUTHOR,QUANTITY) VALUES
    ('Introduction to Algorithms','Thomas Cormen',5),
    ('Clean Code','Robert Martin',4),
    ('Jugaad Design Patterns','Ramadhir Singh',5),
    ('Database System Concepts','Silberschatz',6),
    ('Operating System Concepts','Galvin',5),
    ('Advanced Katta Engineering','Sardar Khan',3),
    ('Artificial Intelligence','Stuart Russell',3),
    ('Data Structures in C','Yashavant Kanetkar',7),
    ('Coal Mafia Management','Faizal Khan',7),
    ('Perpendicular Mathematics','Tangent Babu',4)`);

db.run(`INSERT OR IGNORE INTO BORROWEDBOOKS(USN,BOOKID,BORROW_DATE,RETURN_DATE,STATUS) VALUES
    ('4NM23CS001',3,'2026-05-20','2026-06-04','BORROWED'),
    ('4NM23CS002',6,'2026-05-25','2026-06-09','BORROWED'),
    ('4NM23EC001',2,'2026-05-10','2026-05-25','RETURNED'),
    ('4NM23ME001',9,'2026-06-01','2026-06-16','BORROWED'),
    ('4NM23IS001',4,'2026-05-28','2026-06-12','BORROWED'),
    ('4NM23CS003',7,'2026-05-15','2026-05-30','RETURNED'),
    ('4NM23AI001',1,'2026-06-05','2026-06-20','BORROWED'),
    ('4NM23EC002',10,'2026-05-30','2026-06-14','BORROWED')`);
});

module.exports=db;