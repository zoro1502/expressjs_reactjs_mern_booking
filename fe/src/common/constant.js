import imgdefault from '../assets/images/bg_1.jpg';
import imgdefault2 from '../assets/images/bg_2.jpg';
import img1 from '../assets/images/room-1.jpg';
import blog from '../assets/images/image_7.jpg';
import defaultUser from '../assets/images/default-avatar.png';
import defaultImg from '../assets/images/image_faildoad.png';
import notFoundImg from '../assets/images/not-found-address-mob.jpg';
import errorImg from '../assets/images/cancel.png';
import success from '../assets/images/success.png';

import info_a from '../assets/images/info_haan.jpg';
import info_b from '../assets/images/haan-resort-golf-26.jpeg';
import info_c from '../assets/images/phong-ng-daisy-room.jpg';

export const STATIC_URL_IMAGE=process.env.REACT_APP_URL_IMAGE;
export const defaultA = imgdefault;
export const defaultB = imgdefault2;
export const INFO_A = info_a;
export const INFO_B = info_b;
export const INFO_C = info_c;
export const defa = img1;
export const defaultD = blog;

export const DEFAULT_USER = defaultUser;
export const DEFAULT_IMG = defaultImg;
export const NOTFOUND_IMG = notFoundImg;
export const SUCCESS_IMG = success;
export const ERROR_IMG = errorImg;

export const Gender = [
	{
		value: 'NAM',
		label: 'Nam'
	},
	{
		value: 'Nữ',
		label: 'Nữ'
	},
	{
		value: 'Khác',
		label: 'Khác'
	}
];

export const INIT_PAGING = {
	current_page: 1,
	page_size: 8,
	total_page: 1,
	total: 0
};
