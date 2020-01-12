const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const Post = require('../module/post');
const Text = require('../module/image-text');
const checkAuth = require('../middleware/check-auth');

const { TesseractWorker } = require("tesseract.js");

const worker = new TesseractWorker();

const MIME_TYPE_MAP = {
    "image/png" : "png",
    "image/jpeg" : "jpg",
    "image/jpg" : "jpg"
};

const storage = multer.diskStorage({// multer is used to extract incomming files
    destination: (request , file , callback) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid){ 
            error = null;
        }
        callback(error , "backend/images");
    },
    filename: (request , file , callback) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        callback(null , name + "-" + Date.now() + "." + ext);
    }
});

const upload = multer({storage : storage}).single("image");

/*--------------------------GET----------------------------------*/
// router.get("" , (request ,response) => {
//     const pageSize = +request.query.pagesize;
//     const currentPage = +request.query.page;
//     let fetchedPost ;
//     const postQuery = Post.find();
//     if(pageSize && currentPage ){
//         postQuery
//             .skip(pageSize*(currentPage - 1))
//             .limit(pageSize);
//     }
//     postQuery.then( documents => {
//         fetchedPost = documents;
//         return Post.count();
//     })
//     .then( count => {
//         response.status(200).send({
//             message: "Posts fetched succesfully!",
//             posts: fetchedPost,
//             maxPosts: count
//         });
//     });
// });

// router.get("/:id" , (request , response) => {
//     Post.findById(request.params.id).then( post => {
//         if(post){
//             response.status(200).send(post);
//         }else{
//             response.status(404).send({message:'Not Found'});
//         }
//     });
// });

router.get("/:textId" , (request , response) => {
    Text.findById(request.params.textId).then(text => {
        if(text){
            console.log("text : "+ text);
            response.status(200).send(text);
        }else{
            response.status(404).send({message:'Not Found'});
        }
    });
});

/*--------------------------POST----------------------------------*/
router.post("" ,checkAuth ,multer({storage:storage}).single("image"), (request ,response ,next) => {
    const url = request.protocol + "://" + request.get("host");
    const post = new Post({
        title : request.body.title,
        content : request.body.content,
        imagePath : url + "/images/" + request.file.filename
    });

    console.log(post);
    post.save().then(createdPost => {
        response.status(200).send({
            message : 'message' , 
            post : {
                ...createdPost,
                id :createdPost._id
            }
        });
    });
});

router.post("/upload" ,checkAuth ,multer({storage:storage}).single("image"), (request ,response ,next) => {
    upload(request, response, err => {
        let text;
        fs.readFile(`./backend/images/${request.file.filename}`, (err, data) => {
          if (err) return console.log(`this is a error ${err.message}`);
          worker
            .recognize(data, "eng", { tessjs_create_pdf: "1" })
            .progress(p => console.log(p))
            .then( result => {
                const text = new Text({
                    text : result.text
                });
                console.log(text);
                this.text = text;
                text.save();
                response.send({
                    textId : text._id
                })
                next();
            })
            .finally(() => worker.terminate());
        });
      });
  });

router.put("/:id", checkAuth ,multer({storage:storage}).single("image"), (request ,response) => {
    // console.log(request.file);
    let imagePath = request.body.imagePath;
    if (request.file) {
      const url = request.protocol + "://" + request.get("host");
      imagePath = url + "/images/" + request.file.filename
    }
    const post = new Post({
        _id : request.body.id,
        title : request.body.title,
        content : request.body.content,
        imagePath: imagePath
    });
    Post.updateOne({_id:request.params.id} , post).then(
        response.status(200).send({message:'post updated'})
    );
});

router.delete("/:id" , checkAuth , (request , response)=>{
    Post.deleteOne({ _id:request.params.id}).then(result => {
         console.log(result);
         response.status(200).send({
            message:'post was deleted'
        });
    });
});

module.exports = router;