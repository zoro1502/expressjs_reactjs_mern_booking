import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { INFO_A, INFO_B, INFO_C, defaultB } from "../../common/constant";




export const WelCome = () =>
{


	return (
		<React.Fragment>
			<section className="ftco-section pb-0 bg-light pt-0">
				<div className="info py-5">
					<Container className="info-item px-0">
						<div className=" flex-lg-row-reverse align-items-center d-block d-lg-flex">
							<div className="info-item--img">
								<img src={ INFO_A } alt="Tầm nhìn" className="w-100 h-100" />
							</div>
							<div className=" content">
								<div className="info-content">
									<p className="mb-2 text-center info-name">Haan</p>
									<h3 className="info-title fw-700 text-center">
										Tầm nhìn
									</h3>
									<p className="text-white">
										HAAN Resort & Golf hướng đến một tổ hợp nghỉ dưỡng cao cấp kết hợp thể thao,
										chăm sóc sức khỏe nhằm sở hữu hệ sinh thái kinh doanh lấy sự vận hành của
										tạo hóa làm nền tảng thương hiệu và phát triển.
									</p>
								</div>
							</div>
						</div>
						<div className=" d-block align-items-center d-lg-flex">
							<div className="info-item--img">
								<img src={ INFO_B } alt="Xứ mệnh" className="w-100 h-100" />
							</div>
							<div className="content">
								<div className="info-content">
									<p className="mb-2 text-center info-name">Haan</p>
									<h3 className="info-title fw-700 text-center">
										Xứ mệnh
									</h3>
									<p className="text-white">
										Chúng tôi tạo nên những giá trị đích thực bao gồm
										sản phẩm dịch vụ chất lượng, môi trường trong lành,
										thân thiện hòa mình với thiên nhiên, hóa giải những
										lo âu trong cuộc sống hướng đến sự thỏa mãn giá trị bản thân,
										gia đình và cộng đồng.
									</p>
								</div>
							</div>

						</div>
						<div className="flex-lg-row-reverse align-items-center d-block d-lg-flex">
							<div className="info-item--img">
								<img src={ INFO_C } alt="Giá trị cốt lõi" className="w-100 h-100" />
							</div>
							<div className="content">
								<div className="info-content">
									<p className="mb-2 text-center info-name">Haan</p>
									<h3 className="info-title fw-700 text-center">
										Giá trị cốt lõi
									</h3>
									<p className="text-white">
										HAAN luôn hướng tới hoàn thiện dịch vụ với phương châm khách hàng
										là trên hết. Chúng tôi luôn cầu thị, học hỏi,
										đem hết tâm huyết phục vụ, thỏa mãn khách hàng
										từ những chi tiết nhỏ nhất, đem lại cho mỗi du khách
										khi đến với HAAN sức khỏe về thể chất và an lạc trong tâm hồn.
									</p>
									{/* <p className="text-white">
										Với đội ngũ chuyên nghiệp, đoàn kết, đồng lòng, chúng tôi cam kết
										phục vụ khách hàng, góp phần thay đổi lối sống đô thị lành mạnh và
										năng động hơn để tái tạo năng lượng tươi mới, sáng tạo.
									</p> */}
								</div>
							</div>

						</div>
					</Container>
				</div>
			</section>

		</React.Fragment>
	);
};


