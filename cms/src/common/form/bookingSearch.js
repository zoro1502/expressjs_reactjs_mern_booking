import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { InputBase } from "../base-form/controlInputForm";
import { useParams } from "react-router-dom";
import { SelectBase } from "../base-form/selectForm";
import cateApi from "../../services/categoryService";
import { STATUS } from "../common";

const search = {
	// name: null,
	room_name: null,
	email: null,
	status: null,
	status_payment: null,
}

const STATUS_BOOKING = [
	{
		_id: 'ĐANG XỬ LÝ',
		name: 'ĐANG XỬ LÝ'
	},
	{
		_id: 'CHẤP NHẬN',
		name: 'CHẤP NHẬN'
	},
	{
		_id: 'HOÀN THÀNH',
		name: 'HOÀN THÀNH'
	},
	{
		_id: 'CANCEL',
		name: 'HỦY'
	},
	{
		_id: 'TỪ CHỐI',
		name: 'TỪ CHỐI'
	},
];
export const BookingSearch = ( props ) =>
{

	const [ form, setForm ] = useState( search );

	const [ category_id, setCategoryId ] = useState( null );
	const [ categories, setCategories ] = useState( [] );
	const handleSubmit = async ( e ) =>
	{
		e.preventDefault();
		props.setParams( form );
		props.getDataList( { page: 1, page_size:  props.paging.page_size, ...form } );

	}

	const resetForm = () =>
	{
		setForm( search )
		props.setParams( search );
		props.getDataList( { page: 1, page_size: props.paging.page_size } );
	}

	const getLists = async (filters) => {
        const response = await cateApi.getLists(filters);
		console.log('cate---------> ', response);
        if (response?.status === 'success' || response?.status === 200) {
            setCategories(response.data.categories);
        }
    }

	useEffect( () =>
	{
		getLists({page_size: 1000})
	}, [] );

	return (
		<Form noValidate onSubmit={ handleSubmit }>
			<Row className="">
				{/* <Form.Group className="mb-3 col-md-3">
					<InputBase form={ form } setForm={ setForm } name={ 'name' }
						label={ 'Tên người đặt: ' }
						key_name={ 'name' } required={ false } placeholder={ 'Nhập người đặt' }
						type={ 'text' } />
				</Form.Group> */}
				<Form.Group className="mb-3 col-md-3">
					<InputBase form={ form } setForm={ setForm } name={ 'email' }
						label={ 'Email: ' }
						key_name={ 'email' } required={ false } placeholder={ 'Nhập Email' }
						type={ 'text' }
					/>
				</Form.Group>
				<Form.Group className="mb-3 col-md-3">
					<InputBase form={ form } setForm={ setForm } name={ 'room_name' }
						label={ 'Tên phòng: ' }
						key_name={ 'room_name' } required={ false } placeholder={ 'Nhập tên phòng' }
						type={ 'text' }
					/>
				</Form.Group>
				<Form.Group className="mb-3 col-md-3">
					<SelectBase form={ form } setForm={ setForm } name={ 'status' }
						label={ 'Trạng thái yêu cầu: ' } data={ STATUS_BOOKING }
						key_name={ 'status' } required={ false } placeholder={ 'Trạng thái yêu cầu' }
						type={ 'text' } />
				</Form.Group>
			</Row>

			<Form.Group className="mb-3">
				<button type="submit" className='btn btn-primary px-3 fs-14 py-2'>Tìm kiếm</button>
				<button type="button"
					onClick={ ( e ) => { resetForm() } }
					className='ms-2 px-3 fs-14 py-2 btn btn-secondary'>Đặt lại</button>
			</Form.Group>
		</Form>
	);
};

