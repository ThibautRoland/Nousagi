import { IncomingMessage, ServerResponse } from 'http';
import Cookies from 'cookies';

export function parseCookies(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
  const cookies = new Cookies(req, res);
  return cookies;
}