import mySqlPool from "../config/db.js"

const db = mySqlPool
//GET ALL PRODUCT LIST
const getProducts = async (req, res) => {
    try {
        const data = await db.query("SELECT * from Products p ")
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'No Records Found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'All Products Record',
            data: data[0],
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error in Get All Product API',
            error
        })
    }
}



export { getProducts }