// import userModel from './../models/userModel.js';

// // add items to user cart
// const addToCart = async (req,res) => {
//         try {
//             let userData = await userModel.findById(req.body.userId);
//             let cartData = await userData.cartData;
//             if(!cartData[req.body.itemId])
//                 {
//                     cartData[req.body.itemId] = 1
//                 }
//                 else{
//                     cartData[req.body.itemId] += 1;
//                 }
//                 await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//                 res.json({success:true,message:"Added To Cart"});
//         } catch (error) {
//             console.log(error);
//             res.json({success:false,message:"Error"})
//         }

// }

// // remove items from user cart
// const removeFromCart = async (req,res) => {
//         try {
//             let userData = await userModel.findById(req.body.userId);
//             let cartData = await userData.cartData;
//             if (cartData[req.body.itemId]>0) {
//                 cartData[req.body.itemId] -=1;
//             }
//             await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//             res.json({success:true,message:"Remove From Cart"})
//         } catch (error) {
//             console.log(error);
//             res.json({success:false,message:"Error"})
//         }
// }

// // fetch user cart data
// const getCart = async (req,res) => {
//         try {
//             let userData = await userModel.findById(req.body.userId);
//             let cartData = await userData.cartData;
//             res.json({success:true,cartData})
//         } catch (error) {
//             console.log(error);
//             res.json({success:false,message:"Error"})
//         }
// }

// export {addToCart,removeFromCart,getCart};

import userModel from './../models/userModel.js';

// add items to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        let cartData = userData.cartData || {};
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        let cartData = userData.cartData || {};
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export { addToCart, removeFromCart, getCart };
