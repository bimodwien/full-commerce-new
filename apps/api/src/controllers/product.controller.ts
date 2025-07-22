'use strict';

import ProductService from '@/services/product.service';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export class ProductController {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await ProductService.getAll(req);
      res.status(200).send({
        message: 'get all products',
        products,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await ProductService.getById(req);
      res.status(200).send({
        message: 'get product by ID',
        product,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await ProductService.create(req);
      res.status(201).send({
        message: 'create product success',
        product,
      });
    } catch (error) {
      next(error);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await ProductService.edit(req);
      res.status(200).send({
        message: 'edit product success',
        product,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await ProductService.deleteProduct(req);
      res.status(200).send({
        message: 'delete product success',
        product,
      });
    } catch (error) {
      next(error);
    }
  };

  render: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { productImage, updatedAt } = await ProductService.render(req);

      const etag = `"${updatedAt.getTime()}"`;
      res.setHeader('ETag', etag);

      res.setHeader('Last-Modified', updatedAt.toUTCString());

      res.setHeader(
        'Cache-Control',
        'public, max-age=3600, stale-while-revalidate=86400',
      );

      if (req.headers['if-none-match'] === etag) {
        res.status(304).end();
        return;
      }

      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(productImage, 'binary');
    } catch (error) {
      next(error);
    }
  };
}
