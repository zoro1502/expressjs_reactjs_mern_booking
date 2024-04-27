import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Breadcrumb } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { InputBase } from "../base-form/controlInputForm";
import { SelectBase } from "../base-form/selectForm";
import { caculateDateTime, customDate, customNumber } from "../common";
import bookingApi from "../../services/bookingService";
import roomApi from "../../services/roomService";
import discountApi from "../../services/discountService";
import moment from "moment";
import { DatePickerForm } from "./datePickerForm";

const paymentType = [
	// {
	// 	_id: 1,
	// 	name: 'Tiền mặt'
	// },
	{
		_id: 2,
		name: 'Online'
	}
];

const statusBooking = [
	{
		_id: 'ĐANG XỬ LÝ',
		name: 'ĐANG XỬ LÝ'
	},
	{
		_id: 'CHẤP NHẬN',
		name: 'CHẤP NHẬN'
	},
	{
		_id: 'TỪ CHỐI',
		name: 'TỪ CHỐI'
	},
	{
		_id: 'HOÀN THÀNH',
		name: 'HOÀN THÀNH'
	},
];
const statusPayment = [
	{
		_id: 'ĐÃ THANH TOÁN',
		name: 'ĐÃ THANH TOÁN'
	},
	{
		_id: 'CHƯA THANH TOÁN',
		name: 'CHƯA THANH TOÁN'
	},
	{
		_id: 'ĐÁNH GIÁ',
		name: 'ĐÁNH GIÁ'
	}
];

