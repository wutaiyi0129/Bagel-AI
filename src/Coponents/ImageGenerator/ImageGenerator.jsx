import React, { useState, useRef } from 'react'
import './ImageGenerator.css'
import Image from '../Assets/Bagel.png'
const ImageGenerator=()=>{
    const [imageURLs, setImageURLs] = useState([]);
    const [loading,setLoading]=useState(false)
    const [inputParams, setInputParams] = useState([]);
    const [style,setStyle]=useState("")
    let inputRef=useRef(null)
    const ImageGenerator=async()=>{
        if(inputRef.current.value===""){
            return 0
        }
        setInputParams(prevParams => [...prevParams, inputRef.current.value]);
        setLoading(true)
        const response=await fetch('https://api.openai.com/v1/images/generations',{method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:
            `Bearer ${process.env.API_KEY}`,
            "User-Agent":"Chrome"
        },
        body:JSON.stringify({
            prompt:`${"illustation"}${{style}}${inputRef.current.value}`,
            n:1,
            size:"512x512",
        })
    })
    let data =await response.json()
    console.log(data);
    let data_array= data.data
    console.log(data_array)
    setImageURLs((prevURLs) => [...prevURLs, data_array[0]?.url]);

    setLoading(false)
    
    }


    return(
        <div className='ai-image-generator'>
        <div className="header">貝果繪本生成網</div>
      <h1>選擇風格</h1>
      <div className='stylebuttons'>
        <button onClick={()=>setStyle(" watercolor")} 
        className={style === " watercolor" ? "selected" : "styleButton"}>水彩</button>
        <button onClick={()=>setStyle(" Japanese animation")} 
        className={style === " Japanese animation" ? "selected" : "styleButton"}>日式</button>
        <button onClick={()=>setStyle(" American style")}
        className={style === " American style" ? "selected" : "styleButton"}>美式</button>
        <button onClick={()=>setStyle(" funny")}
        className={style === " funny" ? "selected" : "styleButton"}>搞笑</button>
      </div>
        <div className="img-loading">
            <div className="image"><img src={imageURLs.length === 0 ? Image : imageURLs[imageURLs.length - 1]} alt="Generated Image" /></div>
            <div className="loading">
                <div className={loading?"loading-bar-full":"loading-bar"}></div>
            </div>
        </div>
        <div className="search-box">
            <input type='text' ref={inputRef} className='search-input' placeholder='你想要生成怎樣的繪本劇情？'/>
            <div className="generate-btn" onClick={()=>{ImageGenerator()}}>生成</div>
        </div>
        <div className="pages">
                {imageURLs.map((url, index) => (
                    <div className="page" key={index}>
                        <div className="pic">
                        <h1>你的第{index+1}張故事</h1>
                        <img className='book-img' src={url} alt={`Generated Image ${index + 1}`} />
                        </div>
                        <div className="para">
                        <p>{inputParams[index]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ImageGenerator