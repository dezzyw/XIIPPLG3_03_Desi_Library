const Bookmodel = require('../models/book.js')

const getindex = async (req, res) => {
    try {
        const data = await Bookmodel.getindex();
        res.json({
            message: 'GET all users success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

const createnew = async (req, res) => {
    const { body } = req;

    // Cek apakah semua data wajib ada
    if (!body.title || !body.writer || !body.publisher || !body.year || !body.user_id || !body.category_id) {
        return res.status(400).json({
            message: "Bad Request: Semua data harus diisi!"
        });
    }

    try {
        const result = await Bookmodel.createnew(body); 
        res.status(201).json({
            message: 'CREATE new book success',
            data: { id: result.insertId, ...body }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};


const updateBook = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    // Cek apakah semua data wajib ada
    if (!body.title || !body.writer || !body.publisher || !body.year || !body.user_id || !body.category_id) {
        return res.status(400).json({
            message: "Bad Request: Semua data harus diisi!"
        });
    }

    try {
        const result = await Bookmodel.updateBook(id, body);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Book dengan ID ${id} tidak ditemukan"
            });
        }

        res.json({
            message: "Book dengan ID ${id} berhasil diperbarui",
            data: { id, ...body }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};


const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Bookmodel.deleteBook(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Book dengan ID ${id} tidak ditemukan"
            });
        }

        res.json({
            message: "Book dengan ID ${id} berhasil dihapus"
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};


 
const getByid = async (req, res) => {
    const { id } = req.params; // Ambil ID dari URL parameter

    // Debugging untuk cek apakah ID terbaca
    console.log("ID dari req.params:", id);

    try {
        if (!id) {
            return res.status(400).json({ message: "ID tidak ditemukan dalam request" });
        }

        const [data] = await Bookmodel.getByid(id); // Panggil model dengan nama yang sesuai

        if (data.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({
            message: 'GET book by ID success',
            data: data[0]
        });

    } catch (error) {
        console.error("Error saat getByid:", error);
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message
        });
    }
}



module.exports = {
    getindex,
    createnew,
    updateBook,
    deleteBook,
    getByid,
}
