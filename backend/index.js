const con = require('./connection')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(express.json())
app.use(bodyParser.json())
const port = 2022
const cors = require('cors')
app.use(cors())
const multer = require('multer')

const storage = multer.diskStorage({
  destination: './upload/imges',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })
app.use('/profile', express.static('upload/imges'))

app.post('/postImage', upload.single('profile'), (req, res) => {
  const data = ({
    categoryName: req.body.categoryName,
    categoryImage: `http://localhost:2022/profile/${req.file.filename}`,
  })
  con.query("INSERT INTO category SET ? ", data, (err, result) => {
    if (err) {
      return res.json({
        success: 0,
        message: "Category not added, Please try again"
      })
    } else {
      return res.json({
        success: 1,
        message: "Category Added Successfully.",
        profile: `http://localhost:2022/profile/${req.file.filename}`,
      })
    }
  })
})

app.get('/getDataForCategory', (req, res) => {
  con.query("SELECT * FROM category", (err, result) => {
    if (err) {
      return res.json({
        success: 0,
        message: "Failed to get data",
      })
    } else {
      return res.json({
        success: 1,
        data: result
      })
    }
  })
})

app.post('/postData', (req, res) => {
  const { name, email, password, gender } = req.body;
  con.query("SELECT * FROM signup WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: 0, message: "Internal server error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ success: 0, message: "Email already exists" });
    }
    const data = {
      name: name,
      email: email,
      gender: gender,
      password: password,
      createdat: new Date().toLocaleString(),
    };

    con.query("INSERT INTO signup SET ?", data, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: 0, message: "Error occurred while inserting data" });
      }

      return res.status(201).json({ success: 1, message: "Signup successful" });
    });
  });
})
app.post('/login', (req, res) => {
  const email = req.body.email;

  con.query('SELECT * FROM signup WHERE email =  ?', email, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if (result && result.length > 0) {

        if (result[0].password == req.body.password) {
          const lastlogin = new Date().toLocaleString()
          con.query('UPDATE signup SET lastlogin = ? WHERE email = ? ', [lastlogin, email], (error, resp) => {
            if (error) {
              return res.json({
                success: 0,
                message: "Invalid Credentials",
              })
            } else {
              return res.json({
                success: 1,
                message: "Login successfully",
                data: result
              })
            }
          })
        } else {
          return res.json({
            success: 0,
            message: "Password doesn't matched"
          })
        }
      } else {
        return res.json({
          success: 0,
          message: "User doesn't exist"
        })
      }
    }
  })
})

app.get('/getData', (req, res) => {
  con.query("SELECT * FROM signup", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/getData/:id', (req, res) => {
  const id = req.params.id
  con.query("SELECT * FROM signup WHERE id = ? ", id, (err, result) => {
    if (err) {
      return res.json({
        success: 0,
        message: 'Error while Searching a user.'
      });
    } else {
      return res.json({
        success: 1,
        data:result
      });
    }
  })
})
app.patch('/update/:id', (req, res) => {
  const id = req.params.id;
  const data = [req.body.name, req.body.email, req.body.password, id];
  con.query("UPDATE signup SET name=?, email=?, password=? WHERE id=?", data, (err, result) => {
    if (err) {
      return res.json({
        success: 0,
        message: 'Error while updating a User details.'
      });
    } else {
      return res.json({
        success: 1,
        message: 'Updated Successfully.'
      });
    }
  })
})
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM signup WHERE id=?", id, (err) => {
    if (err) {
      return res.json({
        success: 0,
        message: 'User not removed, Please try again'
      });
    } else {
      return res.json({
        success: 1,
        message: 'User Removed Successfully'
      });
    }
  })
})


// admin

// app.post('/postDataAdmin', (req, res) => {
//   const data = ({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   con.query("INSERT INTO adminsignup SET ?", data, (err, result) => {
//     if (err) {
//       console.log(err)
//     }
//     else {
//       res.send(result)
//     }
//   })
// })
// app.get('/getDataAdmin', (req, res) => {
//   con.query("SELECT * FROM adminsignup", (err, result) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.send(result)
//     }
//   })
// })

app.post('/adminLogin', (req, res) => {
  const email = req.body.email;
  con.query('SELECT * FROM adminsignup WHERE email =  ?', email, (err, result) => {
    if (err) {
      return res.json({
        success: 0,
        message: "Invalid Credentials",
      })
    } else {
      if (result && result.length > 0) {

        if (result[0].password == req.body.password) {
          return res.json({
            success: 1,
            message: "Login Successfull",
            data: result
          })

        } else {
          return res.json({
            success: 0,
            message: "Invalid Credentials"
          })
        }
      } else {
        return res.json({
          success: 0,
          message: "User doesn't register."
        })
      }
    }
  })
})


//add item 


const storageAdd = multer.diskStorage({
  destination: './upload/addproduct',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + file.originalname)
  }
})

const uploadAdd = multer({ storage: storageAdd })
app.use('/image', express.static('upload/addproduct'))

