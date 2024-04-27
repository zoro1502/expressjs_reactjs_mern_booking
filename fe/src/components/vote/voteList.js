import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { buildImage, buildImageV2, customDate, onErrorImg, onErrorUser } from "../../common/helper";
import { StarIcons } from "../common/star";
import { DEFAULT_USER } from "../../common/constant";
import { Pagination } from "../common/pagination";
import { StarFill } from "react-bootstrap-icons";


export const VoteList = ( props ) =>
{
	const [totalStar, setTotalStar] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		if(props.data?.total_star?.length > 0) {
			let total = props.data?.total_star.reduce((newItem, item) => {
				newItem += item?.count || 0;
				return newItem
			}, 0);

			setTotal(total)
			setTotalStar(props.data.total_star);
		}
	}, [props.data?.total_star])
	return (
		<Row className="mt-4">
			<Col md={ 12 } className="review mb-5">
				<Row>
					{
						[ ...Array( 6 ) ].map( ( item, index ) =>
						{
							if ( index === 0 )
							{
								return (
									<Col md={ 2 } xs={ 3 } className="text-center mt-2">
										<button className={ `btn ${ !props.params?.vote_number ? 'active' : '' }` }
											onClick={ e =>
											{
												props.setParams( { ...props.params, vote_number: null } );
												props.getDataList( props.id, { ...props.params, page: 1, vote_number: null } );
											} }
										>Tất cả ({total})</button>
									</Col>
								);
							}
							let star = totalStar?.find(e => e?._id === index) 
							return (
								<Col md={ 2 } xs={ 3 } className="text-center mt-2">
									<button className={ `btn mx-auto text-center 
											${ props.params?.vote_number === index ? 'active' : '' }` }
										onClick={ e =>
										{
											props.setParams( { ...props.params, vote_number: index } );
											props.getDataList( props.id, { ...props.params, page: 1, vote_number: index } );
										} }
									>
										<span>{ index }</span>
										<StarFill key={ index } className={ `star active
									${ index > 0 ? 'ml-2' : '' }` }
										/>
										<span>({star?._id === index ? star?.count : 0})</span>
									</button>

								</Col>
							);
						} )

					}
				</Row>

			</Col>
			{ props.data?.votes?.length > 0 && props.data?.votes.map( ( item, key ) =>
			{
				return (
					<Col md={ 12 } key={ key }>
						<div className="pricing-entry d-flex">
							<img src={ item.user?.avatar && buildImageV2( item.user?.avatar ) || DEFAULT_USER } alt="item.name" className="img" />
							<div className="desc pl-3">
								<div className="d-flex justify-content-between">
									<h4 className="mb-0">
										{ item?.user?.name }
									</h4>
									<span className="text-nowrap">{ customDate( item?.created_at, 'DD/MM/yyyy HH:mm' ) }</span>
								</div>
								<StarIcons vote_number={ item.vote_number } />

								<p className="text-break mt-2" style={ { wordBreak: 'break-all' } }>
									{ item.vote_content }
								</p>
							</div>
						</div>
					</Col>
				)
			} ) }

			<div className="mx-auto">
				{ props.params?.total > 0 &&
					< Pagination
						total={ props.params.total }
						page={ props.params.current_page }
						pageSize={ props.params.page_size }
						onPageChange={ ( e ) =>
						{
							props.getDataList( props.id, { ...props.params, page_size: props.params.page_size, page: e } )
						} }
					/>
				}
			</div>
		</Row>

	);
};
