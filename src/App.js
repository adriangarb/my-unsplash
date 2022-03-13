import logoUnsplash from './my_unsplash_logo.svg'
import data2 from './images.json'
import './index.scss'
import {useEffect, useState} from 'react'
function App() {
  const [isVisibleAddPhoto, setIsVisibleAddPhoto] = useState(false);
  const [isVisibleDeleteImage, setIsVisibleDeleteImage] = useState(false);
  const [searchInput,setSearchInput] = useState('')
  const [password,setPassword] = useState('')
  const [label,setLabel] = useState('')
  const [url,setUrl] = useState('')
  const truePassword = '1'
  const [data,setData] = useState(data2)
  useEffect(()=>{
    if (localStorage.getItem("data") === null) {
      localStorage.setItem("data", JSON.stringify([]));
    } else {
      let localData = JSON.parse(localStorage.getItem("data"));
      setData(localData);
    }
  },[])
  useEffect(()=>{
    localStorage.setItem('data', JSON.stringify(data))
  },[data])

  const newImage = {
    src: url,
    tittle: label
  }
  const handleAddImage = () =>{
    data.unshift(newImage)
    setIsVisibleAddPhoto(false)
  }
  const handlePasswordChange = (event) =>{
    setPassword(event.target.value)
  }
  const handleLabelChange = (event) =>{
    setLabel(event.target.value)
  }
  const handleUrlChange = (event) =>{
    setUrl(event.target.value)
  }
  const handleInputChange = (event) =>{
    setSearchInput(event.target.value)
  }
  const handleToggleClassAddPhoto = () =>{
    setIsVisibleAddPhoto(prevState=>!prevState)
  }
  const handleToggleClassDeleteImage = (url) =>{
    setIsVisibleDeleteImage(prevState=>!prevState)
    setUrl(url)
  }
  const handleDeleteImage = () =>{
    if(password===truePassword){
      setData(prevState=>prevState.filter(data=>data.src!==url))
      setIsVisibleDeleteImage(false)
      console.log(url)
    }
    else setIsVisibleDeleteImage(false)
  }
  return (
    <div className="App">
      {isVisibleDeleteImage && <div className='App__deleteImage App__card'>
        <div className="App__card__component">
          <h2>Are you sure?</h2>
          <div className='App__card__component__inputs'>
            <span>Password</span>
            <input onChange={handlePasswordChange} type="password" placeholder='Password' />
          </div>
          <div>
            <button onClick={handleToggleClassDeleteImage}>Cancel</button>
            <button onClick={handleDeleteImage}>Delete</button> 
          </div>
        </div>
      </div>}
      {isVisibleAddPhoto && <div className='App__card'>
        <div className="App__AddPhotos__container App__card__component">
          <h2>Add new photo</h2>
          <div className='App__card__component__inputs'>
            <span>Label</span>
            <input onChange={handleLabelChange} type="text" placeholder='Your tittle' />
            <span>Photo URL</span>
            <input onChange={handleUrlChange}  type="text" placeholder='URL' />
          </div>
          <div>
            <button onClick={handleToggleClassAddPhoto}>Cancel</button>
            <button onClick={handleAddImage}>Submit</button>
          </div>
        </div>
      </div>}
      <header>
        <div className="App__search">
          <img src={logoUnsplash} alt="" />
          <input onChange={handleInputChange} placeholder="Search by name" type="text" />
        </div>
        <button onClick={handleToggleClassAddPhoto}>Add a photo</button>
      </header>
      <div className="App__images">
        {data.filter(data=>data.tittle.includes(searchInput)).map(p=>(
        <div className='App__images__image'>
          <img src={p.src} alt="imagee"/>
          <div className="App__images__image__hover">
            <button onClick={()=>handleToggleClassDeleteImage(p.src)}>delete</button>
            <p>{p.tittle}</p>
          </div>
        </div>
          ))}
      </div>
    </div>
  );
}

export default App;
