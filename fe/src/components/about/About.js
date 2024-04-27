import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";

export const AboutUs = () => {
	return (
		<div>
			<Row className="row justify-content-center mb-5 pb-3">
				<Col md={7} className="heading-section text-center">
					<h2 className="mb-4">Về chúng tôi</h2>
					<p>Haan Resort & Golf</p>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<p className="text-break">
					Tọa lạc nơi đảo ngọc Long Phước trong lành của thành phố Thủ Đức- thành phố sáng tạo, thuộc thành phố Hồ Chí  Minh, 
					khu nghỉ dưỡng HAAN Resort & Golf xinh đẹp ẩn mình dưới những tán cây xanh mát bên dòng suối nhỏ đổ ra sông Đồng Nai rộng lớn chở đầy phù sa, 
					với tầm nhìn ra toàn cảnh hoàng hôn tuyệt đẹp. HAAN có hệ thống nhà nghỉ lãng mạn, đầy đủ tiện nghi và khu tập golf sang trọng 
					cùng các dịch vụ cho những khách hàng sành điệu và các thành viên gia đình tận hưởng những thú vui giải trí lành mạnh, 
					chăm sóc sức khỏe và hơn nữa là sự kết nối để thành công trong kinh doanh.
					</p>
				</Col>
				<Col md={6}>
					<p className="text-break">
					HAAN Resort & Golf là đơn vị tiên phong tại thành phố Thủ Đức cung cấp một tổ hợp dịch vụ cao cấp, sang trọng với các tiện ích nghỉ dưỡng 
					hướng đến những doanh nhân, người thành đạt nghỉ ngơi, tập luyện, chăm sóc sức khỏe. Với đội ngũ chuyên nghiệp, năng động, sẵn sàng phục vụ, 
					chúng tôi luôn cầu thị để hoàn thiện đạt đến dịch vụ hoàn hảo, vượt qua sự mong đợi và hài lòng của quý khách.
					</p>
				</Col>
				<Col md={6}>
					<p className="text-break">
						<strong className="text-primary">
							THÔNG TIN DANH LAM & THẮNG CẢNH TRONG KHU VỰC
						</strong>
					</p>
					<p className="text-break">
						Nhà thờ Tổ nghiệp Tâm Linh Việt (nhà thờ Tổ Nghiệp Hoài Linh) tọa lạc tại đường số 5, cách 5 phút lái xe<br />
						Bảo Tàng Áo Dài Sĩ Hoàng tọa lạc tại đường Long Phước, cách 5 phút lái xe <br />
						Chùa Bửu Long – Top 10 công trình Phật giáo có thiết kế đẹp nhất Thế giới cách 15 phút lái xe, tọa lạc tại Phước Hội, Long Hưng <br />
						Chùa Bà Châu Đốc 3 cách 15 phút lái xe, tọa lạc tại	đường Đồng Xuân <br />
						Đầm sen Tam Đa	tọa lạc tại đường Tam Đa, Trường Thạnh, cách 15 phút lái xe <br />
						Phim trường Long Island	 tọa lạc tại đường Long Thuận, cách 5 phút lái xe <br />
						Chùa Quang Bửu tọa lạc tại đường Nguyễn Xiển, cách 15 phút lái xe <br />
						Chùa Bửu Sơn cách 10 phút lái xe, tọa lạc tịa đường Nguyễn Văn Tăng <br />
					</p>
				</Col>
				<Col md={6}>
					<p className="text-break">
						<strong className="text-primary">PHƯƠNG TIỆN ĐI LẠI </strong>
					</p>
					<p className="text-break">
						HAAN Resort & Golf cách trung tâm Thành phố Hồ Chí Minh khoảng 25km,
						cách sân bay Tân Sơn Nhất khoảng 25-30km tùy cung đường đi.<br />
						Đưa, đón khách sân bay <br />
						Bãi đỗ xe 
					</p>
				</Col>
			</Row>
			<Row className="row justify-content-center mb-5 pb-3">
				<Col md={7} className="heading-section text-center">
					<h2 className="mb-4">Thanh toán</h2>
				</Col>
			</Row>
			<Col md={6}>
				<p className="text-break">
					Chúng tôi chấp nhận các loại thẻ sau: Napas, MasterCard, Visa <br />
					Chúng tôi chấp nhận các loại thanh toán: Internet Banking, VN-Pay
				</p>
			</Col>
		</div>
	);
};
