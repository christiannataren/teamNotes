const bcrypt = require('bcrypt');
password = {}



password.hashPassword = async function (password) {
    const saltRounds = 10;
    let hash = await bcrypt.hash(password, saltRounds);
    return hash
}


module.exports = password