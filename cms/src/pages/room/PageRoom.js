import React, { useEffect, useState } from 'react';
import { Badge, Breadcrumb, Button, Col, Container, Row, DropdownButton, Dropdown } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useSearchParams } from "react-router-dom";
import roomApi from '../../services/roomService';
import moment from "moment";
import currencyFormat, { DEFAULT_IMG, STATUS, URL_IMG, onErrorImg } from "../../common/common";
import { toast } from "react-toastify";
import { FormRoomSearch } from '../../common/form/formSearchRoom';
import { buildFilter } from '../../services/common';
import { Pagination } from '../../common/form/pagination';

export default function PageRoom ()
{

	const [ paging, setPaging ] = useState( {
		page: 1,
		page_size: 10,
		total: 0,
		current_page: 1
	} );

	const [ params, setParams ] = useState( {

	} );

	const [ rooms, setRooms ] = useState();

	const [ paramSearch, setParamSearch ] = useSearchParams()

	useEffect( () =>
	{
		getRooms( { ...params, page: paging.current_page, page_size: paging.page_size } ).then( r => { } );
	}, [] );

	const getRooms = async ( filters ) =>
	{
		filters = buildFilter( filters )
		setParamSearch( filters )
		const response = await roomApi.getRooms( filters )
		console.log( '--------- response: ', response )
		if ( response?.status === 'success' || response?.status === 200 )
		{
			setRooms( response.data.rooms );
			setPaging( response.meta )
		}
	}

	const handleDelete = async ( id ) =>
	{
		const response = await roomApi.delete( id );
		if ( response?.status === 'success' || response?.status === 200 )
		{
			toast( "Xóa thành công!" );
			getRooms( { ...params } ).then( r => { } );
		} else
		{
			toast( response?.error || 'error' );
		}
	}

	const genStatusRoom = ( status ) =>
	{
		let statusInfo = STATUS.find( item => item._id === status );
		switch ( status )
		{
			case 'NOT_CLEAN': return <Badge bg="danger">{ statusInfo?.name || status }</Badge>
			case 'CLEANING': return <Badge bg="success">{ statusInfo?.name || status }</Badge>
			case 'CHO THUÊ': return <Badge bg="warning">{ statusInfo?.name || status }</Badge>
			case 'EMPTY': return <Badge bg="info">{ statusInfo?.name || status }</Badge>
		}
	}

	return (
		<div>
			<Container>
				<Row>
					<Col md={ 12 }>
						<Breadcrumb>
							<Breadcrumb.Item href="/room" >
								Phòng
							</Breadcrumb.Item>
							<Breadcrumb.Item active>Danh sách phòng</Breadcrumb.Item>
						</Breadcrumb>
						<div className={ 'd-flex justify-content-end' }>
							<Link className={ 'btn btn-sm btn-primary' } to={ '/room/create' } >Thêm mới</Link>
						</div>
						<div className='my-5'>
							<FormRoomSearch
								getDataList={ getRooms }
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
									<th>Hình ảnh</th>
									<th>Tên</th>
									<th>Hạng phòng</th>
									<th>Giá</th>
									<th>Thông tin</th>
									<th>Trạng thái</th>

									<th>Thời gian tạo</th>
									<th>Người phụ trách</th>
									<th>Hành động</th>
								</tr>
							</thead>
							<tbody>
								{ rooms?.length > 0 ?
									rooms.map( ( item, key ) =>
									{
										return (
											<tr key={ item._id }>
												<td>{ key + 1 }</td>
												<td>
													<img src={ item.avatar ? URL_IMG + item.avatar : DEFAULT_IMG } style={ { width: "100px", height: "auto" } } alt="" onError={ onErrorImg } />
												</td>
												<td>
													<Link className={ '' } to={ `/room/update/${ item._id }` } >{ item.name }</Link>
												</td>
												<td>{ item?.category?.name }</td>
												<td>{ currencyFormat( item.price ) }</td>
												<td>
													<ul style={ { paddingLeft: 0 } }>
														{ item.max && <li><b>Max:</b> { item.max }</li> }
														<li><b>Diện tích:</b> { item.size }</li>
														<li><b>Số giường:</b> { item.bed }</li>
														<li><b>Tầng:</b> { item.floors }</li>
														<li><b>Số phòng:</b> { item.room_code }</li>
														<li><b>Số khách tối đa:</b> { item.customer }</li>
													</ul>
												</td>
												<td>
													{ genStatusRoom( item.status ) }
												</td>

												<td>{ moment( item.created_at ).format( "DD-MM-YYYY H:mm:ss" ) }</td>
												<td>
													{ item.admin &&
														<ul style={ { paddingLeft: '10px' } }>
															<li className='text-nowrap'>Tên: { item.admin?.name }</li>
															<li className='text-nowrap'>Email: { item.admin?.email }</li>
														</ul>
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
										<td className='text-center' colSpan={ 9 }>Không có dữ liệu</td>
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
									getRooms( { ...params, page_size: paging.page_size, page: e } )
								} }
							/>
						}

					</Col>
				</Row>
			</Container>
		</div>
	);
}

