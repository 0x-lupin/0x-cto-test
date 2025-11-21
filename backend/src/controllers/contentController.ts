import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const createContent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, slug, content, excerpt, isPublished } = req.body;

    const existingContent = await prisma.content.findUnique({
      where: { slug },
    });

    if (existingContent) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    const newContent = await prisma.content.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
        authorId: req.user!.userId,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create content' });
  }
};

export const getContents = async (req: AuthRequest, res: Response) => {
  try {
    const { isPublished, authorId } = req.query;

    const where: any = {};
    if (isPublished !== undefined) {
      where.isPublished = isPublished === 'true';
    }
    if (authorId) {
      where.authorId = authorId as string;
    }

    const contents = await prisma.content.findMany({
      where,
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contents' });
  }
};

export const getContentBySlug = async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;

    const content = await prisma.content.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

export const updateContent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.isPublished && !updateData.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const content = await prisma.content.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
};

export const deleteContent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.content.delete({ where: { id } });

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete content' });
  }
};
