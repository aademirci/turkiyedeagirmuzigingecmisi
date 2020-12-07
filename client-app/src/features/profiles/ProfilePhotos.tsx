import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useState } from 'react'
import { Card, Header, Tab, Image, Button, Grid, Modal } from 'semantic-ui-react'
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget'
import { RootStoreContext } from '../../app/stores/rootStore'

const ProfilePhotos = () => {
    const rootStore = useContext(RootStoreContext)
    const {profile, isCurrentUser, uploadPhoto, uploadingPhoto, setMainPhoto, deletePhoto, loading} = rootStore.profileStore
    const [addPhotoMode, setAddPhotoMode] = useState(false)
    const [open, setOpen] = React.useState(false)
    const [target, setTarget] = useState<string | undefined>(undefined)
    const [deleteTarget, setDeleteTarget] = useState<string | undefined>(undefined)
    const [current, setCurrent] = useState(0)

    const handleUploadImage = (photo: Blob) => {
        uploadPhoto(photo, false).then(() => setAddPhotoMode(false))
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: 0}}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser &&
                    <Button floated='right' basic content={addPhotoMode ? 'Cancel' : 'Add Photo'} onClick={() => setAddPhotoMode(!addPhotoMode)} />}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handleUploadImage} loading={uploadingPhoto} cropping={false} />
                    ) : (
                        <Fragment>

                        
                        <Card.Group itemsPerRow={5}>
                            {profile && profile.photos.map((photo, index) => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} onClick={() => {setOpen(true); setCurrent(index)}} />
                                    {isCurrentUser && 
                                        <Button.Group fluid widths={2}>
                                            {photo.isSquare && <Button name={photo.id} onClick={(e) => {setMainPhoto(photo); setTarget(e.currentTarget.name)}} disabled={photo.isMain} loading={loading && target === photo.id} basic positive content='Main' /> }
                                            <Button name={photo.id} disabled={photo.isMain} onClick={(e) => {deletePhoto(photo); setDeleteTarget(e.currentTarget.name)}} loading={loading && deleteTarget === photo.id} basic negative icon='trash' />
                                        </Button.Group>
                                    }
                                </Card>
                            ))}
                        </Card.Group>
                        <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} centered={false} >
                            <Modal.Header>Upload image</Modal.Header>
                            <Modal.Content image scrolling>
                                <Image src={profile?.photos[current].url} wrapped />
                                <Modal.Description>
                                <p>Would you like to upload this image?</p>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={() => setOpen(false)}>Cancel</Button>
                                <Button onClick={() => setCurrent(current + 1)} positive>
                                Ok
                                </Button>
                            </Modal.Actions>
                        </Modal>
                        </Fragment>
                    )} 
                </Grid.Column>
            </Grid>
            
            
        </Tab.Pane>
    )
}

export default observer(ProfilePhotos)
