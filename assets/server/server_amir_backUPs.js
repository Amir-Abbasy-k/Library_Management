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
    database : 'nodemysql'
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


///////////////////////		IMPORT PATRONS EXCEL 	//////////////////////
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
        var categorycode = record.categorycode;
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
  
    const sql = `INSERT INTO members (regno, username, firstname, address, currentAddress, city, state, zipcode, country, email, phone, dateofbirth, categorycode, dateenrolled, dateexpiry, accountLevel, sex, password, opacnote) VALUES ('${regno}', '${username}', '${firstname}', '${address}', '${currentAddress}', '${city}', '${state}', '${zipcode}', '${country}', '${email}', '${phone}', '${dateofbirth}', '${categorycode}', '${dateenrolled}', '${dateexpiry}', '${accountLevel}', '${sex}', '${password}', '${opacnote}')`;
    let query = db.query(sql, (err, results) => {
                if(err){
                return res.send(err);
                }
                else {
                    return console.log(regno + 'Patrons successfully imported!');
                }
             });
             
}

//////////////////////////////////////////////////////////////////


///////////////////////		Select Member for login 	//////////////////////

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


///////////////////////		CHECK OUT Books 	//////////////////////
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



///////////////////////		CHECK IN  Books 	//////////////////////
app.get('/check_in', (req, res) => {
    const{bookBarcode} = req.query;
    const sql = `UPDATE check_out SET available = false WHERE book_brcode = '${bookBarcode}'`;
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
    const {bookBarcode,dueDate} = req.query;
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
    let sql = `SELECT * FROM check_out WHERE available = true`;
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




//db.end();

app.listen('4000', () => {
    console.log('Server started on port 4000');
});
