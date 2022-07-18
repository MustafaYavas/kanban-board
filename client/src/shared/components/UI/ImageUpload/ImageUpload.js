import Button from '../Button';
import styles from './ImageUpload.module.css';

import { useEffect, useState, useRef } from 'react';

const ImageUpload = (props) => {

    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef();

    useEffect(() => {
        if(!file) return;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }, [file])

    const pickedHandler = (e) => {
        let pickedFile;
        let fileIsValid = isValid;
        if(e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    }

    const pickImageHandler = () => {
        filePickerRef.current.click();
    }

    return (
        <div>
            <input 
                type='file' 
                id={props.id} 
                style={{display: 'none'}} 
                accept='.jpg,.png,.jpeg'
                ref={filePickerRef}
                onChange={pickedHandler}
            />
            <div className={`${styles['image-upload']} ${styles.center}`}>
                <div className={styles['image-upload__preview']}>
                    {previewUrl && <img src={previewUrl} alt='Preview' />}
                    {!previewUrl && <p className='text-red-600'>Please pick an image.</p>}
                </div>
                <Button 
                    type='button' 
                    className='border border-blue-600 p-2 rounded-md font-medium hover:bg-blue-600 hover:text-white'
                    onClick={pickImageHandler}
                >
                    Pick Image
                </Button>
            </div>
        </div>
    )
}

export default ImageUpload;