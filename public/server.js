const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const xlsx  = require('xlsx');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'library'
});



// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();
app.use(cors());

// Select posts
app.get('/', (req, res) => {
   res.send('go to products to see products');
});

///////////////////////		UPLOAD EXCEL FILES 	//////////////////////
// Based on this article
// https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //cb(null, '../public/mem_photos')
    cb(null, 'excels')
  },
  filename: function (req, file, cb) {
    //cb(null, Date.now() + '-' +file.originalname )
    cb(null, file.originalname )
    
  }
});

var upload = multer({ storage: storage }).single('file');

app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)
     
    })
});


///////////////////////		IMPORT BOOKS EXCEL	//////////////////////
/*
const wb =  xlsx.readFile('../excel_test.xlsx');
const ws = wb.Sheets["Book2"];

const data = xlsx.utils.sheet_to_json(ws);

data.map(function(record){
	// record.new = record.Sales - record.Coast;
	//delete record.name;
	console.log(record.author);
});
*/
app.get('/excel', (req, res) => {
    const{fileName, catalogueTitle} = req.query;

    console.log('./excels/'+fileName);

    const wb =  xlsx.readFile('./excels/'+fileName);
    const ws = wb.Sheets["Sheet1"];
    const data = xlsx.utils.sheet_to_json(ws);

      data.map(function(record){
        //console.log(record.barcode);
        var barcode = record.barcode;
        var author = record.author;
        var title = record.title;
        var publisher = record.publisher;
        var pub_place = record.pub_place;
        var pub_year = record.pub_year;
        var isbn = record.isbn;
        var vol_no = record.vol_no;
        var bk_edition = record.bk_edition;
        var bk_pages = record.bk_pages;
        var bk_contact = record.bk_contact;
        var bk_coast = record.bk_coast;
        var bk_translation = record.bk_translation;
        addBook(barcode, author, title, catalogueTitle,  publisher, pub_place, pub_year, isbn, vol_no, bk_edition, bk_pages, bk_contact, bk_coast, bk_translation);
        //alert(record.author)
    });
});

function addBook(getBarcode, getAuthor, getTitle, getCatalogueTitle, getPublisher, getPub_place, getPub_year, getIsbn, getVol_no, getBk_edition, getBk_pages, getBk_contact, getBk_coast, getBk_translation){
  
    const sql = `INSERT INTO books (barcode, author, title, catogary, publisher, pub_place, pub_year, isbn, vol_no, bk_edition, bk_pages, bk_contact, bk_coast, bk_translation) VALUES ('${getBarcode}', '${getAuthor}', '${getTitle}', '${getCatalogueTitle}','${getPublisher}', '${getPub_place}', '${getPub_year}', '${getIsbn}', '${getVol_no}', '${getBk_edition}', '${getBk_pages}', '${getBk_contact}', '${getBk_coast}', '${getBk_translation}')`;
                db.query(sql, (err, results) => {
                if(err){
                return res.send(err);
                }
                else {
                    return console.log(getBarcode + 'Books successfully added!');
                }
                });

            ;
}
//////////////////////////////////////////////////////////////////


///////////////////////		IMPORT PATRONS       //////////////////////

app.get('/importPatrons', (req, res) => {
    const{fileName, patronCatogary} = req.query;

    console.log('./excels/'+fileName);

    const wb =  xlsx.readFile('./excels/'+fileName);
    const ws = wb.Sheets["Patrons"];
    const data = xlsx.utils.sheet_to_json(ws);

    data.map(function(record){
        //console.log(record.barcode);
        var regno = record.regno;
        var username = record.username;
        var firstname = record.firstname;
        var address = record.address;
        var currentAddress = record.currentAddress;
        var city = record.city;
        var state = record.state;
        var zipcode = record.zipcode;
        var country = record.country;
        var email = record.email;
        var phone = record.phone;
        var dateofbirth = record.dateofbirth;
        var categorycode = patronCatogary;
        var dateenrolled = record.dateenrolled;
        var dateexpiry = record.dateexpiry;
        var accountLevel = record.accountLevel;
        var sex = record.sex;
        var password = record.password;
        var opacnote = record.opacnote;


      

        addMembers(regno, username, firstname, address, currentAddress, city, state, zipcode, country, email, phone, dateofbirth, categorycode, dateenrolled, dateexpiry, accountLevel, sex, password, opacnote);
        //alert(record.author)
    });
});


