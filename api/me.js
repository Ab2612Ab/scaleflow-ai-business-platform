import {json,method,supabase,bearer,errorMessage} from './_config.js';
export default async function handler(req,res){if(!method(req,res,'GET'))return;try{const token=bearer(req);if(!token)return json(res,401,{error:'Authentication required.'});const user=await supabase('/auth/v1/user',{token});json(res,200,{user})}catch(e){json(res,401,{error:errorMessage(e)})}}
