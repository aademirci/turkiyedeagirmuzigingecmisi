import React, { useState } from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Form, Label } from 'semantic-ui-react'
import { DateTimePicker } from 'react-widgets'
import dateFnsLocalizer from 'react-widgets-date-fns';
import { tr } from 'date-fns/locale'

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

const DateInput: React.FC<IProps> = ({ input, width, placeholder, meta: { touched, error } }) => {
    const [open, setOpen]:any = useState(false)
    
    dateFnsLocalizer({ locales: { 'tr': tr } })

    return (
        <Form.Field error={touched && !!error} width={width}>
            <DateTimePicker placeholder={placeholder} value={input.value || null} onChange={input.onChange} onBlur={input.onBlur} onKeyDown={(e) => e.preventDefault()} time={false} max={new Date()} min={new Date(1980, 8, 12)} culture='tr' onFocus={() => setOpen('date')} open={open} onToggle={() => setOpen(false)} />
            {touched && error && (
                <Label basic color='red'>{error}</Label>
            )}
        </Form.Field>
    )
}

export default DateInput
