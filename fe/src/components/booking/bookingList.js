import React from "react";
import { Badge, Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { customDate, customNumber } from "../../common/helper";
import { NotFoundPage } from "../common/notFound";
import { FormVoteModal } from "../form/formVote";
import { Pagination } from "../common/pagination";
import { BookingService } from "../../services/feService/bookingService";

export const BookingList = ( props ) =>
{

	const handleCancel = async ( id ) =>
	{
		const response = await BookingService.cancel( id );
		console.log( '------------- response: ', response );
		if ( response?.status === 'success' || response?.status === 200 )
		{
			props.getDataList( { ...props.params, page_size: props.paging.page_size, page: 1 } )
		} else
		{

		}
	}

	const genStatus = ( status ) =>
	{
		if ( status === 'ĐANG XỬ LÝ' || status === 'PENDING' )
		{
			return <Badge bg="primary" text="white" className="p-2">ĐANG XỬ LÝ</Badge>
		}
		if ( status === 'CHẤP NHẬN' || status === 'HOÀN THÀNH' || status === 'APPROVED' )
		{
			return <Badge bg="success" text="white" className="p-2">
				{ status === 'APPROVED' ? 'CHẤP NHẬN' : status }
			</Badge>
		}
		return <Badge bg="danger" text="white" className="p-2">
			{ status === 'CANCEL' ? "HỦY BỎ" : status }
			</Badge>

	}

	return (
		<React.Fragment>
			<section className={ `ftco-section ${ props.notShowTitle ? 'pt-0' : ' bg-light' }` }>
				<Container fluid>

					{ props.data?.length > 0 &&
						<Table responsive striped bordered hover>
							<thead>
								<tr>
									<th>STT</th>
									<th>Khách hàng</th>
									<th>Tên phòng</th>
									<th>Giá phòng</th>
									<th>Giảm giá</th>
									<th>Tổng tiền</th>
									<th className="text-nowrap">Check In</th>
									<th className="text-nowrap">Check Out</th>
									<th>Trạng thái</th>
									<th>Trạng thái thanh toán</th>
									<th>Thời gian yêu cầu</th>
									<th>Hành động</th>

								</tr>
							</thead>
							<tbody>
								{
									props.data.map( ( item, key ) =>
									{
										return (
											<tr key={ item._id }>
												<td >{ key + 1 }</td>
												<td className="text-nowrap">
													<ul style={ { paddingLeft: 0, listStyleType: 'none' } }>
														<li>{ item.customer_name }</li>
														<li>{ item.customer_email }</li>
														<li>{ item.customer_phone }</li>
													</ul>
												</td>
												<td className="text-nowrap">
													<Link to={ '/room/' + item.room_id }>{ item.room?.name || '' }</Link>
												</td>
												<td className="text-nowrap">
													<span className={ 'text-success' }>{ customNumber( item.price, '.', ' đ' ) } </span>
												</td>
												<td className="text-nowrap">
													{ item.discount > 0 && (
														<span className={ 'text-danger' }>- { customNumber( item.discount, '.', ' đ' ) }</span>
													) }
												</td>
												<td className="text-nowrap">
													<span className={ 'text-success' }>{ customNumber( item.total_money, '.', ' đ' ) }</span>
												</td>
												<td className="text-nowrap">
													{ customDate( item.check_in, "DD-MM-YYYY" ) }
												</td>
												<td className="text-nowrap">
													{ customDate( item.check_out, "DD-MM-YYYY" ) }
												</td>
												<td>
													{ genStatus( item.status ) }
												</td>
												<td>
													<Badge bg="warning" text="dark" className="p-2">
														{ item.status_payment === "PAID" ?
															'ĐÃ THANH TOÁN' :
															( item.status_payment === 'UNPAID' ? 'CHƯA THANH TOÁN' : item.status_payment )
														}
													</Badge>
												</td>
												<td className="text-nowrap"	>
													{ customDate( item.created_at, "DD-MM-YYYY HH:mm:ss" ) }
												</td>

												<td>
													{
														item?.status_payment?.toUpperCase() === 'ĐÁNH GIÁ' &&
														<Button variant="success" size="sm" className="mt-2 mr-2"
															style={ { borderRadius: '10px' } } onClick={ e =>
															{
																props.setShowModal( true );
																props.setId( item.room_id );
															} }>
															Đánh giá
														</Button>
													}
													{
														item?.status?.toUpperCase() != "HỦY" &&
														<Button variant="danger" className="mt-2 mr-2" size="sm" style={ { borderRadius: '10px' } } onClick={ () => handleCancel( item._id ) }>
															Hủy
														</Button>
													}
												</td>
											</tr>
										)
									} )
								}
							</tbody>
						</Table>
						||
						<NotFoundPage />
					}
					<Row>
						{
							props.paging.total > 0 &&
							<Col md={ 12 }>
								< Pagination
									total={ props.paging.total }
									page={ props.paging.current_page }
									pageSize={ props.paging.page_size }
									onPageChange={ ( e ) =>
									{
										props.getDataList( { ...props.params, page_size: props.paging.page_size, page: e } )
									} }
								/>
							</Col>
						}
					</Row>

				</Container>
			</section>
			<FormVoteModal { ...props } />
		</React.Fragment>
	);
};
