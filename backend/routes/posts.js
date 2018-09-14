const express = require("express");

const Post = require("../models/post");

const router = express.Router();

// router.use((res, req, next)=>{
//     console.log('middleware up');
//     next();
// });




// router.post('/api/posts', (req, res, next) => {
//     // const post = req.body;
//     const post = new Post({
//         title: req.body.title,
//         content: req.body.content
//     });
//     post.save();
//     console.log(post);    
//     res.status(201).json({
//         message: ' post added succsssfully'
//     });
// });



router.post("", (req, res, next) => {
  console.log('from server: new log added success');    
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "FROM SERVER: Post added successfully",
      postId: createdPost._id
    });
  });
});

router.get('',(req, res, next)=>{
    // res.send('hello from express');
    console.log('FROM SERVER: all logs been updated success');
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    console.log(`pagesize=${pageSize} and currentPage=${currentPage}`);
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage){
        //if available
        postQuery
            .skip(pageSize * (currentPage-1))
            .limit(pageSize);//not retriving all
    }
    // postQuery.find()
    //     .then(documents=>{
    //         res.status(200).json({
    //             message: "FROM SERVER: posts feteched success",
    //             posts: documents
    //         });
    //     });
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return Post.count();
        })
        .then(count=>{
            res.status(200).json({
                message: "FROM SERVER: posts feteched success",
                posts: fetchedPosts,
                maxPosts: count
            });
        });
    // const posts = [
    //     {id: 'readom', title:'server title', content:'server contnet'},
    //     {id: 'readom2', title:'server title2', content:'server contnet2'}
    // ];
    // res.status(200).json({
    //     message: "posts feteched success",
    //     posts: posts
    // });
});
router.put("/:id", (req, res, next)=> {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title, 
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).json({message: "FROM SERVER: update successfully"});
    });
});

router.delete("/:id", (req, res, next) => {
    console.log('is it here '+req.params.id);
    Post.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "FROM SERVER: Post deleted!" });
    });
  });

router.get("/:id", (req, res, next)=> {
    Post.findById(req.params.id).then(post => {
        if(post){//from the database
            res.status(200).json(post);
        }else{
            res.status(404).json({message: "FROM SERVER: post now found"});
        }
    })
})  

module.exports = router;