function addMembers(regno, username, firstname, address, currentAddress, city, state, zipcode, country, email, phone, dateofbirth, categorycode, dateenrolled, dateexpiry, accountLevel, sex, password, opacnote){
//function addMembers(getRegno, getUsername, getFirstname, getAddress, getCurrentAddress, getCity, getState, getZipcode, getCountry, getEmail, getPhone, getDateofbirth, getCategorycode, getDateenrolled, getDateexpiry, getAccountLevel, getSex, getPassword, getOpacnote){
   // const sql = `INSERT INTO members (regno, username, firstname, address, currentAddress, city, state, zipcode, country, email, phone, dateofbirth, categorycode, dateenrolled, dateexpiry, accountLevel, sex, password, opacnote) VALUES ('${getRegno}', '${getUsername}', '${getFirstname}', '${getAddress}', '${getCurrentAddress}', '${getCity}', '${getState}', '${getZipcode}', '${getCountry}', '${getEmail}', '${getPhone}', '${getDateofbirth}', '${getCategorycode}', '${getDateenrolled}', '${getDateexpiry}', '${getAccountLevel}', '${getSex}', '${getPassword}', '${getOpacnote}')`;
    let post  = {regno, username, firstname, address, currentAddress, city, state, zipcode, country, email, phone, dateofbirth, categorycode, dateenrolled, dateexpiry, accountLevel, sex, password, opacnote};
    
    const sql = 'INSERT INTO members SET ?';          
    let query = db.query(sql, post, (err, result) => {
                if(err) throw err;
                console.log(result);
                //res.send('Post 2 added...');
            });
        
    }
        

//////////////////////////////////////////////////////////////////


///////////////////////	   login 	//////////////////////

app.get('/getLogInMembers', (req, res) => {
    //const{title} = req.query;
    //db.connect()
    let sql = `SELECT * FROM members WHERE accountLevel='admin'`;
    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
        //console.log(results);
        //res.send('Posts fetched...');  
    });
    
});

//////////////////////////////////////////////////////////////////



///////////////////////		Select * Members	//////////////////////

app.get('/getMembers', (req, res) => {
    //const{title} = req.query;
    //db.connect()
    let sql = `SELECT * FROM members`;
    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
        //console.log(results);
        //res.send('Posts fetched...');  
    });
    
});




///////////////////////		Select Books 	//////////////////////
app.get('/getBooks', (req, res) => {
    //const{title} = req.query;
    let sql = `SELECT * FROM books`;
    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
        //console.log(results);
        //res.send('Posts fetched...');  
    });
});


///////////////////////		GET DUE DATE	//////////////////////
app.get('/dueDate', (req, res) => {
    const sql = `SELECT due_date FROM library`;
    db.query(sql, (err, results) => {
    if(err){ return res.send(err) }
    else { return res.json({data: results})}
    })
})

///////////////////////		UPDATE DUE DATE 	//////////////////////
app.get('/setDueDate', (req, res) => {
    const {dueDate} = req.query;
    const sql = `UPDATE library SET due_date='${dueDate}'`;    

    db.query(sql, (err, results) => {
    if(err){ return res.send(err) }
    else { return console.log( results + 'Due_date updated successfully!');
    }
    })
    
})


///////////////////////		CHECK OUT Books 	///////////////////// 
/*
app.get('/check_out', (req, res) => {
    const{memberBarcode, bookBarcode, admin, dueDate} = req.query;
  // db.connect();
    const sql = `INSERT INTO check_out (member_brcode, book_brcode, given_by, available, due_date) VALUES ('${memberBarcode}','${bookBarcode}','${admin}', true, '${dueDate}')`;    
    db.query(sql, (err, results) => {
    if(err)
    {res.send(err)}
    else{ return console.log( 'Book '+ memberBarcode + ' Check out successfully!');
    }
    });
    
  });
*/
  app.get('/check_out', (req, res) => {
    const{memberBarcode, bookBarcode, admin, dueDate} = req.query;
    let post = {member_brcode: memberBarcode, book_brcode: bookBarcode, given_by: admin, available:'0', due_date: dueDate};
    let sql = 'INSERT INTO check_out SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(bookBarcode+' check_out successfully! ' + result);
        res.send('Post 1 added...');
    });
});




///////////////////////		CHECK IN  Books 	//////////////////////
app.get('/check_in', (req, res) => {
    const{bookBarcode} = req.query;
    const sql = `UPDATE check_out SET available = true WHERE book_brcode = '${bookBarcode}'`;
    db.query(sql, (err, results) => {
    if(err){
    return res.send(err);
    }
    else {
        return console.log( 'CHECKIN successfully added!');
        
    }
    });
    
});


