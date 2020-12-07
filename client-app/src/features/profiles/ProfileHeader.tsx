import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Button, Divider, Grid, Header, Item, Modal, Reveal, Segment, Statistic } from 'semantic-ui-react'
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget'
import { IProfile } from '../../app/models/profile'
import { RootStoreContext } from '../../app/stores/rootStore'

interface IProps {
    profile: IProfile
}

const ProfileHeader: React.FC<IProps> = ({profile}) => {
    const rootStore = useContext(RootStoreContext)
    const {uploadPhoto, uploadingPhoto} = rootStore.profileStore
    const [open, setOpen] = React.useState(false)

    const handleUploadImage = (photo: Blob) => {
        uploadPhoto(photo, true).then(() => setOpen(false))
    }

    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1'>{profile.displayName}</Header>
                                <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button>Show Modal</Button>}>
                                    <Modal.Content>
                                        <PhotoUploadWidget uploadPhoto={handleUploadImage} loading={uploadingPhoto} cropping={true} />
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button color='black' onClick={() => setOpen(false)}>Nope</Button>
                                    </Modal.Actions>
                                </Modal>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Takipçi' value='5' />
                        <Statistic label='Takipte' value='42' />
                    </Statistic.Group>
                    <Divider />
                    <Reveal animated='move'>
                        <Reveal.Content visible style={{ width: '100%' }}>
                            <Button fluid color='teal' content='Takip ediyor' />
                        </Reveal.Content>
                        <Reveal.Content hidden>
                            <Button fluid basic color={true ? 'red' : 'green'} content={true ? 'Takipten çık' : 'Takip et'} />
                        </Reveal.Content>
                    </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default observer(ProfileHeader)
