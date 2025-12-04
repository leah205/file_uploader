const {createClient} = require("@supabase/supabase-js")
const {decode} = require('base64-arraybuffer')
require('dotenv').config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
console.log("supabase")
const supabasedb = {
    uploadFile: async (path, userid, file, mimetype) => {
        
        const {data, error} = await supabase.storage
        .from("user-uploads")
        .upload(`${userid}/${path}`, file, {
            contentType: mimetype
        })
        if(error){
            throw(error)
        }
        //.upload(`${userid}/${path}`, file);
      
    },
    getUrl: async (path, userid) => {
        console.log(`${userid}/${path}`)
        const list = await supabase.storage.from("user-uploads").list(userid)
        console.log(list.data)
        const {data, error} = await supabase.storage.
        from("user-uploads")
        .createSignedUrl(`${userid}/${path}`, 3600, {download: true})
        if(error){
            throw(error)
        }
        return data.signedUrl
    },
    deleteFile: async (path, userid) => {
        const { data, error } = await supabase
            .storage
            .from('user-uploads')
            .remove([`${userid}/${path}`])
    }
  
}

module.exports = supabasedb