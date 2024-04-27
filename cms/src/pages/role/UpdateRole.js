import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import roleApi from '../../services/roleService';
import permissionApi from "../../services/permissionService";

export default function UpdateRole() {

    let { id } = useParams();

    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [permissionsLists, setPermissionsLists] = useState([]);
    const [checked, setChecked] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation(); 
        } else {

            let data = {
                name: name,
                description: description,
                permissions: checked
            }

            const response = await roleApi.update(params.id, data);
            if (response?.status === 'success' || response?.status === 200) {
                toast("Chỉnh sửa thành công");
                navigate('/role');
            } else {
                toast(response?.message || response?.error || 'error')
            }
        }
        setValidated(true);
    };

    const findById = async (id) => {
        const response = await roleApi.findById(id);
        if (response.status === 'success' || response.status === 200) {
            setName(response.data.name);
            setDescription(response.data.description);
            setChecked(response.data.permissions);
        } else {
            toast(response?.message || response?.error || 'error');
        }
    }

    const getListsPermissions = async () => {
        const response = await permissionApi.index({
            page_size: 1000
        })
        if (response?.status === 'success' || response?.status === 200) {
            console.log('------------- : response:getListsPermissions ', response);
            setPermissionsLists(response.data.permissions);
        }
    }

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const isChecked = (item) =>
        checked.includes(item) ? true : false;

    // const handleCheckAll = (event) => {
    //     setChecked([]);
    //     var updatedList = [...checked];
    //     if (event.target.checked) {

    //         permissionsLists.map((item, index) => {
    //             updatedList.push(item._id);
    //         });
    //     }
    //     setChecked(updatedList);
    // };

    const handleCheckAll = (event) => {
        const allChecked = event.target.checked;
        let updatedList = [];
        if (allChecked) {
            updatedList = permissionsLists.map(item => item._id);
        }
        setChecked(updatedList);
    };

    useEffect(() => {
        // getDetailData();
        if (params.id) {
            findById(params.id).then(r => { });
        }
        getListsPermissions({ ...{} }).then(r => { });
    }, [params.id]);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/role" >
                                Role
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Thêm mới</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className={'d-flex justify-content-end'}>
                            <Link className={'btn btn-sm btn-primary'} to={'/role'} >Trở về</Link>
                        </div>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tên nhóm quyền</Form.Label>
                                <Form.Control required type="text" name={'name'} placeholder="Tên nhóm quyền"
                                    onChange={event => setName(event.target.value)}
                                    value={name} />
                                <Form.Control.Feedback type="invalid">
                                    Tên không được để trống
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control required type="text" name={'name'} placeholder="Xem được danh sách thành viên"
                                    onChange={event => setDescription(event.target.value)}
                                    value={description} />
                                <Form.Control.Feedback type="invalid">
                                    Mô tả không được để trống
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Row>
                                <Col key="12121" className={'col-3'}>
                                    <Form.Check
                                        inline
                                        label="Tất cả"
                                        onChange={handleCheckAll}
                                        type='checkbox'
                                        id={`inline-checkbox-12121`}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                {permissionsLists.map((item, index) => {
                                    return (
                                        <Col key={index} className={'col-3'}>
                                            <Form.Check
                                                checked={isChecked(item._id)}
                                                inline
                                                label={item.name}
                                                value={item._id}
                                                onChange={handleCheck}
                                                type='checkbox'
                                                id={`inline-checkbox-${item._id}`}
                                            />
                                        </Col>
                                    )
                                })}

                            </Row>
                            <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                                <Button type="submit">Lưu dữ liệu</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
