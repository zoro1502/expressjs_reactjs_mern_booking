import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Form, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { toggleShowLoading } from "../../redux/actions/common";
import { buildImage, caculateDateTime, customDate, customNumber, getItem, getUser, readFile, setField, timeDelay } from "../../common/helper";
import { toast } from "react-toastify";
import { InputBase } from "../base-form/controlInputForm";
import { SelectBase } from "../base-form/selectForm";
import { AuthService } from "../../services/feService/authService";
import { DEFAULT_IMG } from "../../common/constant";


export const FormResetPassword = ( props ) =>
{

	const [ form, setForm ] = useState( {
		email: null
	} );

	const [ error, setError ] = useState( '' );
	const [ success, setSuccess ] = useState( '' );
	const { type } = useParams()
	useEffect( () =>
	{
		if ( type == 'forget' )
		{
			setForm( { email: null } )
		} else
		{
			setForm( {
				email: null,
				old_password: null,
				new_password: null,
				confirm_password: null
			} )
		}
	}, [ type ] );

	useEffect( () =>
	{
		if ( form.confirm_password && form.new_password )
		{
			if ( form.confirm_password !== form.new_password )
			{
				setError( 'Mật khẩu không trùng khớp' )
			} else
			{
				setError( '' )
			}
		} else
		{
			setError( '' )
		}
	}, [ form.confirm_password, form.new_password ] );

	const [ validated, setValidated ] = useState( false );

	const dispatch = useDispatch();

	const handleSubmit = async ( e ) =>
	{
		e.preventDefault();
		if ( e?.currentTarget?.checkValidity() === false || error )
		{
			e.stopPropagation();
		} else
		{
			dispatch( toggleShowLoading( true ) );
			let response;
			if ( type === 'forget' )
			{
				response = await AuthService.sendEmail( form );
			} else
			{
				response = await AuthService.resetPassword( form );
			}
			if ( response?.status === 200 && response?.data )
			{


				if ( type === 'forget' )
				{
					setSuccess( 'Khởi tạo thành công! Vui lòng vào kiểm tra email của bạn' )
					toast( 'Khởi tạo thành công! Vui lòng vào kiểm tra email của bạn', { type: 'success', autoClose: 900 } );
					await timeDelay( 500 );
					dispatch( toggleShowLoading( false ) )
				} else
				{
					setSuccess( '' )
					toast( 'Cập nhật mật khẩu thành công', { type: 'success', autoClose: 900 } );
					await timeDelay( 1000 );
					dispatch( toggleShowLoading( false ) );
					window.location.href = '/sign-in';
				}
			} else
			{
				setSuccess( '' )
				toast( response?.message || 'Cập nhật thất bại!', { type: 'error', autoClose: 900 } )
			}
			dispatch( toggleShowLoading( false ) )
		}

		setValidated( true );

	}


	return (


		<div className='bg-auth d-flex'>
			<Container>
				<Row className='justify-content-center '>
					<Col md={ 6 } lg={ 4 }>
						<Card className="auth-box">
							<Card.Body className="w-100">
								<div className="text-center">
									<Link to={ '/' } className={ 'navbar-brand' }>
										<img src={ '/logo.png' } style={ { width: "40px" } } />
									</Link>
									<h3 className="text-white fs-22">
										{ type === 'forget' ? 'Khởi tạo mật khẩu' : 'Thay đổi mật khẩu' }
									</h3>
								</div>
								<Form noValidate validated={ validated } onSubmit={ handleSubmit }>
									<Row>
										<Form.Group className="mb-3 col-xl-12 text-white">
											<InputBase form={ form } setForm={ setForm } name={ 'email' }
												label={ 'Email: ' }
												key_name={ 'email' } required={ true } placeholder={ 'Nhập Email' }
												type={ 'text' } error={ 'Email không được để trống.' }
											/>
										</Form.Group>
										{
											type !== 'forget' &&
											<>
												<Form.Group className="mb-3 col-xl-12">
													<InputBase form={ form } setForm={ setForm } name={ 'old_password' }
														label={ 'Mật khẩu cũ: ' }
														key_name={ 'old_password' } required={ true } placeholder={ 'Nhập mật khẩu cũ' }
														type={ 'password' } error={ 'Mật khẩu không được để trống.' }
													/>
												</Form.Group>

												<Form.Group className="mb-3 col-xl-12">
													<InputBase form={ form } setForm={ setForm } name={ 'new_password' }
														label={ 'Mật khẩu mới: ' }
														key_name={ 'new_password' } required={ true } placeholder={ 'Nhập mật khẩu mới' }
														type={ 'password' } error={ 'Mật khẩu không được để trống.' }
													/>
												</Form.Group>

												<Form.Group className="mb-3 col-xl-12">
													<InputBase form={ form } setForm={ setForm } name={ 'confirm_password' }
														label={ 'Nhập lại mật khẩu mới: ' }
														key_name={ 'confirm_password' } required={ true } placeholder={ 'Nhập lại mật khẩu mới' }
														type={ 'password' } error={ 'Mật khẩu không được để trống.' }
													/>
												</Form.Group>
											</>
										}
										{

											error && <p className="text-danger col-12"> { error }</p>
										}
										{

											<p className="text-white col-12"> { success }</p>
										}
									</Row>

									<Form.Group className="mb-3 d-flex justify-content-center">
										<Button type="submit" size="sm" className='btn btn-primary px-3 fs-18 py-2'>
											{ type === 'forget' ? 'Khởi tạo mật khẩu' : 'Cập nhật' }
										</Button>
									</Form.Group>
								</Form>
								<div className="mt-4 text-center">
									<Link
										to="/password/reset"
										className="text-decoration-underline text-white"
									>
										{ " " }
										Đổi mật khẩu{ " " }
									</Link>
									|
									<Link
										to="/sign-in"
										className="text-decoration-underline text-white"
									>
										{ " " }
										Đăng nhập{ " " }
									</Link>
								</div>
							</Card.Body>
						</Card>
					</Col>

				</Row>
			</Container>
		</div>
	);
};

