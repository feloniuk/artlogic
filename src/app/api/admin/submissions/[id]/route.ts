import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/auth";

async function authenticate(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { isRead } = await req.json();

  const updated = await prisma.contactSubmission.update({
    where: { id },
    data: { isRead: Boolean(isRead) },
  });

  return NextResponse.json({ success: true, submission: updated });
}
