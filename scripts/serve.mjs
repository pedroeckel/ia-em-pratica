import http from 'node:http';
import { readFile,stat } from 'node:fs/promises';
import path from 'node:path';
import { repoRoot } from './lib/files.mjs';
const root=path.join(repoRoot,'dist');const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.zip':'application/zip','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
http.createServer(async(req,res)=>{
 try {
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+pathname);
  if(file!==root && !file.startsWith(root+path.sep))throw new Error('Caminho fora da raiz');
  const info=await stat(file);const target=info.isDirectory()?path.join(file,'index.html'):file;
  const bytes=await readFile(target);res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(bytes);
 } catch(error) {
  if(['ENOENT','ENOTDIR'].includes(error.code)) {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Página não encontrada. Volte ao catálogo.');}
  else {console.error(error);res.writeHead(500,{'Content-Type':'text/plain; charset=utf-8'});res.end('Falha ao servir a prévia. Consulte o terminal.');}
 }
}).listen(port,'127.0.0.1',()=>console.log(`Prévia local: http://127.0.0.1:${port}`));
