import { observer } from 'mobx-react-lite'
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Grid, Header, Image } from 'semantic-ui-react'
import PhotoWidgetCropper from './PhotoWidgetCropper'
import PhotoWidgetDropzone from './PhotoWidgetDropzone'

interface IProps {
    loading: boolean
    uploadPhoto: (file: Blob) => void
    cropping: boolean
}

const PhotoUploadWidget: React.FC<IProps> = ({loading, uploadPhoto, cropping}) => {
    const [files, setFiles] = useState<any[]>([])
    const [image, setImage] = useState<Blob | null>(null)

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    })

    return (
        <Fragment>
            <Grid>
                <Grid.Column width={cropping ? 4 : 6}>
                    <Header color='teal' sub content='Step 1 - Add Photo' />
                    <PhotoWidgetDropzone setFiles={setFiles} />
                </Grid.Column>
                <Grid.Column width={cropping ? 1 : 2} />
                {cropping &&
                    <Fragment>
                        <Grid.Column width={4}>
                            <Header color='teal' sub content='Step 2 - Resize image' />
                            {files.length > 0 && <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview} />}
                        </Grid.Column>
                        <Grid.Column width={1} />
                    </Fragment>}
                <Grid.Column width={cropping ? 4 : 6} >
                    <Header color='teal' sub content='Step 3 - Preview and Upload' />
                    {files.length > 0 && 
                        <Fragment>
                            <Button.Group widths={2}>
                                <Button positive icon='check' loading={loading} onClick={() => {cropping ? uploadPhoto(image!) : uploadPhoto(files[0])}} />
                                <Button icon='close' disabled={loading} onClick={() => setFiles([])} />
                            </Button.Group>
                            {cropping ?
                                <div className='img-preview' style={{minHeight: '200px', overflow: 'hidden'}} />
                            :
                                <Image src={files[0].preview} />
                            }
                        </Fragment>
                         }
                </Grid.Column>
            </Grid>
        </Fragment>
    )
}

export default observer(PhotoUploadWidget)
