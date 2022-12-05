/**
 * deno 的静态文件服务，支持 deno deploy
 */
import { serve } from 'https://deno.land/std@0.167.0/http/server.ts'
import { serveDir } from 'https://deno.land/std@0.167.0/http/file_server.ts'

serve(request => serveDir(request))