const INIT_FORM = {
	check_in: null,
	check_out: null,
	amount_of_people: null,
	room_id: null,
	user_id: null,
	discount_id: null,
	discount: 0,
	discount_code: null,
	status: 'ĐANG XỬ LÝ',
	status_payment: 'CHƯA THANH TOÁN',
	price: 0,
	total_money: 0,
	customer_name: null,
	customer_email: null,
	customer_phone: null,
	payment_type: 2,
	note: null
}
export const UpdateBooking = () => {
	document.title = 'Quản lý đặt phòng | HAAN Resort & Golf';

	const [rooms, setRooms] = useState([]);

	const [form, setForm] = useState(INIT_FORM);

	const [validated, setValidated] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);


	const dispatch = useDispatch();
	const navigate = useNavigate();

	const params = useParams();


	useEffect(() => {
		getDataList();
		findById(params.id)
	}, [params.id]);

	useEffect(() => {
		if (form.room_id && rooms?.length > 0) {
			let data = rooms.find(item => item._id === form.room_id);
			let price = data?.price || 0;
			if (form.check_in && form.check_out) {

				let numberDate = caculateDateTime(form.check_in, form.check_out);
				setTotalPrice(price * numberDate)
			}

		}
	}, [form.room_id, form.check_in, form.check_out]);

	useEffect(() => {
		if(form.discount_code) {
			getListDiscount(form.discount_code);
		}
	}, [form.discount_code])



	const handleSubmit = async (event) => {
		event.preventDefault();
		const checked = event.currentTarget;
		if (checked?.checkValidity() === false) {
			event.stopPropagation();
		} else {
			console.log(form);
			let data = {
				...form,
				// discount_id: form.discount_id !== '0' && form.discount_id || null,
				amount_of_people: Number(form.amount_of_people)
			};

			const response = await bookingApi.update(params.id, data);
			if (response?.status === 'success' || response?.status === 200) {
				resetForm()
				toast("Cập nhật thành công");
				navigate('/booking')
			} else {
				toast(response?.message || response?.error || 'error');
			}
		}

		setValidated(true);

	}

	const findById = async (id) => {
		const response = await bookingApi.findById(id);
		if (response?.status === 'success' || response?.status === 200) {
			let data = response.data;
			delete data?._id;
			let checkIn = response?.data?.check_in && customDate(response?.data?.check_in, 'yyyy-MM-DD') || null;
			let checkOut = response?.data?.check_out && customDate(response?.data?.check_out, 'yyyy-MM-DD') || null;
			if (checkIn && checkOut) {

				let numberDate = caculateDateTime(checkIn, checkOut);
				setTotalPrice(response?.data.price * numberDate)
			}
			setForm({ ...data, check_in: checkIn, check_out: checkOut });
		} else {
			toast(response?.message || response?.error || 'error');
		}
	}

	const resetForm = () => {
		setForm(INIT_FORM);
		setValidated(false);
	}
	const getDataList = async () => {

		const rs = await roomApi.getRooms({ page: 1, page_size: 1000 });
		if (rs?.status === 200) {

			setRooms(rs?.data?.rooms || []);
		} else {
			setRooms([]);
		}
	};

	const getListDiscount = async (code) => {
		const rs = await discountApi.getDiscounts({ page: 1,code: code, status: 1 });
		if (rs?.status === 200 ) {
			let discounts = rs?.data?.discounts
			if (form.discount_code && rs?.data?.discounts.length > 0) {
				let data = discounts[0];
				let discount = data?.price || 0;
				setForm({ ...form, discount: discount, discount_id: data._id });
			} else {
				setForm({...form, discount: 0, discount_id: null})
			}
		}
	}



	return (
		<React.Fragment>
			<Container>
				<Breadcrumb>
					<Breadcrumb.Item href="/booking" >
						Quản lý đặt phòng
					</Breadcrumb.Item>
					<Breadcrumb.Item active>Cập nhật</Breadcrumb.Item>
				</Breadcrumb>
				<div className={'d-flex justify-content-end'}>
					<Link className={'btn btn-sm btn-primary'} to={'/booking'} >Trở về</Link>
				</div>
				<Row className="block-9 mt-5">
					<Col md={12} className="d-flex justify-content-center">
						<Form className="bg-white p-5 w-100 row" noValidate validated={validated} onSubmit={handleSubmit}>

							<Form.Group className="mb-3 col-xl-6">
								<Form.Label>Check in:</Form.Label>
								<DatePickerForm form={form} setValue={e => {
									setForm({ ...form, check_in: e });
								}} name={'check_in'}
									label={'Check in: '}
									minDate={new Date()}
									value={form.check_in ? new Date(form.check_in) : null}
									key_name={'check_in'} required={true} placeholder={'Thời gian check in'}
									type={'date'} error={form.check_in ? '' : 'Vui lòng nhập Thời gian check in.'} />
								{/* <InputBase form={ form } setForm={ setForm } name={ 'check_in' }
									label={ 'Check in: ' }
									key_name={ 'check_in' } required={ true } placeholder={ 'Thời gian check in' }
									type={ 'date' } error={ 'Vui lòng nhập Thời gian check in.' }
								/> */}
							</Form.Group>

							<Form.Group className="mb-3 col-xl-6">
								<Form.Label>Check out:</Form.Label>
								<DatePickerForm form={form} setValue={e => {
									setForm({ ...form, check_out: e });
								}} name={'check_out'}
									label={'Check Out: '}
									minDate={new Date()}
									value={form.check_out ? new Date(form.check_out) : null}
									key_name={'check_out'} required={true} placeholder={'Thời gian check in'}
									type={'date'} error={form.check_out ? '' : 'Vui lòng nhập Thời gian check in.'} />
								{/* <InputBase form={ form } setForm={ setForm } name={ 'checkout' }
									label={ 'Check out: ' }
									key_name={ 'check_out' } required={ true } placeholder={ 'Checkout' }
									type={ 'date' } error={ 'Vui lòng nhập Thời gian check out.' }
								/> */}
							</Form.Group>

							<Form.Group className="mb-3 col-xl-6">
								<InputBase form={form} setForm={setForm} name={'name'}
									label={'Họ và tên: '}
									key_name={'customer_name'} required={true} placeholder={'Họ và tên'}
									type={'text'} error={'Vui lòng nhập họ tên đầy đủ.'}
								/>
							</Form.Group>

							<Form.Group className="mb-3 col-xl-6">
								<InputBase form={form} setForm={setForm} name={'email'}
									label={'Email: '}
									key_name={'customer_email'} required={true} placeholder={'Email'}
									type={'email'} error={'Vui lòng nhập email.'}
								/>
							</Form.Group>

							<Form.Group className="mb-3 col-xl-6">
								<InputBase form={form} setForm={setForm} name={'customer_phone'}
									label={'Số điện thoại: '}
									key_name={'customer_phone'} required={true} placeholder={'Số điện thoại'}
									type={'text'} error={'Vui lòng nhập số điện thoại.'}
								/>
							</Form.Group>

							<Form.Group className="mb-3 col-xl-6">
								<InputBase form={form} setForm={setForm} name={'amount_of_people'}
									label={'Số người: '}
									key_name={'amount_of_people'} required={true} placeholder={'Số người'}
									type={'text'} error={'Vui lòng nhập số người.'}
								/>
							</Form.Group>
							<Form.Group className="mb-3 col-xl-6">
								<SelectBase form={form} setForm={setForm} name={'status'}
									label={'Trạng thái: '} data={statusBooking}
									key_name={'status'} required={true} placeholder={'Chọn trạng thái'}
									type={'text'} error={'Chọn trạng thái.'} />
							</Form.Group>


							<Form.Group className="mb-3 col-xl-6">
								<SelectBase form={form} setForm={setForm} name={'room_id'}
									label={'Phòng: '} data={rooms}
									key_name={'room_id'} required={true} placeholder={'Chọn phòng'}
									type={'text'} error={'Vui lòng chọn phòng.'} />
							</Form.Group>

							<Form.Group className="mb-3 col-xl-6">
								<InputBase form={form} setForm={setForm} name={'discount_code'}
									label={'Mã giảm giá: '}
									key_name={'discount_code'} required={false} placeholder={'Nhập mã giảm giá'}
									type={'text'} />
							</Form.Group>


							<Form.Group className="mb-3 col-xl-6">
								<SelectBase form={form} setForm={setForm} name={'payment_type'}
									data={paymentType}
									label={'Phương thức thanh toán: '}
									key_name={'payment_type'} required={true} placeholder={'Chọn phương thức thanh toán'}
									type={'text'} error={'Vui lòng chọn phương thức thanh toán.'}
								/>
							</Form.Group>

							<Form.Group className="mb-3 col-xl-6">
								<SelectBase form={form} setForm={setForm} name={'status_payment'}
									data={statusPayment}
									label={'Trạng thái thanh toán: '}
									key_name={'status_payment'} required={true} placeholder={'Trạng thái thanh toán'}
									type={'text'} error={'Vui lòng chọn trạng thái thanh toán.'}
								/>
							</Form.Group>

							<Form.Group className="mb-3 col-12">
								<InputBase form={form} setForm={setForm} name={'note'}
									label={'Ghi chú: '}
									as={'textarea'}
									readOnly={true}
									key_name={'note'} required={true} placeholder={'Ghi chú'}
									type={'text'} error={'Vui lòng nhập họ tên đầy đủ.'}
								/>
							</Form.Group>

							<Col xl={12} className="w-100 row">
								<Form.Group className="mb-3 col-xl-4">
									<Form.Label className="fs-19">Số tiền: </Form.Label>
									<p className="text-dark fs-19">{customNumber(totalPrice, '.', 'đ')}</p>
								</Form.Group>

								<Form.Group className="mb-3 col-xl-4">
									<Form.Label className="fs-19">Giảm giá: </Form.Label>
									<p className="text-dark fs-19">{customNumber(form.discount, '.', 'đ')}</p>
								</Form.Group>

								<Form.Group className="mb-3 col-xl-4">
									<Form.Label className="fs-19">Tổng tiền: </Form.Label>
									<p className="text-dark fs-19">{customNumber((totalPrice - form.discount) > 0 && (totalPrice - form.discount) || 0, '.', 'đ')}</p>
								</Form.Group>

								<Form.Group className="mb-3 col-12 d-flex justify-content-center">
									<Button type="submit" className='btn btn-primary py-3 px-5'>Cập nhật</Button>
								</Form.Group>
							</Col>
						</Form>
					</Col>

				</Row>
			</Container>
		</React.Fragment>
	);
};

