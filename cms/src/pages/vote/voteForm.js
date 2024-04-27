import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import voteService from "../../services/voteService";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { Pagination } from '../../common/form/pagination';
import {toast} from "react-toastify";
import { INIT_PAGING } from '../../common/common';

export default function VoteForm() {

    const [paging, setPaging] = useState(INIT_PAGING);

    const [params, setParams] = useState({

    });

    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        getDataList({ ...params }).then(r => { });
    }, []);

    const getDataList = async (filters) => {
        const response = await voteService.getLists(filters)
        if (response?.status === 'success' || response?.status === 200) {
            setDataList(response.data.votes);
            setPaging(response.meta)
        }
    }

    const handleDelete = async (id) => {
        const response = await voteService.delete(id);
        if (response?.status === 'success' || response?.status === 200) {
            toast("Xóa thành công!");
            getDataList({ ...params }).then(r => { });
        } else {
            toast(response?.error || 'error');
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
                        <div className={'d-flex justify-content-end'}>
                            <Link className={'btn btn-sm btn-primary'} to={'/user/create'} >Thêm mới</Link>
                        </div>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                    <th>Số sao</th>
                                    <th>Nội dung</th>
                                    <th>Phòng</th>
                                    <th>Thời gian tạo</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList.length > 0 ? dataList.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>
                                                <Link className={''} to={`/vote/update/${item._id}`} >{item.name}</Link>
                                            </td>
                                            <td>{item.email}</td>
                                            <td>{(item.sex === 'nu' || item.sex === 'Nữ') ? 'Nữ' : "Nam"}</td>
                                            <td>{moment(item.birthday).format("DD-MM-YYYY")}</td>
                                            <td>{item.type}</td>
                                            <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                                            <td>
                                                <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>
                                                    Xóa
                                                </Button>{' '}
                                            </td>
                                        </tr>
                                    )
                                })
                                    :
                                    <tr>
                                        <td className='text-center' colSpan={8}>Không có dữ liệu</td>
                                    </tr>
                                }

                            </tbody>
                        </Table>
                        {
                            paging.total > 0 &&
                            <Pagination
                                total={paging.total}
                                page={paging.current_page}
                                pageSize={paging.page_size}
                                onPageChange={(e) => {
                                    getDataList({ ...params, page_size: paging.page_size, page: e })
                                }}
                            />
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
