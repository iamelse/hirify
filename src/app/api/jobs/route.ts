import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || undefined;
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where = {
    AND: [
      search
        ? {
            OR: [
              { company: { contains: search, mode: "insensitive" } },
              { position: { contains: search, mode: "insensitive" } },
              { location: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
      status ? { status } : {},
      from && to
        ? {
            appliedAt: {
              gte: new Date(from),
              lte: new Date(to),
            },
          }
        : {},
    ],
  };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy: { appliedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.job.count({ where }),
  ]);

  return NextResponse.json({
    data: jobs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}