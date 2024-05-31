// จัดการ Routing
const express = require('express');
const router = express.Router();
const dbConnection = require('../database'); // Import the dbConnection module
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const ifLoggedin = (req, res, next) => {
    if (req.session.isLoggedIn) {
        res.redirect('/');
    } else {
        next();
    }
};

// Root Page Start
router.get('/', (req, res) => {
    if (req.session.userID) {
        dbConnection.execute("SELECT `name` FROM `users` WHERE `id`=?", [req.session.userID])
            .then(([rows]) => {
                if (rows.length > 0) {
                    res.render('home', {
                        name: rows[0].name
                    });
                } else {
                    res.render('home', {
                        name: 'Guest'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.render('home', {
                    name: 'Guest'
                });
            });
    } else {
        res.render('home', {
            name: 'Guest'
        });
    }
}); // Root Page End

// Login Start
router.get('/login', (req, res) => {
    res.render('login-register');
}); // Login end

// Logout Start
router.get('/logout', (req, res) => {
    req.session.isLoggedIn = false;
    //session destroy
    req.session = null;
    res.redirect('/');
}); // Logout end

// ตรวจสอบข้อมูล register Start
router.post('/register', ifLoggedin, 
// post data validation(using express-validator)
[
    body('user_email','Invalid email address!').isEmail().custom((value) => {
        return dbConnection.execute('SELECT `email` FROM `users` WHERE `email`=?', [value])
        .then(([rows]) => {
            if(rows.length > 0){
                return Promise.reject('This E-mail already in use!');
            }
            return true;
        });
    }),
    body('user_name','Username is Empty!').trim().not().isEmpty(),
    body('user_pass','The password must be of minimum length 6 characters').trim().isLength({ min: 6 }),
],// end of post data validation
(req,res,next) => {
    const validation_result = validationResult(req);
    const {user_name, user_pass, user_email} = req.body;
    // IF validation_result HAS NO ERROR
    if(validation_result.isEmpty()){
        // password encryption (using bcryptjs)
        bcrypt.hash(user_pass, 12).then((hash_pass) => {
            // INSERTING USER INTO DATABASE
            dbConnection.execute("INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)",[user_name,user_email, hash_pass])
            .then(result => {
                res.send(`your account has been created successfully, Now you can <a href="/">Login</a>`);
            }).catch(err => {
                // THROW INSERTING USER ERROR'S
                if (err) throw err;
            });
        })
        .catch(err => {
            // THROW HASING ERROR'S
            if (err) throw err;
        })
    }
    else{
        // COLLECT ALL THE VALIDATION ERRORS
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH VALIDATION ERRORS
        res.render('login-register',{
            register_error:allErrors,
            old_data:req.body
        });
    }
});// ตรวจสอบข้อมูล register End


// ตรวจสอบข้อมูล Login Start
router.post('/login', ifLoggedin, [
    // ตรวจสอบอีเมลว่ามีอยู่ในฐานข้อมูลหรือไม่
    body('user_email').custom((value) => {
        return dbConnection.execute('SELECT email FROM users WHERE email=?', [value])
        .then(([rows]) => {
            if(rows.length == 1){
                return true;                
            }
            return Promise.reject('Invalid Email Address!');            
        });
    }),
    // ตรวจสอบว่ารหัสผ่านไม่เป็นค่าว่าง
    body('user_pass','Password is empty!').trim().not().isEmpty(),
], (req, res) => {
    // รวบรวมผลการตรวจสอบข้อมูล
    const validation_result = validationResult(req);
    const {user_pass, user_email} = req.body;
    if(validation_result.isEmpty()){
        // ดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้อีเมล
        dbConnection.execute("SELECT * FROM `users` WHERE `email`=?", [user_email])
        .then(([rows]) => {
            if (rows.length === 1) {
                // เปรียบเทียบรหัสผ่านที่ได้รับกับรหัสผ่านที่เข้ารหัสในฐานข้อมูล
                bcrypt.compare(user_pass, rows[0].password).then(compare_result => {
                    if (compare_result === true) {
                        // ตั้งค่า session ว่าล็อกอินแล้วและบันทึก userID
                        req.session.isLoggedIn = true;
                        req.session.userID = rows[0].id;
                        // เปลี่ยนเส้นทางไปยังหน้าแรก
                        res.redirect('/');
                    } else {
                        // แสดงข้อความผิดพลาดเมื่อรหัสผ่านไม่ถูกต้อง
                        res.render('login-register', {
                            login_errors: ['Invalid Password!']
                        });
                    }
                }).catch(err => {
                    if (err) throw err;
                });
            } else {
                // แสดงข้อความผิดพลาดเมื่ออีเมลไม่ถูกต้อง
                res.render('login-register', {
                    login_errors: ['Invalid Email Address!']
                });
            }
        }).catch(err => {
            if (err) throw err;
        });
    } else {
        // รวบรวมข้อผิดพลาดทั้งหมดจากการตรวจสอบข้อมูล
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // แสดงหน้า login-register พร้อมกับข้อผิดพลาดที่รวบรวมได้
        res.render('login-register',{
            login_errors:allErrors
        });
    }
});
// ตรวจสอบข้อมูล Login End

module.exports = router;