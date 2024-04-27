import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from 'moment';
import roleApi from "../../services/roleService";
import adminApi from "../../services/adminService";
import uploadApi from '../../services/uploadService';
import ImageForm from '../../common/form/imageForm';
import { gender } from '../../common/common';
import { SelectBase } from '../../common/base-form/selectForm';
import { DatePickerForm } from '../../common/form/datePickerForm';

export default function UpdateAdmin() {

	const [validated, setValidated] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [sex, setSex] = useState('Nam');
	const [birthday, setBirthday] = useState('');
	const [avatar, setAvatar] = useState(null);

	const [phone, setPhone] = useState('');

	const [roles, setRoles] = useState([]);
	const [checked, setChecked] = useState([]);

	const [change, setChange] = useState(false);

	const [fileAlbums, setFileAlbums] = useState([
		{
			imgBase64: null,
			file: null
		}
	]);


	const params = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			let data = {
				name: name,
				avatar: avatar,
				phone: phone,
				email: email,
				birthday: birthday,
				sex: sex,
				roles: checked,
			}

			const albums = await uploadApi.uploadMultiImg(fileAlbums);
			if (albums?.length > 0) {
				data.avatar = albums[0]
			}

			const response = await adminApi.update(params.id, data);
			if (response.status === 'success' || response.status === 200) {
				toast("Cập nhật thành công");
				navigate('/admin')
			} else {
				toast(response?.message || response?.error || 'error');
			}
		}

		setValidated(true);
	};

	const findByUser = async (id) => {
		const response = await adminApi.findById(id);
		if (response.status === 'success' || response.status === 200) {
			setName(response.data.name);
			setEmail(response.data.email);
			setSex(response.data.sex);
			setPhone(response.data.phone);
			setAvatar(response.data.avatar);
			setBirthday(response.data.birthday ? new Date(response.data.birthday) : null);
			setChecked(response.data.roles);
			if (response.data.avatar) {
				setFileAlbums([{
					imgBase64: response.data.avatar,
					file: null
				}]);
				setChange(true)
			}
		} else {
			toast(response?.message || response?.error || 'error');
		}
	}

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

	const isChecked = (item) =>
		checked.includes(item) ? true : false;

	useEffect(() => {
		// getDetailData();
		if (params.id) {
			console.log('--------- params.id: ', params.id);
			findByUser(params.id);
		}
		getListsRoles({ ...{} }).then(r => { });
	}, [params.id]);

	return (
		<div>
			<Container>
				<Row>
					<Col>
						<Breadcrumb>
							<Breadcrumb.Item href="/admin" >
								Admin
							</Breadcrumb.Item>
							<Breadcrumb.Item active>Cập nhật</Breadcrumb.Item>
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
											type={'date'} error={!birthday ? 'Vui lòng chọn ngày sinh' : ''}
										/>
									</Form.Group>
								</Col>
								<Col className={'col-3'}>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Số điện thoại</Form.Label>
										<Form.Control
											required
											type="text"
											name={'phone'}
											placeholder="Số điện thoại"
											onChange={event => setPhone(event.target.value)}
											value={phone}
										/>
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
												checked={isChecked(item._id)}
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
