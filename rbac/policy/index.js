const roles = require("../../enum/roles");
const adminPolicy = require("./adminPolicy");
const superadminPolicy = require("./superadminPolicy");
const userPolicy = require("./userPolicy");


const opts = {
    [roles.USER]:{can:userPolicy},
    [roles.SUPERADMIN]:{can:superadminPolicy},
    [roles.ADMIN]:{can:adminPolicy}
}

module.exports=opts