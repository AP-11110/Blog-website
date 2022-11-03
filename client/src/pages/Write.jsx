import axios from 'axios'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import moment from "moment"

const Write = () => {


  // can access state due to <Link to={`/write?edit=2`} state={post}> in the 'single' page
  const state = useLocation().state;

  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');
  const navigate = useNavigate();
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state ? await axios.put(`/posts/${state.id}`, {
        title, desc: value, cat, img: file ? imgUrl : ""
      }) : await axios.post(`/posts`, {
        title, desc: value, cat, img: file ? imgUrl : "", date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      })
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status</b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: "none"}} type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
          <label className="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className='cat'>
            <input type="radio" checked={cat === "art"} name="cat" value="art" id="art" onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="art">Art</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "Science"} name="cat" value="Science" id="Science" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="art">Science</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "Technology"} name="cat" value="Technology" id="Technology" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="art">Technology</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "Cinema"} name="cat" value="Cinema" id="Cinema" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="art">Cinema</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "Design"} name="cat" value="Design" id="Design" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="art">Design</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "Food"} name="cat" value="Food" id="Food"onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="art">Food</label>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Write