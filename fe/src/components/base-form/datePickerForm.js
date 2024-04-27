import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { customDate, setField } from "../../common/helper";
import { useEffect } from "react";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const DatePickerForm = ( props ) =>
{
	const [error, setError] = useState('');
	useEffect(() => {
		setError(props.error)
	}, [props.error])
	return (
		<div>
			<DatePicker 
			minDate={ props.minDate }  
			selected={ props.value } 
			required={ props.required || false } 
			className="w-100" 
			maxDate={props.maxDate}
			placeholderText={ props.placeholder || 'tesst' } 
			dateFormat={ 'dd/MM/yyyy' } onChange={ ( date ) =>
			{
				if ( date )
				{
					let value = new Date( date );
					setField( props.form, props.key_name, value, props.setForm );
					setError('')
					props.setError('')
				}

			} } />
			{ error && <p className="invalid-feedback d-block">
				{ props.error }
			</p> }

		</div>
	);
};