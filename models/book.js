const dbPool = require ('../config/db.js')

const getindex = async () => {
    try {
        const SQLQuery = 'SELECT * FROM book';
        const [rows] = await dbPool.promise().execute(SQLQuery); // Gunakan .promise()
        return rows; // Pastikan return berupa array
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};


const getByid = async (id) => { // ✅ Pastikan id masuk sebagai parameter
    console.log("ID yang dikirim ke query:", id); // Debugging

    const SQLQuery = 'SELECT * FROM book WHERE id = ?';  
    return dbPool.execute(SQLQuery, [id]); // ✅ Gunakan parameterized query
};

const createnew = async (body) => {
    const SQLQuery = `INSERT INTO book (title, writer, publisher, year, user_id, category_id) 
                      VALUES (?, ?, ?, ?, ?, ?)`;
    try {
        const [result] = await dbPool.promise().execute(SQLQuery, [
            body.title, body.writer, body.publisher, body.year, body.user_id, body.category_id
        ]);
        return result; // Mengembalikan hasil query
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};

const updateBook = async (id, body) => {
    const SQLQuery = `UPDATE book 
                      SET title = ?, writer = ?, publisher = ?, year = ?, user_id = ?, category_id = ? 
                      WHERE id = ?`;
    try {
        const [result] = await dbPool.promise().execute(SQLQuery, [
            body.title, body.writer, body.publisher, body.year, body.user_id, body.category_id, id
        ]);
        return result;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};


const deleteBook = async (id) => {
    const SQLQuery = "DELETE FROM book WHERE id = ?";
    try {
        const [result] = await dbPool.promise().execute(SQLQuery, [id]);
        return result;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};


module.exports = {
    getindex,
    createnew,
    updateBook,
    deleteBook,
    getByid,
}
