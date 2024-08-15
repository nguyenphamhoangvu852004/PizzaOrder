import mySqlPool from "../config/db.js"

const db = mySqlPool
//GET ALL PRODUCT LIST
const getProducts = async (req, res) => {
    try {
        const data = await db.query(`select * from products`)
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records Found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All Products Record',
            data: data[0],
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get All Product API',
            error
        })
    }
}



export { getProducts }