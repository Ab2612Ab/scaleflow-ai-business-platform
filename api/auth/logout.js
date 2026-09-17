import {json,method,supabase,bearer,errorMessage} from '../_config.js';
export default async function handler(req,res){if(!method(req,res,'POST'))return;try{const token=bearer(req);if(token)await supabase('/auth/v1/logout',{method:'POST',token});json(res,200,{ok:true})}catch(e){json(res,200,{ok:true})}}
