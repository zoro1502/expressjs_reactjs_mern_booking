import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { InputBase } from "../base-form/controlInputForm";
import { categoryService } from "../../services/feService/categoryService";
import { useParams } from "react-router-dom";
import { SelectBase } from "../base-form/selectForm";

export const FormRoomSearch = (props) => {

	const [form, setForm] = useState({
		size: null,
		bed: null,
		vote_number: null,
		name: null,
		price: null,
		customer: null,
		floors: null,
		category_id: null
	});

	const [category_id, setCategoryId] = useState(null);
	const [categories, setCategories] = useState([]);
	const params = useParams();
	const handleSubmit = async (e) => {
		e.preventDefault();
		props.setParams(form);
		props.getDataList({ page: 1, page_size: props.paging.page_size, ...form });

	}

	const resetForm = () => {
		setForm({
			size: null,
			bed: null,
			vote_number: null,
			price: null,
			customer: null,
			name: null,
			floors: null,
			category_id: null
		})
		props.setParams({
			size: null,
			bed: null,
			vote_number: null,
			name: null,
			customer: null,
			floors: null,
			price: null,
			category_id: null
		});
		props.getDataList({ page: 1, page_size: props.paging.page_size });
	}


	const getListsMenu = async () => {
		const response = await categoryService.getDataList({
			page_size: 1000
		})
		if (response?.status === 'success' || response?.status === 200) {
			setCategories(response.data.categories);
		}
	}

	useEffect(() => {
		getListsMenu().then(r => { });
	}, []);

	return (
		<Form noValidate onSubmit={handleSubmit}>
			<Row className="">
				<Form.Group className="mb-3 col-md-12">
					<SelectBase form={form} setForm={setForm} name={'category_id'}
						label={'Hạng phòng: '} data={categories}
						key_name={'category_id'} required={false} placeholder={'Hạng phòng'}
						type={'text'} />
				</Form.Group>
				<Form.Group className="mb-3 col-md-12">
					<InputBase form={form} setForm={setForm} name={'name'}
						label={'Tên phòng: '}
						key_name={'name'} required={false} placeholder={'Nhập tên phòng'}
						type={'text'}
					/>
				</Form.Group>

				<Form.Group className="mb-3 col-md-12">
					<InputBase form={form} setForm={setForm} name={'price'}
						label={'Giá phòng: '}
						key_name={'price'} required={false} placeholder={'Nhập giá phòng'}
						type={'text'}
					/>
				</Form.Group>

				<Form.Group className="mb-3 col-md-12">
					<InputBase form={form} setForm={setForm} name={'size'}
						label={'Diện tích phòng: '}
						key_name={'size'} required={false} placeholder={'Nhập diện tích phòng'}
						type={'text'}
					/>
				</Form.Group>

				<Form.Group className="mb-3 col-md-12">
					<InputBase form={form} setForm={setForm} name={'bed'}
						label={'Giường ngủ: '}
						key_name={'bed'} required={false} placeholder={'Nhập số giường ngủ'}
						type={'text'}
					/>
				</Form.Group>

				<Form.Group className="mb-3 col-md-12">
					<InputBase form={form} setForm={setForm} name={'floors'}
						label={'Tầng: '}
						key_name={'floors'} required={false} placeholder={'Nhập số tầng'}
						type={'text'}
					/>
				</Form.Group>

				<Form.Group className="mb-3 col-md-12">
					<InputBase form={form} setForm={setForm} name={'customer'}
						label={'Số khách: '}
						key_name={'customer'} required={false} placeholder={'Nhập số khách'}
						type={'text'}
					/>
				</Form.Group>

			</Row>

			<Form.Group className="mb-3 d-flex justify-content-center">
				<button type="submit" className='btn btn-primary px-3 fs-14 py-2'>Tìm kiếm</button>
				<button type="button"
					onClick={(e) => { resetForm() }}
					className='ml-2 px-3 fs-14 py-2 btn btn-secondary'>Đặt lại</button>
			</Form.Group>
		</Form>
	);
};

