import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adminApi from "../../services/adminService";
import roleApi from "../../services/roleService";
import uploadApi from '../../services/uploadService';
import ImageForm from '../../common/form/imageForm';
import { SelectBase } from '../../common/base-form/selectForm';
import { gender } from '../../common/common';
import { DatePickerForm } from '../../common/form/datePickerForm'


export default function CreateAdmin() {

	const [validated, setValidated] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [sex, setSex] = useState('Nam');
	const [birthday, setBirthday] = useState('');
	const [avatar, setAvatar] = useState(null);
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState(null);
	const [roles, setRoles] = useState([]);
	const [checked, setChecked] = useState([]);
	const navigate = useNavigate();

	const [change, setChange] = useState(false);

	const [fileAlbums, setFileAlbums] = useState([
		{
			imgBase64: null,
			file: null
		}
	]);


	const getListsRoles = async () => {
		const response = await roleApi.index({
			page_size: 1000
		})
		if (response?.status === 'success' || response?.status === 200) {
			setRoles(response.data.roles);
		}
	}

	const handleCheck = (event) => {
		var updatedList = [...checked];
		if (event.target.checked) {
			updatedList = [...checked, event.target.value];
		} else {
			updatedList.splice(checked.indexOf(event.target.value), 1);
		}
		setChecked(updatedList);
	};

	useEffect(() => {
		getListsRoles({ ...{} }).then(r => { });
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			let data = {
				name: name,
				avatar: avatar,
				email: email,
				phone: phone,
				birthday: birthday,
				sex: sex,
				password: password,
				roles: checked
			}

			const albums = await uploadApi.uploadMultiImg(fileAlbums);
			if (albums?.length > 0) {
				data.avatar = albums[0]
			}

			const response = await adminApi.create(data);
			if (response.status === 'success' || response.status === 200) {
				toast("Thêm mới thành công");
				navigate('/admin')
			} else {
				toast(response?.message || response?.error || 'error');
			}
		}

		setValidated(true);
	};

	return (
		<div>
			<Container>
				<Row>
					<Col>
						<Breadcrumb>
							<Breadcrumb.Item href="/admin" >
								Admin
							</Breadcrumb.Item>
							<Breadcrumb.Item active>Thêm mới</Breadcrumb.Item>
						</Breadcrumb>
						<div className={'d-flex justify-content-end'}>
							<Link className={'btn btn-sm btn-primary'} to={'/admin'} >Trở về</Link>
						</div>
						<Form noValidate validated={validated} onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Họ tên</Form.Label>
								<Form.Control required type="text" name={'name'} placeholder="Nguyễn Văn A"
									onChange={event => setName(event.target.value)}
									value={name} />
								<Form.Control.Feedback type="invalid">
									Tên không được để trống
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Email</Form.Label>
								<Form.Control required type="email" name={'email'} placeholder="nguyenvana@gmail.com"
									onChange={event => setEmail(event.target.value)}
									value={email} />
								<Form.Control.Feedback type="invalid">
									Email không được để trống
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Password</Form.Label>
								<Form.Control required type="password" name={'password'} placeholder="******"
									onChange={event => setPassword(event.target.value)}
								/>
								<Form.Control.Feedback type="invalid">
									Email không được để trống
								</Form.Control.Feedback>
							</Form.Group>

							<Row>
								<Col className={'col-3'}>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<SelectBase form={sex} setForm={setSex} name={'sex'}
											label={'Giới tính: '} data={gender}
											not_form={true}
											key_name={'sex'} required={false} placeholder={'Chọn giới tính'}
											type={'text'} error={'Chọn giới tính.'} />
									</Form.Group>
								</Col>
								<Col className={'col-3'}>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Ngày sinh</Form.Label>
										<DatePickerForm setValue={setBirthday} name={'birthday'}
											label={'Ngày sinh: '}
											value={birthday ? new Date(birthday) : null}
											key_name={'birthday'} required={false} placeholder={'Ngày sinh'}
											type={'date'} error={!birthday ? 'Vui lòng chọn ngày sinh' : ''} />
										{/* <Form.Control required type="date" name={ 'birthday' } placeholder=""
											onChange={ event => setBirthday( event.target.value ) }
											value={ birthday } />
										<Form.Control.Feedback type="invalid">
											Ngày sinh không được để trống
										</Form.Control.Feedback> */}
									</Form.Group>
								</Col>
								<Col className={'col-3'}>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Số điện thoại</Form.Label>
										<Form.Control required type="text" name={'phone'} placeholder="Số điện thoại"
											onChange={event => setPhone(event.target.value)}
											value={phone} />
										<Form.Control.Feedback type="invalid">
											Số điện thoại không được để trống
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
							</Row>

							<Form.Group controlId="formFile" className="mb-3">
								<Form.Label>Avatar</Form.Label>
								<ImageForm files={fileAlbums} changes={change} setChanges={setChange} setFiles={setFileAlbums} max={1} />
							</Form.Group>
							<Row>
								{roles.map((item, index) => {
									return (
										<Col key={index} className={'col-3'}>
											<Form.Check
												inline
												label={item.name}
												value={item._id}
												onChange={handleCheck}
												type='checkbox'
												id={`inline-checkbox-${item._id}`}
											/>
										</Col>
									)
								})}
							</Row>
							<Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
								<Button type="submit">Lưu dữ liệu</Button>
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
