const zod=require('zod');

const newuservalidation=zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

module.exports={
    newuservalidation:newuservalidation
};