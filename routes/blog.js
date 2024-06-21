const {Router}= require('express');
const Blog= require('../models/blog');
const Comment= require('../models/comment');
const multer= require('multer');
const path= require('path');
const router= Router();


//multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/upload'))
    },
    filename: function (req, file, cb) {
      const fileName= `${Date.now()}-${file.originalname}`;
      cb(null,fileName);
    }
  })
  
const upload = multer({ storage: storage })



router.get('/addBlog', (req, res) => {
    res.render('addBlog',{user: req.user});
});

router.get('/:id',async (req, res)=>{
    const blog= await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({blogId:req.params.id}).populate("createdBy");
    res.render('blog',{user: req.user, blog,comments});
});

router.post('/addBlog', upload.single('coverImage'), async (req, res) => {
    const {title, body}= req.body;
    const blog=await Blog.create({
        title: title,
        body: body,
        createdBy: req.user._id,
        coverImageUrl:`/upload/${req.file.filename}`,
    })
    return res.redirect('/');
    // return res.redirect(`/blog/${blog._id}`);
})

router.post('/comment/:blogId',async (req, res) => {
  const {content}= req.body;
  await Comment.create({
    content: content,
    blogId: req.params.blogId,
    createdBy: req.user._id
  })
  return res.redirect(`/blog/${req.params.blogId}`);
})

module.exports = router;