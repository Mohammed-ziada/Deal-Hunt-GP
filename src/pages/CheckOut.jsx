// import {
//     Typography,
//     Col,
//     Row,
//     Breadcrumb,
//     Button,
//     Divider,
// } from 'antd';

// import Address from '../components/Address/Address';

// export default function CheckOut() {
//     const { Title, Text } = Typography;

//     const breadcrumbItems = [
//         { title: 'Home', href: '/' },
//         { title: 'News', href: '/news' }
//     ];

//     return (
//         <>
//             <Row className="p-4">

//                 {/* Breadcrumb Section */}
//                 <Col span={24}>
//                     <Breadcrumb className="m-3 p-3" items={breadcrumbItems} />
//                 </Col>

//                 {/* Main Content: Cart Items + Order Summary */}
//                 <Col span={24}>
//                     <Row gutter={[16, 16]}>
//                         {/* Cart Items Section */}
//                         <Col xs={24} md={18} className="p-4">
//                             <Address />
//                         </Col>

//                         {/* Order Summary Section */}
//                         <Col
//                             xs={24}
//                             md={6}
//                             className="p-4 border border-gray-200 rounded-md bg-white self-start"
//                         >
//                             <Row gutter={[16]}>
//                                 <Col span={24}>
//                                     <Title level={4}>Order Summary</Title>
//                                 </Col>


//                                 {/* Summary Items */}
//                                 <Col span={24} className="my-4">
//                                     <Row className="p-3">
//                                         {/* Subtotal Section */}
//                                         <Col span={24} className="my-2">
//                                             <Row align="middle" gutter={[8, 8]}>
//                                                 <Col xs={12} sm={8}>
//                                                     <Text type="secondary" className="text-base sm:text-lg">
//                                                         Subtotal
//                                                     </Text>
//                                                 </Col>
//                                                 <Col xs={12} sm={8} offset={4} className="text-right">
//                                                     <Text type="secondary" className="text-base sm:text-lg">
//                                                         EGP <span className="text-gray-500 font-medium">128</span>
//                                                     </Text>
//                                                 </Col>
//                                             </Row>
//                                         </Col>

//                                         {/* Shipping Section */}
//                                         <Col span={24} className="my-2">
//                                             <Row align="middle" gutter={[8, 8]}>
//                                                 <Col xs={12} sm={8}>
//                                                     <Text type="secondary" className="text-base sm:text-lg">
//                                                         Shipping
//                                                     </Text>
//                                                 </Col>
//                                                 <Col xs={12} sm={8} offset={4} className="text-right">
//                                                     <Text type="secondary" className="text-base sm:text-lg">
//                                                         EGP <span className="text-gray-500 font-medium">32</span>
//                                                     </Text>
//                                                 </Col>
//                                             </Row>
//                                         </Col>

//                                         <Divider />

//                                         {/* Total Section */}
//                                         <Col span={24}>
//                                             <Row align="middle" gutter={[8, 8]}>
//                                                 <Col xs={12}>
//                                                     <Title level={4} className="text-base sm:text-xl">
//                                                         Total <Text type="secondary">(Including VAT)</Text>
//                                                     </Title>
//                                                 </Col>
//                                                 <Col xs={12} className="text-right">
//                                                     <Text className="text-main text-lg sm:text-xl font-bold">
//                                                         <Text className="p-2" type="secondary">
//                                                             EGP
//                                                         </Text>
//                                                         620.00
//                                                     </Text>
//                                                 </Col>

//                                                 {/* Checkout Button */}
//                                                 <Col span={24} className="mt-4">
//                                                     <Button
//                                                         size="large"
//                                                         className='w-full'
//                                                         style={{ backgroundColor: '#E93D82', borderColor: '#E93D82', color: '#fff' }}
//                                                     >
//                                                         Checkout
//                                                     </Button>
//                                                 </Col>
//                                             </Row>
//                                         </Col>
//                                     </Row>
//                                 </Col>
//                             </Row>
//                         </Col>
//                     </Row>
//                 </Col>
//             </Row>
//         </>
//     );
// }
import { useEffect, useState } from 'react';
import {
    Typography,
    Col,
    Row,
    Breadcrumb,
    Button,
    Divider,
    Space,
    Tag,
} from 'antd';

