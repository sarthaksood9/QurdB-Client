import axios from 'axios';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useInRouterContext } from 'react-router-dom';
import { removeFromCart } from '../redux/cartSlice';
import { UserContext } from '../context/UserContext';

function ViewCart() {
    const cartItems = useSelector(state => state.cart.cart);

    console.log(cartItems);

    const [cti,Setcti]=useState(cartItems);
    const user = useContext(UserContext);

    const [shippingMethod, setShippingMethod] = useState('Free shipping');

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // Handling removing an item from the cart
    const handleRemove = async (productId) => {
        setLoading(true);
        try {


            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/cart/remove`, {
                data: {
                    userId: user.user._id,
                    productId: productId
                }
            });
            toast.success("Item Removed From Cart");
            dispatch(removeFromCart(productId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
            toast.error("Failed to remove item from cart");
            setLoading(false);
        }
    };

    const handleRemoveItem = (id) => {
        handleRemove(id);
    };

    const handleShippingChange = (method) => {
        setShippingMethod(method);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        let shippingCost = 0;

        switch (shippingMethod) {
            case 'Express shipping':
                shippingCost = 15.00;
                break;
            case 'Pick Up':
                shippingCost = 21.00;
                break;
            default:
                shippingCost = 0;
        }

        return subtotal + shippingCost;
    };

    return (
        <div className="container mx-auto px-4 py-8 h-screen pt-[10rem]">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className='border-b-2 border-black'>
                                <th className="text-left">Product</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-right">Price</th>
                                <th className="text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cti.map((item) => (
                                <tr className='border-b-[1px] border-black' key={item.id}>
                                    <td className="flex gap-4 items-center  p-1 py-4 px-10 ">
                                        <img src={item.image[0]?.url} alt={item.name} className="w-12 h-12 rounded-md" />
                                        <div className="ml-3">
                                            <p className="font-medium">{item.name}</p>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => { toast.error("Feature Comeing Soon..") }}
                                                disabled={item.quantity <= 1}
                                                className="bg-gray-200 px-2 py-1 rounded-sm text-gray-500 hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => { toast.error("Feature Comeing Soon..") }}
                                                className="bg-gray-200 px-2 py-1 rounded-sm text-gray-500 hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="text-right">${item.price.toFixed(2)}</td>
                                    <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex-1">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-xl font-bold mb-4">Cart summary</h2>

                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="shipping"
                                id="free-shipping"
                                checked={shippingMethod === 'Free shipping'}
                                onChange={() => handleShippingChange('Free shipping')}
                                className="mr-2"
                            />
                            <label htmlFor="free-shipping" className="font-medium">Free shipping</label>
                            <span className="ml-auto">${shippingMethod === 'Free shipping' ? '0.00' : ''}</span>
                        </div>

                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="shipping"
                                id="express-shipping"
                                checked={shippingMethod === 'Express shipping'}
                                onChange={() => handleShippingChange('Express shipping')}
                                className="mr-2"
                            />
                            <label htmlFor="express-shipping" className="font-medium">Express shipping</label>
                            <span className="ml-auto">${shippingMethod === 'Express shipping' ? '+15.00' : ''}</span>
                        </div>

                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="shipping"
                                id="pick-up"
                                checked={shippingMethod === 'Pick Up'}
                                onChange={() => handleShippingChange('Pick Up')}
                                className="mr-2"
                            />
                            <label htmlFor="pick-up" className="font-medium">Pick Up</label>
                            <span className="ml-auto">${shippingMethod === 'Pick Up' ? '%21.00' : ''}</span>
                        </div>

                        <hr className="my-4" />

                        <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">Subtotal</p>
                            <p>${calculateSubtotal().toFixed(2)}</p>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <p className="font-bold">Total</p>
                            <p>${calculateTotal().toFixed(2)}</p>
                        </div>

                        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-bold mb-2">Have a coupon?</h2>
                <p className="text-gray-500">Add your code for an instant cart discount</p>

                <div className="flex items-center gap-2 mt-2">
                    <input
                        type="text"
                        placeholder="Coupon Code"
                        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500"
                    />
                    <button className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">Apply</button>
                </div>
            </div>
        </div>
    );
}

export default ViewCart;
