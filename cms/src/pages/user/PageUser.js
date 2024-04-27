import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import userApi from "../../services/userService";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { Pagination } from '../../common/form/pagination';
import {toast} from "react-toastify";

export default function PageUser() {

    const [paging, setPaging] = useState({
        page: 1,
        page_size: 20,
        total: 0,
        current_page: 1
    });

    const [params, setParams] = useState({

    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers({ ...params }).then(r => { });
    }, []);

    const getUsers = async (filters) => {
        const response = await userApi.getLists(filters)
        if (response?.status === 'success' || response?.status === 200) {
            setUsers(response.data.users);
            setPaging(response.meta)
        }
    }

    const handleDelete = async (id) => {
        const response = await userApi.delete(id);
        if (response?.status === 'success' || response?.status === 200) {
            toast("Xóa thành công!");
            getUsers({ ...params }).then(r => { });
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
                                Thành viên
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
                                    <th>Giới tính</th>
                                    <th>Ngày tháng năm sinh</th>
                                    <th>Loại tài khoản</th>
                                    <th>Thời gian tạo</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? users.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>
                                                <Link className={''} to={`/user/update/${item._id}`} >{item.name}</Link>
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
                                        <td className='text-center' colSpan={4}>Không có dữ liệu</td>
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
                                    getUsers({ ...params, page_size: paging.page_size, page: e })
                                }}
                            />
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
