import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import voteService from "../../services/voteService";
import { Link, useSearchParams } from "react-router-dom";
import moment from "moment/moment";
import { Pagination } from '../../common/form/pagination';
import { toast } from "react-toastify";
import { INIT_PAGING } from '../../common/common';
import { StarIcons } from '../../common/star';

export default function PageVoting ()
{

	const [ paging, setPaging ] = useState( INIT_PAGING );

	const [ params, setParams ] = useState( {

	} );

	const [ paramSearch, setParamsSearch ] = useSearchParams();

	const [ dataList, setDataList ] = useState( [] );

	useEffect( () =>
	{
		getDataList( { page: paging.page, page_size: paging.page_size, ...params } ).then( r => { } );
	}, [] );

	const getDataList = async ( filters ) =>
	{
		setParamsSearch( filters );
		const response = await voteService.getLists( filters )
		if ( response?.status === 'success' || response?.status === 200 )
		{
			setDataList( response.data.votes );
			setPaging( response.meta )
		}
	}

	const handleDelete = async ( id ) =>
	{
		const response = await voteService.delete( id );
		if ( response?.status === 'success' || response?.status === 200 )
		{
			toast( "Xóa thành công!" );
			getDataList( { ...params } ).then( r => { } );
		} else
		{
			toast( response?.error || 'error' );
		}
	}

	return (
		<div>
			<Container>
				<Row>
					<Col>
						<Breadcrumb>
							<Breadcrumb.Item href="/user" >
								Đánh giá
							</Breadcrumb.Item>
							<Breadcrumb.Item active>Danh sách</Breadcrumb.Item>
						</Breadcrumb>
						{/* <div className={ 'd-flex justify-content-end' }>
							<Link className={ 'btn btn-sm btn-primary' } to={ '/user/create' } >Thêm mới</Link>
						</div> */}
						<Table responsive>
							<thead>
								<tr>
									<th>STT</th>
									<th>người dùng</th>
									<th>Email</th>
									<th>Phòng</th>
									<th>Số sao</th>
									<th>Nội dung</th>
									<th>Thời gian tạo</th>
									<th>Hành động</th>
								</tr>
							</thead>
							<tbody>
								{ dataList.length > 0 ? dataList.map( ( item, key ) =>
								{
									return (
										<tr key={ key }>
											<td className='align-middle'>{ key + 1 }</td>
											<td className='text-nowrap align-middle'>
												{ item.user?.name || 'N/A' }
												{/* <Link className={ '' }
													to={ `/vote/update/${ item._id }` } >
													
												</Link> */}
											</td>
											<td className='text-nowrap align-middle'>{ item.user?.email || 'N/A' }</td>
											<td className='text-nowrap align-middle'>{ item.room?.name || 'N/A' }</td>
											<td className='align-middle'>
												<StarIcons vote_number={ item.vote_number } />
											</td>
											<td className='text-break' style={ { maxWidth: '200px' } }>{ item.vote_content }</td>
											<td className='align-middle'>{ moment( item.created_at ).format( "DD-MM-YYYY" ) }</td>
											<td className='align-middle'>
												<Button variant="danger" size="sm"
													onClick={ () => handleDelete( item._id ) }>
													Xóa
												</Button>{ ' ' }
											</td>
										</tr>
									)
								} )
									:
									<tr>
										<td className='text-center' colSpan={ 8 }>Không có dữ liệu</td>
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
									getDataList( { page: e, page_size: paging.page_size, ...params } )
								} }
							/>
						}
					</Col>
				</Row>
			</Container>
		</div>
	);
}