app.post('/addItem', uploadAdd.single('image'), (req, res) => {
  const data = ({
    image: `http://localhost:2022/image/${req.file.filename}`,
    companyName: req.body.companyName,
    deviceName: req.body.deviceName,
    originalPrice: req.body.originalPrice,
    currentPrice: req.body.currentPrice,
    discount: req.body.discount,
    description: req.body.description,
    category: req.body.category,
  })
  con.query("INSERT INTO additem SET ? ", data, (err, result) => {
    if (err) {
      return res.json({
        success: 0,
        message: "Error While Inserting Data!"
      })
    } else {
      return res.json({
        success: 1,
        message: "Item Added Successfully.",
        image: `http://localhost:2022/image/${req.file.filename}`,
      })
    }
  })
})

app.get('/getDataForItem', (req, res) => {
  con.query("SELECT * FROM additem", (err, result) => {
    if (err) {
      return res.json({
        success: 0,
        message: "Item Not Found.",
      })
    } else {
      return res.json({
        success: 1,
        data:result,
      })
    }
  })
});
// app.get('/getDataForItem/:id', (req, res) => {
//   con.query("SELECT * FROM additem WHERE id = ?", (err, result) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.send(result)
//     }
//   })
// });
app.get('/getDataForSearch/:deviceName', (req, res) => {
  const deviceName = req.params.deviceName;
  con.query("SELECT * FROM additem WHERE deviceName = ? ", deviceName, (err, result) => {
    if (err) {
      return res.json({
        success: 0,
        message: "Can't Find Product"
      })
    } else {
      return res.json({
        success: 1,
        data: result
      })
    }
  })
})

app.get('/getDataForItem/:id', (req, res) => {
  const id = req.params.id
  con.query("SELECT * FROM additem WHERE id = ? ", id, (err, result) => {
    if (err) {
      return res.json({
        success: 0,
        message: "can't find product"
      });
    } else {
      return res.json({
        success: 1,
        data: result
      });

    }
  })
})

//bag item

app.post('/addToBag', (req, res) => {
  const { productId, userId } = req.body;
  const data = {
    productId,
    userId
  };

  con.query('INSERT INTO bagitem SET ?', data, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add item to bagitem' });
    }
    console.log('Item added to Bag', result);
    res.status(200).json({ message: 'Item added to bagitem', itemId: result.insertId });
  });
});

app.get('/getBagItem/:id', (req, res) => {
  const id = req.params.id;
  con.query("SELECT * FROM bagitem B JOIN additem A ON B.productId = A.id WHERE B.userId = ?", id, (err, result) => {
    if (err) {
      return res.json({
        success: 0,
        message: "Failed to find bag products",
        error: err.message
      });
    } else {
      return res.json({
        success: 1,
        data: result
      });
    }
  });
});

// app.get('/getBagItem', (req, res) => {
//   con.query("SELECT b.*, A.* FROM bagitem b JOIN additem A ON b.productId = A.id", (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.json({
//         success: 0,
//         message: "Failed to fetch bag items",
//         error: err.message
//       });
//     } else {
//       return res.json({
//         success: 1,
//         message: "Bag items fetched successfully",
//         data: result
//       });
//     }
//   });
// });



// app.get('/getBagItem/:id', (req, res) => {
//   const id = req.params.id
//   con.query("SELECT * FROM bagitem WHERE userId = ? ", id, (err, result) => {
//     if (err) {
//       return res.json({
//         success: 0,
//         message: "Failed to find bag products"
//       })
//     } else {
//       return res.json({
//         success: 1,
//         data: result
//       })
//     }
//   })
// })
app.delete('/deleteBagItem/:id', (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM bagitem WHERE productId=?", id, (err) => {
    if (err) {
      return res.json({
        success: 0,
        message: 'Product Not Removed, Please Try Again'
      });
    } else {
      return res.json({
        success: 1,
        message: 'Product Removed Successfully.'
      });
    }
  })
})

// delivery

app.post('/delivery', uploadAdd.single('image'), (req, res) => {
  const data = ({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    pincode: req.body.pincode,
    locality: req.body.locality,
    address: req.body.address,
    cityTownDistrict: req.body.cityTownDistrict,
    state: req.body.state,
    productId: req.body.productId,
    userId: req.body.userId,
    orderdate: new Date().toLocaleString(),
  })
  con.query("INSERT INTO delivery SET ? ", data, (err, result) => {
    if (err) {
      return res.json({
        success: 0,
        message: "Error While Booking a Product",
      })
    } else {
      return res.json({
        success: 1,
        message: "Order Confirmed",
      })
    }
  })
})
app.get('/getDelivery', (req, res) => {
  con.query("SELECT b.*, A.* FROM delivery b JOIN additem A ON b.productId = A.id", (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        success: 0,
        message: "Failed to fetch bag items",
        error: err.message
      });
    } else {
      return res.json({
        success: 1,
        message: "Bag items fetched successfully",
        data: result
      });
    }
  });
});



app.get('/getDelivery/:id', (req, res) => {
  const id = req.params.id
  con.query("SELECT * FROM bagitem WHERE id = ? ", id, (err, result) => {
    if (err) {
      return res.json({
        success: 0,
        message: "Error While Fetching a Product",
      })
    } else {
      return res.json({
        success: 1,
        message: "success",
      })
    }
  })
})
app.delete('/deleteDelivery/:id', (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM delivery WHERE productId=?", id, (err) => {
    if (err) {
      return res.json({
        success: 0,
        message: 'Order not deleted. Please try again'
      });
    } else {
      return res.json({
        success: 1,
        message: 'Order Deleted Successfully'
      });
    }
  })
})

app.listen(port, () => {
  console.log(`Port is running on ${port}`)
})