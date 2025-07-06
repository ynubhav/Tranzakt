const zod=require('zod');

const currentuservalidation=zod.object({
    username: zod.string().email(),
    password: zod.string()
})

module.exports={
    currentuservalidation:currentuservalidation
};