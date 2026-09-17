import {json,method,bearer,config,supabase,errorMessage} from '../_config.js';

export default async function handler(req,res){
  if(!method(req,res,'GET')) return;
  try{
    const token=bearer(req); if(!token) return json(res,401,{error:'Authentication required.'});
    const {url,key}=config(); if(!url||!key) return json(res,503,{error:'Authentication backend is not configured.'});
    const user=await supabase('/auth/v1/user',{token});
    const admins=(process.env.ADMIN_EMAILS||'').split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);
    if(!admins.includes(String(user.email||'').toLowerCase())) return json(res,403,{error:'Admin access required.'});
    return json(res,200,{ok:true,admin:{id:user.id,email:user.email},services:{auth:true,email:Boolean(process.env.RESEND_API_KEY)}});
  }catch(e){return json(res,500,{error:errorMessage(e)})}
}
