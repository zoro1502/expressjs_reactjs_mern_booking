import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { setField } from "../../services/common";

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
			className="w-100 form-control-lg form-control" 
			maxDate={props.maxDate}
			placeholderText={ props.placeholder || 'Vui lòng chọn thời gian' } 
			dateFormat={ 'dd/MM/yyyy' } onChange={ ( date ) =>
			{
				if ( date )
				{
					let value = new Date( date );
					props.setValue( value );
					setError('')
				}

			} } />
			{ error && <p className="invalid-feedback d-block">
				{ props.error }
			</p> }

		</div>
	);
};