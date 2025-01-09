import { Button, Col, Row, Typography, Modal, Dropdown, Space, Tag } from 'antd';
import { useState } from 'react';
import NewAddress from './NewAddress';
import { MoreOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { TbIrregularPolyhedron } from "react-icons/tb";
import Payment from './Payment/Payment';
 
export default function Address() {
    const { Title, Text } = Typography;

    const [isModal1Open, setIsModal1Open] = useState(false); // State for Modal 1
    const [isModal2Open, setIsModal2Open] = useState(false); // State for Modal 2 (passed to NewAddress)

    const handleModal1Ok = () => {
        setIsModal1Open(false);
    };

    const handleModal1Cancel = () => {
        setIsModal1Open(false);
    };

    const menuItems = [
        {
            key: '1',
            label: 'Edit',
        },
        {
            key: '2',
            label: 'Delete',
        },
    ];

    return (
        <>
            {/* First  Section */}
            <Row className="p-5 m-4 border rounded-lg ">
                <Col xs={24} md={24} className="p-4 flex justify-between">
                    <Title level={4}>Shipping Address</Title>
                    <Button type="primary" style={{ backgroundColor: '#E93D82', borderColor: '#E93D82', color: '#fff' }} onClick={() => setIsModal1Open(true)}>
                        Shipping Addresses
                    </Button>
                </Col>
                <Col xs={24} md={24} className="p-4">
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Col xs={24} md={24} className="p-3  w-full border rounded-lg relative">

                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <Title level={5} className="m-0">
                                            Home
                                        </Title>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Text className="text-gray-600">
                                            10 Al-Ahram Street, Dokki, Giza. Ground Floor, Unit 3.
                                        </Text>
                                    </Col>
                                </Row>

                            </Col>
                        </Col>
                        <Col span={24}>
                            <Col xs={24} md={24} className="p-3 w-full border rounded-lg relative">

                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <Title level={5} className="m-0">
                                            Office
                                        </Title>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Text className="text-gray-600">
                                            10 Al-Ahram Street, Dokki, Giza. Ground Floor, Unit 3.
                                        </Text>
                                    </Col>
                                </Row>

                            </Col>
                        </Col>
                    </Row>
                </Col>

            </Row>
            {/* Second Section */}
            
            {/* Four  Section */}
            <Row className="p-5 m-4 border rounded-lg ">
                <Col xs={24} md={24} className="p-4 flex justify-between">
                    <Title level={4}>Payment</Title>

                </Col>

                <Payment/>
            </Row>
            {/* Shipping Addresses Modal No.1 */}
            <Modal
                title="Shipping Addresses"
                open={isModal1Open}
                onOk={handleModal1Ok}
                onCancel={handleModal1Cancel}
                okText="Save"
                okButtonProps={{
                    style: {
                        backgroundColor: '#E93D82',
                        borderColor: '#E93D82',
                        color: '#fff', // White text
                    },
                }}
            >
                <Row>
                    <Col xs={24} md={24} className="my-2">
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => setIsModal2Open(true)} // Open Modal 2
                            className="w-full"
                            style={{ backgroundColor: '#E93D82', borderColor: '#E93D82', color: '#fff' }}
                        >
                            Add New
                        </Button>
                    </Col>
                    <Col xs={24} md={24} className="p-4 m-2 w-full border rounded-lg relative">

                        <Row justify="space-between" align="middle">
                            <Col>
                                <Title level={5} className="m-0">
                                    Office
                                </Title>
                            </Col>
                            <Col>
                                <Dropdown
                                    menu={{
                                        items: menuItems,
                                    }}
                                    trigger={['click']}
                                    placement="bottomRight"
                                >
                                    <Button
                                        type="text"
                                        icon={<MoreOutlined />}
                                        className="hover:bg-gray-100"
                                    />
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text className="text-gray-600">
                                    10 Al-Ahram Street, Dokki, Giza. Ground Floor, Unit 3.
                                </Text>
                            </Col>
                        </Row>

                    </Col>

                    <Col xs={24} md={24} className="p-4 m-2 w-full border rounded-lg relative">

                        <Row justify="space-between" align="middle">
                            <Col>
                                <Title level={5} className="m-0">
                                    Office
                                </Title>
                            </Col>
                            <Col>
                                <Dropdown
                                    menu={{
                                        items: menuItems,
                                    }}
                                    trigger={['click']}
                                    placement="bottomRight"
                                >
                                    <Button
                                        type="text"
                                        icon={<MoreOutlined />}
                                        className="hover:bg-gray-100"
                                    />
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text className="text-gray-600">
                                    10 Al-Ahram Street, Dokki, Giza. Ground Floor, Unit 3.
                                </Text>
                            </Col>
                        </Row>

                    </Col>

                </Row>
            </Modal>

            {/* Modal 2 (New Address Component) */}
            <NewAddress isOpen={isModal2Open} onClose={() => setIsModal2Open(false)} />
        </>
    );
}