///////////////////////		RENEW  Books 	//////////////////////
app.get('/renew', (req, res) => {
    const {bookBarcode, dueDate} = req.query;
    const sql = `UPDATE check_out SET due_date='${dueDate}' WHERE book_brcode = '${bookBarcode}'`;    
    db.query(sql, (err, results) => {
    if(err){ return res.send(err) }
   // else { return console.log( "Book "+ bookBarcode + '\'s Due_date updated successfully!');
     else { return res.send(results);
    }
    });
});


///////////////////////		SEARCH BOOKS 	//////////////////////


 app.get('/search', (req, res) => {
    const{words} = req.query;
    let sql = `SELECT * FROM books WHERE title LIKE '%${words}%'`;
    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
        //console.log(results);
        //res.send('Posts fetched...');  
    });
});


///////////////////////		GET ALL POSTS  	//////////////////////
 // Select posts
 app.get('/getposts', (req, res) => {
    const{title} = req.query;
    let sql = `SELECT * FROM posts`;
    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
        //console.log(results);
        //res.send('Posts fetched...');  
    });
});



///////////////////////		GET ALL CHECkOUT BOOKS  	//////////////////////
 app.get('/checkOutBooks', (req, res) => {
    //const{bookBarcode} = req.query;
    let sql = `SELECT * FROM check_out WHERE available = false`;
    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
                
            })
        }
    });
    
});


///////////////////////		GET ALL  BOOK BARCODS with Catogary  	//////////////////////
app.get('/barcods', (req, res) => {
    const{catogary} = req.query;
    let sql = `SELECT barcode FROM books WHERE catogary='${catogary}'`;
    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
                
            })
            	
        
        }
    });
});


// Add posts
app.get('/getposts/add', (req, res) => {
    const{title, body} = req.query;
    const sql = `INSERT INTO posts (title, body) VALUES ('${title}','${body}')`;
    db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.send('successfully added!');
        }
    });
        //console.log(results);
        //res.send('Posts fetched...');  
});





