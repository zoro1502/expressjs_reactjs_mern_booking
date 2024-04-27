import React, { useState } from 'react';
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import discountApi from '../../services/discountService';

export default function CreateDiscount ()
{

	const [ validated, setValidated ] = useState( false );
	const [ name, setName ] = useState( '' );
	const [ price, setPrice ] = useState( '' );
	const [ code, setCode ] = useState( '' );
	const [ status, setStatus ] = useState( '' );
	const [ max_use, setMaxUse ] = useState( '' );

	const navigate = useNavigate();

	const handleSubmit = async ( event ) =>
	{
		event.preventDefault();
		const form = event.currentTarget;
		if ( form.checkValidity() === false )
		{
			event.stopPropagation();
		} else
		{
			let data = {
				name: name,
				price: price,
				code: code,
				status: status,
				max_use: max_use
			}
			const response = await discountApi.createDiscount( data );
			if ( response?.status === 'success' || response?.status === 200 )
			{
				toast( "Thêm mới thành công" );
				navigate( '/discount' );
			} else
			{
				toast( response?.message || response?.error || 'error' )
			}
		}

		setValidated( true );
	};

	return (
		<div>
			<Container>
				<Row>
					<Col>
						<Breadcrumb>
							<Breadcrumb.Item href="/discount" >
								Mã giảm giá
							</Breadcrumb.Item>
							<Breadcrumb.Item active>Thêm mới</Breadcrumb.Item>
						</Breadcrumb>
						<div className={ 'd-flex justify-content-end' }>
							<Link className={ 'btn btn-sm btn-primary' } to={ '/discount' } >Trở về</Link>
						</div>
						<Form noValidate validated={ validated } onSubmit={ handleSubmit }>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Tên mã giảm giá:</Form.Label>
								<Form.Control required type="text" name={ 'name' } placeholder="Nhập tên mã giảm giá"
									onChange={ event => setName( event.target.value ) }
									value={ name } />
								<Form.Control.Feedback type="invalid">
									Tên mã giảm giá không được để trống
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Mã code:</Form.Label>
								<Form.Control required type="text" name={ 'code' } placeholder="Nhập mã code"
									onChange={ event =>
									{
										if ( event )
										{
											setCode( event.target.value.trim() )
										}
									}
									}
									value={ code } />
								<Form.Control.Feedback type="invalid">
									Mã code không được để trống
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Giảm giá:</Form.Label>
								<Form.Control required type="text" name={ 'name' } placeholder="Nhập số tiền"
									onChange={ event => setPrice( event.target.value ) }
									value={ price } />
								<Form.Control.Feedback type="invalid">
									Giá giảm không được để trống
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Số lượt dùng:</Form.Label>
								<Form.Control required type="text" name={ 'max_use' } placeholder="Số lượt dùng"
											  onChange={ event => setMaxUse( event.target.value ) }
											  value={ max_use } />
								<Form.Control.Feedback type="invalid">
									Số lượt dùng không được để trống
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Trạng thái:</Form.Label>
								<Form.Select required aria-label="Default select example" onChange={
									e => {
										if(e && e.target.value !== "") {
											setStatus(Number(e.target.value))
										}
									}
								 }>
									<option value="">Chọn trạng thái</option>
									<option value="0" selected={status === 0}>INACTIVE</option>
									<option value="1" selected={status === 1}>ACTIVE</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									Trạng thái không được để trống
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
								<Button type="submit">Lưu dữ liệu</Button>
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
