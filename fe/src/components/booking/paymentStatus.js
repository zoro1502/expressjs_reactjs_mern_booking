import React, { useEffect, useState } from "react";
import { CarouselImg } from "../../components/common/carosel";
import { RoomList } from "../../components/room-service/roomList";
import { BlogList } from "../../components/blog/blogList";
import { RoomService } from "../../services/feService/roomService";
import { ArticleService } from "../../services/feService/articleService";
import { ERROR_IMG, SUCCESS_GIF, SUCCESS_IMG, defaultA, defaultB } from "../../common/constant";
import { BookmarkStar } from "react-bootstrap-icons";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router";



export const PaymentStatus = () =>
{
	document.title = 'Thanh toán';

	const [ img, setImg ] = useState( null );
	const [ title, setTitle ] = useState( '' );
	const [ content, setContent ] = useState( '' );

	const params = useParams();

	useEffect( () =>
	{
		if ( params.type === 'error' )
		{
			setImg( ERROR_IMG );
			setTitle( 'Thất bại' );
		} else if ( params.type === 'success' )
		{
			setImg( SUCCESS_IMG );
			setTitle( 'Thành công' );
		} else
		{
			setImg( SUCCESS_IMG );
			setContent( 'Booking thành công' );
		}
	}, [ params.type ] )

	return (
		<React.Fragment>

			<Container style={ { paddingTop: '7em', paddingBottom: '7em' } }>
				{
					img && <img src={ img } alt='payment' className="d-block mx-auto" />
				}
				{ content ? (
					<div className="mx-auto">
						<h2 className="text-center">{ content }</h2>
						<div className="text-center mx-auto">
							<img src="https://img001.prntscr.com/file/img001/AezE7Si4RsWGONiW6uBeBA.png" width={ 200 } height={ 200 } />
							<p className="mt-3">Vui lòng quét mã để có thể thanh toán</p>
						</div>

					</div>

				) : (
					<h2 className="text-center">Thanh toán { title }</h2>
				) }
			</Container>

		</React.Fragment>
	);
};

