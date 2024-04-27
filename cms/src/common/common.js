
import defaultUser from '../assets/images/default-avatar.png';
import defaultImg from '../assets/images/image_faildoad.png';
import defaultBg from '../assets/images/bg_2.jpg';
import moment from 'moment';
export const URL_IMG = process.env.REACT_APP_URL_IMAGE;
export default function currencyFormat ( price )
{
	return price.toFixed( 0 ).replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' )
}

export const DEFAULT_USER = defaultUser;
export const DEFAULT_IMG = defaultImg;
export const DEFAULT_BG = defaultBg;

export const getUser = () =>
{
	let user = localStorage.getItem( 'user' );
	if ( user )
	{
		return JSON.parse( user );
	}
	return null;
}

export const customDate = ( date, formatValue ) =>
{
	return moment( date ).format( formatValue );
}

export const buildImage = ( img ) =>
{
	return URL_IMG + img;
}

export const onErrorImg = ( e ) =>
{
	e.currentTarget.src = DEFAULT_IMG;
}

export const onErrorUser = ( e ) =>
{
	e.currentTarget.src = DEFAULT_USER;
}


export const readFile = ( fileValues, setFile, setImgBase64, oldFile ) =>
{
	let fileValue = fileValues;
	if ( oldFile )
	{
		setFile( oldFile.concat( fileValues ) );

	}
	let fileReader = new FileReader();
	fileReader.onload = ( e ) =>
	{
		const { result } = e.target;
		if ( result )
		{
			setImgBase64( result )
		}
	}
	fileReader.readAsDataURL( fileValue );
}

export const range = ( start, end ) =>
{
	let length = end - start + 1;
	/*
		Create an array of certain length and set the elements within it from
	  start value to end value.
	*/
	return Array.from( { length }, ( _, idx ) => idx + start );
};

export const customNumber = ( number, formatValue, type ) =>
{

	return number.toString().replace( /\B(?=(\d{3})+(?!\d))/g, formatValue ) + type;
}

export const caculateDateTime = ( start, end ) =>
{
	return moment( end ).diff( moment( start ), 'days' );
}

export const gender = [
	{
		_id: 'Nam',
		name: 'Nam'
	},
	{
		_id: 'Nữ',
		name: 'Nữ'
	},
	{
		_id: 'Khác',
		name: 'Khác'
	}
];

export const INIT_PAGING = {
	page: 1,
	page_size: 20,
	total: 0,
	current_page: 1
}

export const STATUS = [
	
	{
		_id: 'NOT_CLEAN',
		name: 'Chưa dọn dẹp'
	},
	{
		_id: 'CLEANING',
		name: 'Đang dọn dẹp'
	},
	{
		_id: 'EMPTY',
		name: 'Sẵn sàng'
	},
	{
		_id: 'CHO THUÊ',
		name: 'CHO THUÊ'
	}
]



