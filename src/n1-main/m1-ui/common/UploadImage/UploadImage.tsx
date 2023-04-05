import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react'

import Button from '@mui/material/Button'
import {UseFormSetValue} from 'react-hook-form'

import defaultCover from 'n1-main/m1-ui/images/defaultCover.svg'
import {convertFileToBase64} from 'n1-main/m1-ui/utils'

type UploadPackImageType = {
    buttonName: string
    cover?: string
    setValue: UseFormSetValue<any>
    valueId: string
}

export const UploadImage = ({
                                    buttonName,
                                    cover,
                                    setValue,
                                    valueId,
                                    ...props
                                }: UploadPackImageType) => {
    const [image, setImage] = useState<string | undefined>(cover)

    useEffect(() => {
        setImage(cover)
    }, [])

    const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            console.log('file: ', file)

            if (!/^image\//.test(file.type)) {
                alert(`File ${file.name} is not an image.`)

                return false
            }

            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    console.log('file64: ', file64)
                    setImage(file64)
                    setValue(valueId, file64)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
                alert(`File ${file.name} is to large. Should be less then 4 MB`)

                return false
            }
        } else return false
    }

    /**
     * https://stackoverflow.com/a/48222599
     */
    const errorHandler = (event: SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.onerror = null
        event.currentTarget.src = defaultCover
    }

    return (
        <>
            <label>
                <input
                    type="file"
                    accept="image/*"
                    id={valueId}
                    style={{display: 'none'}}
                    onChange={imageUploadHandler}
                />
                <Button variant="text" color={'primary'} component="span" sx={{marginTop: '20px'}}>
                    {buttonName}
                </Button>
            </label>
            {image && (
                <img
                    src={image}
                    style={{width: '100%', height: '150px', margin: '10px'}}
                    onError={errorHandler}
                    alt="packImage"
                />
            )}
        </>
    )
}
