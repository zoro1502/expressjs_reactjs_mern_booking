import React from "react";

import { EnvelopeAt, Map, MapFill, TelephoneFill } from 'react-bootstrap-icons';

export const Footer = () => {
	return (
		<React.Fragment>
			<footer className="ftco-footer ftco-bg-dark ftco-section pb-0 pt-4">
				<div className="container">
					<div className="row mb-5">

						<div className="col-md">
							<div className="ftco-footer-widget mb-4 ml-md-5">
								<h2 className="ftco-heading-2">HỮU ÍCH</h2>
								<ul className="list-unstyled">
									<li><a href="/menu" className="py-2 d-block">Tuyển dụng | Tin tức</a></li>
									<li><a href="/room" className="py-2 d-block">Phòng tại HAAN</a></li>
									<li><a href="/contact" className="py-2 d-block">Bạn có câu hỏi ?</a></li>
								</ul>
							</div>
						</div>
						<div className="col-md">
							<div className="ftco-footer-widget mb-4">
								<h2 className="ftco-heading-2">CHECK-IN / CHECK-OUT </h2>
								<ul className="list-unstyled">
									<li><span className="text">Check-in: 2:00 PM</span></li>
									<li><span className="text">Check-out: 12:00 PM</span></li>
								</ul>
							</div>
						</div>
						<div className="col-md">
							<div className="ftco-footer-widget mb-4">
								<h2 className="ftco-heading-2">GIỚI THIỆU </h2>
								<ul className="list-unstyled">
									<li><a href="/contact" className="py-2 d-block">Về Haan Resort & Golf</a></li>
								</ul>
							</div>
						</div>
						<div className="col-md">
							<div className="ftco-footer-widget mb-4">
								<h2 className="ftco-heading-2"><a href="/contact"> THÔNG TIN LIÊN HỆ</a></h2>
								<div className="block-23 mb-3">
									<ul>
										<li>
											<MapFill className="mr-2" />
											<span className="text">87/18 Đường Cầu Đình, Long Phước, Tp Thủ Đức, TP Hồ Chí Minh - Việt Nam</span>
										</li>
										<li>
											<TelephoneFill className="mr-2" />
											<span className="text">0946954399 / 0945111369</span>
										</li>
										<li>
											<EnvelopeAt className="mr-2" />
											<span className="text"> haan.resort@gmail.com</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 text-center">
							<p>
								Copyright &copy; 2020 - {new Date().getFullYear()} by Diem Trinh</p>
						</div>
					</div>
				</div>
			</footer>
		</React.Fragment>
	);
};
