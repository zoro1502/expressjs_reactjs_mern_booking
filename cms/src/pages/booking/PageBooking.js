import React, { useEffect, useState } from 'react';
import { Badge, Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useSearchParams } from "react-router-dom";
import bookingApi from '../../services/bookingService';
import moment from "moment";
import currencyFormat, { URL_IMG } from "../../common/common";
import { toast } from "react-toastify";
import { Pagination } from '../../common/form/pagination';
import { buildFilter } from '../../services/common';
import { BookingSearch } from '../../common/form/bookingSearch';

export default function PageBooking ()
{

	const [ paging, setPaging ] = useState( {
		page: 1,
		page_size: 10,
		total: 0,
		current_page: 1
	} );

	const [ params, setParams ] = useState( {

	} );

	const [ bookings, setBookings ] = useState();
	const [ paramSearch, setParamSearch ] = useSearchParams()


	useEffect( () =>
	{
		getBookings( { page: paging.current_page, page_size: paging.page_size, ...params } ).then( r => { } );
	}, [] );

	const getBookings = async ( filters ) =>
	{
		filters = buildFilter( filters );
		setParamSearch( filters );
		const response = await bookingApi.index( filters )
		if ( response?.status === 'success' || response?.status === 200 )
		{
			setBookings( response.data.bookings );
			setPaging( response.meta )
		}
	}

	const handleDelete = async ( id ) =>
	{
		const response = await bookingApi.delete( id );
		if ( response?.status === 'success' || response?.status === 200 )
		{
			toast( "Xóa thành công!" );
			getBookings( { ...params } ).then( r => { } );
		} else
		{
			toast( response?.error || 'error' );
		}
	}

	const genStatus = ( status ) =>
	{
		if ( status === 'ĐANG XỬ LÝ' || status === 'PENDING' )
		{
			return <Badge bg="warning">ĐANG XỬ LÝ</Badge>
		}
		if ( status === 'CHẤP NHẬN' || status === 'APPROVED' )
		{
			return <Badge bg="primary">CHẤP NHẬN</Badge>
		}
		if ( status === 'HOÀN THÀNH' || status === 'SUCCESS' )
		{
			return <Badge bg="success">HOÀN THÀNH</Badge>
		}
		return <Badge bg="danger">{ status === 'CANCEL' ? 'HỦY' : 'TỪ CHỐI' }</Badge>

	}

	return (
		<div>
			<Container fluid>
				<Row>
					<Col>
						<Breadcrumb>
							<Breadcrumb.Item href="/booking" >
								Quản lý đặt phòng
							</Breadcrumb.Item>
							<Breadcrumb.Item active>Danh sách</Breadcrumb.Item>
						</Breadcrumb>
						<div className='my-5'>
							<BookingSearch
								getDataList={ getBookings }
								paging={ paging }
								setPaging={ setPaging }
								params={ params }
								setParams={ setParams }
							/>
						</div>
						<Table responsive>
							<thead>
								<tr>
									<th>STT</th>
									<th>Khách hàng</th>
									<th>Phòng</th>
									<th>Giá phòng</th>
									<th>Tổng tiền</th>
									<th>Check In - Check out</th>
									<th>Trạng thái</th>
									<th>Thanh toán</th>
									<th>Người phụ trách</th>
									<th>Hành động</th>
								</tr>
							</thead>
							<tbody>
								{ bookings ?
									bookings.map( ( item, key ) =>
									{
										return (
											<tr key={ item._id }>
												<td>{ key + 1 }</td>
												<td>
													<ul style={ { paddingLeft: 0 } }>
														<li>{ item.customer_name }</li>
														<li className='my-2'>
															<a href='javascript:void(0)'
																onClick={ () =>
																	getBookings( { page: 1, page_size: 10, email: item.customer_email } ) }>
																{ item.customer_email }
															</a>
														</li>
														<li>{ item.customer_phone }</li>
													</ul>
												</td>
												<td>
													<Link className={ '' } to={ `/booking/update/${ item._id }` } >{ item.room?.name }</Link>
												</td>
												<td className='text-nowrap'>
													<p className={ 'text-success' }>{ currencyFormat( item.price ) } đ</p>
													{ item.discount > 0 && (
														<p className={ 'mb-0' }> Giảm:
															<span className='text-danger ms-1'> -{ currencyFormat( item.discount ) } đ</span>
														</p>
													) }
												</td>
												<td className='text-nowrap'>
													<span className={ 'text-success' }>{ currencyFormat( item.total_money ) } đ</span>
												</td>
												<td className='text-nowrap'>
													<p>In: { moment( item.check_in ).format( "DD-MM-YYYY" ) }</p>
													<p className='mb-0'> Out: { moment( item.check_out ).format( "DD-MM-YYYY" ) }</p>
												</td>
												<td>
													{ genStatus( item.status ) }
												</td>
												<td>
													{ item.payment_type == 1 ? (
														<Badge bg="primary">Chuyển khoản</Badge>
													) : (
														<Badge bg="info">Online</Badge>
													) }
													<div>
														{ ( item.status_payment === 'PAID' || item.status_payment === 'ĐÃ THANH TOÁN' ) ?
															<Badge bg="success">Đã thanh toán</Badge>
															: <Badge bg="secondary">Chưa thanh toán</Badge>
														}
													</div>
												</td>
												<td>
													{ item.admin &&
													<span>{ item.admin?.name }</span>
														// <ul style={ { paddingLeft: '10px' } }>
														// 	<li className='text-nowrap'></li>
														// 	<li className='text-nowrap'>Email: { item.admin?.email }</li>
														// </ul>
													}
												</td>
												<td>
													<Button variant="danger" size="sm" onClick={ () => handleDelete( item._id ) }>
														Xóa
													</Button>{ ' ' }
												</td>
											</tr>
										)
									} )
									:
									<tr>
										<td className='text-center' colSpan={ 14 }>Không có dữ liệu</td>
									</tr>
								}
							</tbody>
						</Table>

						{
							paging.total > 0 &&
							<Pagination
								total={ paging.total }
								page={ paging.current_page }
								pageSize={ paging.page_size }
								onPageChange={ ( e ) =>
								{
									getBookings( { page: e, page_size: paging.page_size, ...params } )
								} }
							/>
						}
					</Col>
				</Row>
			</Container>
		</div>
	);
}