// Delete post
app.get('/deletepost', (req, res) => {
    const{id} = req.query;
    let sql = `DELETE FROM posts WHERE id = ${id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Post deleted...');
    });
});


app.get('/addProducts', (req, res) => {
    const {title} = req.query
    let post = {title: title, body:'This is final test'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });
});
/////////////////////////////////////////////  VIEW PATRON  ////////////////////////////////////////////////

///////////////////////		Add Single Patron 	//////////////////////
app.get('/addPatron', (req, res) => {
    const {Regno, Username, Firstname, Address, CurrentAddress, City, State, Zipcode, Country, Email, Phone, Dateofbirth, 
        Categorycode, Dateexpiry, AccountLevel, Sex, Password, Opacnote} = req.query

    let post = {Regno, Username, Firstname, Address, CurrentAddress, City, State, Zipcode, Country, Email, Phone, Dateofbirth, 
        Categorycode, Dateexpiry, AccountLevel, Sex, Password, Opacnote};
    let sql = 'INSERT INTO members SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log('New Member '+Username+' added successfully!');
        res.send('202');
    });
});

///////////////////////		UPDATE  Single Patron 	//////////////////////
app.get('/patronUpdate', (req, res) => {
    const {Regno, Username, Firstname, Address, CurrentAddress, City, State, Zipcode, Country, Email, Phone, Dateofbirth, 
        Categorycode, Dateexpiry, AccountLevel, Sex, Password, Opacnote} = req.query

    const sql = `UPDATE members SET username='${Username}', firstname='${Firstname}', address='${Address}'
    , currentAddress='${CurrentAddress}', city='${City}', state='${State}', zipcode='${Zipcode}' 
    , country='${Country}', email='${Email}', phone='${Phone}', dateofbirth='${Dateofbirth}', categorycode='${Categorycode}'
    , dateexpiry='${Dateexpiry}', accountLevel='${AccountLevel}', sex='${Sex}', password='${Password}'
    , opacnote='${Opacnote}' WHERE regno='${Regno}'`;  
    
    
    db.query(sql, (err, results) => {
    if(err){ return res.send(err) }
   // else { return console.log( "Book "+ bookBarcode + '\'s Due_date updated successfully!');
     else { return console.log("Error of updating patron"); //res.send(results);
    }
    });
});



///////////////////////////////////////////// VIEW BOOK  ////////////////////////////////////////////////

///////////////////////		Add Single book 	//////////////////////
app.get('/addBook', (req, res) => {
    const {barcode, author, title, catalogueTitle,  publisher, pub_place, pub_year, isbn, vol_no, bk_edition, bk_pages, bk_contact, bk_coast, bk_translation} = req.query
    let catogary = catalogueTitle
    let post = {barcode, author, title, catogary,  publisher, pub_place, pub_year, isbn, vol_no, bk_edition, bk_pages, bk_contact, bk_coast, bk_translation};

    let sql = 'INSERT INTO books SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log('New Book '+title+' added successfully!');
        res.send('202');
    });
});

///////////////////////		UPDATE  Single book 	//////////////////////
app.get('/bookUpdate', (req, res) => {

const {Q} = req.query
    //const sql = `UPDATE books SET Title='${title}' WHERE barcode=${barcode}`;  
    const sql = Q;  
    
    
    db.query(sql, (err, results) => {
    if(err){ return res.send(err) }
   // else { return console.log( "Book "+ bookBarcode + '\'s Due_date updated successfully!');
     else { return console.log("Error of updating patron"); //res.send(results);
    }
    });

});



///////////////////////		Select Books 	//////////////////////
app.get('/getMyBooks', (req, res) => {
    const{regno} = req.query;
    
    let sql = `SELECT * FROM books JOIN check_out ON check_out.book_brcode  = books.barcode WHERE member_brcode='${regno}' AND available="0" `;
    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
        //console.log(results);
        //res.send('Posts fetched...');  
    }); 
});




///////////////////////		UPDATE PatronArrays 	//////////////////////

app.get('/GetPatronArrays', (req, res) => {
    let sql = `SELECT PatronCatogary FROM library`;
    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});

app.get('/patronArrays', (req, res) => {
    const {patronCatogary} = req.query

    //let post = {PatronCatogary: patronCatogary};
    let sql = `UPDATE library SET PatronCatogary = '${patronCatogary}'`;
        let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log('New Patron Catogary '+patronCatogary+' added successfully!');
        res.send('202');
    });
});




///////////////////////		UPDATE BookArrays 	//////////////////////

app.get('/GetBookArrays', (req, res) => {
    let sql = `SELECT bookCatogary FROM library`;
    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});

app.get('/bookArrays', (req, res) => {
    const {bookCatogary} = req.query

    let sql = `UPDATE library SET bookCatogary = '${bookCatogary}'`;
        let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log('Book Catogaries '+bookCatogary+' updated successfully!');
        res.send('202');
    });
});


///////////////////////		GET Patron 	//////////////////////

app.get('/getPatron', (req, res) => {
    const {id} = req.query
    let sql = `SELECT * FROM members WHERE regno='${id}'`;
    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});

///////////////////////		GET Book 	//////////////////////
app.get('/getBook', (req, res) => {
    const {id} = req.query
    let sql = `SELECT * FROM books WHERE barcode='${id}'`;
    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});






///////////////////////		DELETE 	//////////////////////
app.get('/Delete', (req, res) => {
    const {Q} = req.query
   // let sql = `SELECT * FROM books WHERE barcode='${id}'`;
    let query = db.query(Q, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});



///////////////////////		UPLOAD MULTIPLE IMAGES 	//////////////////////


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'mem_photos')
  },
  filename: function (req, file, cb) {
    //cb(null, Date.now() + '-' +file.originalname )
    cb(null, file.originalname )

  }
})

var upload = multer({ storage: storage }).array('file')

app.post('/uploadImages',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});





app.get('/test', (req, res) => {
    const {id} = req.query
    let sql = `SELECT * FROM books JOIN check_out ON check_out.book_brcode  = books.barcode WHERE member_brcode="MEM1" AND available="0" `;

    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});



///////////////////////		GET STARTED	//////////////////////
app.get('/getStarted', (req, res) => {
    const sql = `SELECT getStarted FROM library`;
    db.query(sql, (err, results) => {
    if(err){ return res.send(err) }
    else { return res.json({data: results})}
    })
})

app.get('/createDatabase', (req, res) => {
    const sql = `CREATE DATABASE testDB`;
    db.query(sql, (err, results) => {
    if(err){ return res.send(err) }
    else { return res.json({data: results})}
    })
})

///////////////////////		Insert Into Tables not used 	//////////////////////
app.get('/createTables_', (req, res) => {
    const {Regno} = req.query

    let post = {Regno};
    let sql = 'INSERT INTO members SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log('New Member '+Username+' added successfully!');
        res.send('202');
    });
});


// Create table
app.get('/createTable', (req, res) => {
    let {sql_query} = req.query
    //let sql = 'CREATE TABLE '+sql_query+'(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    //let sql = sql_query;
    
    testDb.query(sql_query, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});




app.listen('4000', () => {
    console.log('Server started on port 4000');
});