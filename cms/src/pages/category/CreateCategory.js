import React, { useState } from 'react';
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import categoryApi from '../../services/categoryService';
import { useNavigate } from 'react-router-dom';

export default function CreateCategory ()
{

	const [ validated, setValidated ] = useState( false );
	const [ name, setName ] = useState( '' );

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
			}

			const response = await categoryApi.create( data );
			if ( response?.status === 'success' || response?.status === 200 )
			{
				toast( "Thêm mới thành công" );
				navigate( '/category' )
			} else
			{
				toast( response?.message || response?.error || 'error' );
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
							<Breadcrumb.Item href="/category" >
								Hạng phòng
							</Breadcrumb.Item>
							<Breadcrumb.Item active>Thêm mới</Breadcrumb.Item>
						</Breadcrumb>
						<div className={ 'd-flex justify-content-end' }>
							<Link className={ 'btn btn-sm btn-primary' } to={ '/category' } >Trở về</Link>
						</div>
						<Form noValidate validated={ validated } onSubmit={ handleSubmit }>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Tên hạng phòng</Form.Label>
								<Form.Control required type="text" name={ 'name' } placeholder="Lotus"
									onChange={ event => setName( event.target.value ) }
									value={ name } />
								<Form.Control.Feedback type="invalid">
									Tên hạng phòng không được để trống
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
