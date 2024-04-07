'use client'; //Since it has event handler

import { useRef, useState } from 'react';

import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({label, name}) {
    const [selectedImage, setSelectedImage] = useState();
    const imageInput = useRef();

    function handleClick() {
        imageInput.current.click();
    }

    function handleSelectedImage(event) {
        const file = event.target.files[0]; // type file input returns such selected files array

        if(!file) {
            setSelectedImage(null); //reset if no image has been selected
            return;
        }

        const fileReader = new FileReader(); //this will help in generating a Data URL for the image src

        fileReader.onload = () => { // this is a callback thet gets triggered once the below function is done
            setSelectedImage(fileReader.result);
        }

        fileReader.readAsDataURL(file); //this is responsible for generating the URL
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>
                {label}
            </label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!selectedImage && <p>No image selected yet!!</p>}
                    {selectedImage && <Image src = {selectedImage} alt='Image picked by user' fill/>}
                </div>
                <input type ='file' id = {name} accept = 'image/png, image/jpeg' required
                 name = {name}  className={classes.input} ref = { imageInput } onChange = {handleSelectedImage}/>
                <button className={classes.button} type = 'button' onClick={handleClick}>Choose Image</button>
            </div>
        </div>
    )
}