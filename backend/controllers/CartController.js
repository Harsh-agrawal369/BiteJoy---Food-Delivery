import prisma from "../prisma/index.js";

const addToCart = async (req, res) => {
    try {
        const { userId, ItemId } = req.body;  // ItemId is the foodId

        // Find the user
        const user = await prisma.userModel.findUnique({
            where: { id: userId },
            include: { cart: { include: { items: true } } }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Find or create cart for the user
        let cart = user.cart[0]; // Assuming a user has only one cart
        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: userId
                }
            });
        }

        // Find the cart item
        let cartItem = await prisma.cartItem.findFirst({
            where: { cartId: cart.id, foodId: ItemId }
        });

        // Update or create the cart item
        if (!cartItem) {
            cartItem = await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    foodId: ItemId,
                    quantity: 1
                }
            });
        } else {
            cartItem = await prisma.cartItem.update({
                where: { id: cartItem.id },
                data: { quantity: cartItem.quantity + 1 }
            });
        }

        return res.status(200).json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { userId, ItemId } = req.body;  // ItemId is the foodId

        // Find the user
        const user = await prisma.userModel.findUnique({
            where: { id: userId },
            include: { cart: { include: { items: true } } }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cart = user.cart[0]; // Assuming a user has only one cart

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // Find the cart item
        let cartItem = await prisma.cartItem.findFirst({
            where: { cartId: cart.id, foodId: ItemId }
        });

        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        if (cartItem.quantity > 1) {
            // Decrease the quantity
            await prisma.cartItem.update({
                where: { id: cartItem.id },
                data: { quantity: cartItem.quantity - 1 }
            });
        } else {
            // Remove the item from the cart
            await prisma.cartItem.delete({
                where: { id: cartItem.id }
            });
        }

        return res.status(200).json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the user
        const user = await prisma.userModel.findUnique({
            where: { id: userId },
            include: { cart: { include: { items: { include: { food: true } } } } }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cart = user.cart[0]; // Assuming a user has only one cart

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        return res.status(200).json({ success: true, cart: cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export { addToCart, removeFromCart, getCart }