import Address from '../components/Address/Address';
import { useCart } from '../app/CartContext.jsx';
import { ThunderboltOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
// import { TbIrregularPolyhedron } from 'react-icons/tb';

export default function CheckOut() {
    const { Title, Text } = Typography;
    const { cart } = useCart(); // Access cart data
    // const [shipping, setShipping] = useState(32); // Static shipping cost (can be dynamic)
    const [subtotal, setSubtotal] = useState(0); // To store the dynamic subtotal price

    // Calculate subtotal dynamically based on cart contents
    useEffect(() => {
        const calculateSubtotal = parseFloat(cart.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2);
        setSubtotal(calculateSubtotal);
    }, [cart]);
  
    // Static data (can be replaced with dynamic logic)
    const staticShipping = 10;  // Static shipping cost
    const staticDiscount = 0;   // Static discount (optional)

    // Total calculation: Subtotal + Shipping - Discount
    const total = parseFloat(subtotal + staticShipping - staticDiscount).toFixed(2);

    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: 'Checkout', href: '/checkout' },
    ];

    return (
        <>
            <Row className="p-4">
                {/* Breadcrumb Section */}
                <Helmet>
                    <title>DealHunt - Checkout</title>
                </Helmet>
                <Col span={24}>
                    <Breadcrumb className="m-3 p-3" items={breadcrumbItems} />
                </Col>

                {/* Main Content: Cart Items + Order Summary */}
                <Col span={24}>
                    <Row gutter={[16, 16]}>
                        {/* Cart Items Section */}
                        <Col xs={24} md={18} className="p-4">
                            <Address />
                        </Col>

                        {/* Order Summary Section */}
                        <Col
                            xs={24}
                            md={6}
                            className="p-4 border border-gray-200 rounded-md bg-white self-start"
                        >
                            <Row gutter={[16]}>
                                <Col span={24}>
                                    <Title level={4}>Order Summary</Title>
                                </Col>

                                {/* Cart Items Display */}
                                {cart.length > 0 ? (
                                    cart.map((item) => (
                                        <Col span={24} className="my-4" key={item.id}>
                                            <Row className="p-3">
                                                <Col span={12}>
                                                    <Text className="text-base sm:text-lg">{item.title}</Text>
                                                </Col>
                                                <Col span={12} className="text-right">
                                                    <Text className="text-base sm:text-lg">
                                                        EGP <span className="text-gray-500 font-medium">{item.price} x {item.quantity}</span>
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                    ))
                                ) : (
                                    <Col span={24}>
                                        <Text>No items in the cart</Text>
                                    </Col>
                                )}

                                <Divider />

                                {/* Summary Items */}
                                <Col span={24} className="my-4">
                                    <Row className="p-3">
                                        {/* Subtotal Section */}
                                        <Col span={24} className="my-2">
                                            <Row align="middle" gutter={[8, 8]}>
                                                <Col xs={12} sm={8}>
                                                    <Text type="secondary" className="text-base sm:text-lg">
                                                        Subtotal
                                                    </Text>
                                                </Col>
                                                <Col xs={12} sm={8} offset={4} className="text-right">
                                                    <Text type="secondary" className="text-base sm:text-lg">
                                                        EGP <span className="text-gray-500 font-medium">{subtotal}</span>
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                        {/* Shipping Section */}
                                        <Col span={24} className="my-2">
                                            <Row align="middle" gutter={[8, 8]}>
                                                <Col xs={12} sm={8}>
                                                    <Text type="secondary" className="text-base sm:text-lg">
                                                        Shipping
                                                    </Text>
                                                </Col>
                                                <Col xs={12} sm={8} offset={4} className="text-right">
                                                    <Text type="secondary" className="text-base sm:text-lg">
                                                        EGP <span className="text-gray-500 font-medium">{staticShipping}</span>
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Divider />

                                        {/* Total Section */}
                                        <Col span={24}>
                                            <Row align="middle" gutter={[8, 8]}>
                                                <Col xs={12}>
                                                    <Title level={4} className="text-base sm:text-xl">
                                                        Total <Text type="secondary">(Including VAT)</Text>
                                                    </Title>
                                                </Col>
                                                <Col xs={12} className="text-right">
                                                    <Text className="text-main text-lg sm:text-xl font-bold">
                                                        <Text className="p-2" type="secondary">
                                                            EGP
                                                        </Text>
                                                        {total}
                                                    </Text>
                                                </Col>

                                                {/* Checkout Button */}
                                                <Col span={24} className="mt-4">
                                                    <Button
                                                        size="large"
                                                        className='w-full'
                                                        style={{ backgroundColor: '#E93D82', borderColor: '#E93D82', color: '#fff' }}
                                                    >
                                                        Checkout
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={18}>
                <Row className="p-5 border rounded-lg bg-white">
            {/* Header Section */}
            <Col span={24} className="p-4 flex justify-between items-center">
                {/* Left Section */}
                <Space>
                    <Title level={4} className="m-0 text-black">
                        Shipment
                    </Title>
                    <Text type="secondary">({cart.length} items)</Text>
                </Space>

                {/* Right Section */}
                <Space>
                    <Tag color="cyan" className="flex items-center">
                        <ThunderboltOutlined style={{ marginRight: 4 }} /> Fast Shipping
                    </Tag>
                    <Text type="secondary">Get it by 11 Sep</Text>
                </Space>
            </Col>

            {/* Product Cards Section */}
            <Row gutter={[16, 16]} className="w-full">
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <Col
                            key={item.id}
                            xs={24}       /* 1 card per row on extra small screens */
                            sm={12}       /* 2 cards per row on small screens */
                            md={8}        /* 3 cards per row on medium screens */
                            lg={12}        /* 4 cards per row on large screens */
                            className="p-4"
                        >
                            <div className="border rounded-lg p-4 flex gap-4 items-start">
                                <img
                                    src={item.thumbnail}
                                    alt="Product"
                                    className="rounded-md"
                                    style={{ width: 100, height: 100 }}
                                />
                                <div>
                                    <Title level={5} className="m-0">{item.title}</Title>
                                    <Text className="block">{item.description}</Text>
                                    <Text className="block">x {item.quantity || 1}</Text>
                                </div>
                            </div>
                        </Col>
                    ))
                ) : (
                    <Col span={24}>
                        <Text>No items in the cart</Text>
                    </Col>
                )}
            </Row>
                </Row>
                </Col>

            </Row>
        </>
    );
}
