import { Injectable, NestMiddleware } from "@nestjs/common";
import {Request, Response} from 'express'
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

@Injectable()
export class XMLMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('进入全局xml中间件')

    if(req.headers["content-type"] && req.headers["content-type"].includes('application/xml')) {
      req.on('data', mreq => {
        parser.parseString(mreq, function(err, result) {
          req['body'] = result
        })
      })
    }

    next()
  }
}