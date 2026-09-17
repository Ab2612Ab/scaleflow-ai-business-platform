import {json,method,supabase,errorMessage} from '../_config.js';
export default async function handler(req,res){if(!method(req,res,'POST'))return;try{const {email}=req.body||{};if(!email)return json(res,400,{error:'Email is required.'});await supabase('/auth/v1/resend',{method:'POST',body:{type:'signup',email}});json(res,200,{ok:true})}catch(e){json(res,400,{error:errorMessage(e)})}}
