import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Button, Grid, Header, Tab } from 'semantic-ui-react'
import { IProfile } from '../../app/models/profile'
import { RootStoreContext } from '../../app/stores/rootStore'
import ProfileEditForm from './ProfileEditForm'

const ProfileDescription = () => {
    const rootStore = useContext(RootStoreContext)
    const {updateProfile, profile, isCurrentUser} = rootStore.profileStore
    const [editMode, setEditMode] = useState(false)

    const handleUpdateProfile = (profile: IProfile) => {
        updateProfile(profile).then(() => setEditMode(false))
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={`About ${profile!.username}`} />
                    {isCurrentUser && (
                        <Button floated='right' basic content={editMode ? 'Cancel' : 'Edit Profile'} onClick={() => setEditMode(!editMode)} />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editMode ? (
                        <ProfileEditForm updateProfile={handleUpdateProfile} profile={profile!} />
                    ) : (
                        <span>{profile!.bio}</span>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfileDescription)

