import React, { useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, Button } from 'semantic-ui-react'
import TextInput from '../../app/common/form/TextInput'
import { RootStoreContext } from '../../app/stores/rootStore'
import { IUserFormValues } from '../../app/models/user'
import { FORM_ERROR } from 'final-form'
import { combineValidators, isRequired } from 'revalidate'
import ErrorMessage from '../../app/common/form/ErrorMessage'

const validate = combineValidators({
    username: isRequired('username'),
    displayName: isRequired('displayName'),
    email: isRequired('email'),
    password: isRequired('password')
})

const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext)
    const { register } = rootStore.userStore

    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => register(values).catch(error => ({
                [FORM_ERROR]: error
            }))}
            validate={validate}
            render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
                <Form onSubmit={handleSubmit} error>
                    <Field name='username' component={TextInput} placeholder='Username' />
                    <Field name='displayName' component={TextInput} placeholder='Display Name' />
                    <Field name='email' component={TextInput} placeholder='E-posta adresi' />
                    <Field name='password' component={TextInput} placeholder='Parola' type='password' />
                    {submitError && !dirtySinceLastSubmit && (<ErrorMessage error={submitError} />)}
                    <Button fluid disabled={(invalid && !dirtySinceLastSubmit) || pristine} loading={submitting} positive content='Register' />
                </Form>
            )}
        />
    )
}

export default RegisterForm
