import { RequestHandler } from 'express';
import prisma from '@/prisma';

export class SampleController {
  getSampleData: RequestHandler = async (req, res, next) => {
    try {
      const sampleData = await prisma.sample.findMany();
      res.status(200).json(sampleData);
    } catch (err) {
      next(err);
    }
  };

  getSampleDataById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const sample = await prisma.sample.findUnique({
        where: { id: Number(id) },
      });

      if (!sample) {
        res.status(404).send('Not found');
        return;
      }
      res.status(200).json(sample);
    } catch (err) {
      next(err);
    }
  };

  createSampleData: RequestHandler = async (req, res, next) => {
    try {
      const { name, code } = req.body;
      const newSampleData = await prisma.sample.create({
        data: { name, code },
      });

      res.status(201).json(newSampleData);
    } catch (err) {
      next(err);
    }
  };
}
