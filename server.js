const express=require('express')
const app=express()
const books=require('./books.js')
app.use(express.json()) //middleware for converting to js object

const PORT=5000;

app.get('/',(req,res)=>{
    res.json({
        staus:"success",
        message:"welcome to my book store"
    })
})

app.get('/book',(req,res)=>{
    res.json
    ({
        message:"Retrieving books",
        data: books
    })
})

app.post('/book',(req,res)=>{
    console.log(req.body)
    const{id,title,author}=req.body
    console.log(id,title,author);
    const book=books.find((ele)=>{
        return ele.id == id
    })
    console.log(book);
    
    if(!book){
        const newBook={id:id,title:title,author:author}
        books.push(newBook)
        res.json({
                message:"Added books",
                newBook: newBook,
                data:books
            }).status(200)
    }
    else{
        res.json({
            message:"Not possible to add"
        })
    }
})

app.get('/book/:id',(req,res)=>{
    const{id}=req.params
    // console.log(typeof id); //String format
    const book=books.find((ele)=>{
        return parseInt(ele.id) == parseInt(id);
    })
    if(book){
        res.json({
            message:'Book fetched',
            data:book
        })
    }
    else{
        res.status(404).send("Book not available")
    }
    
})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
})