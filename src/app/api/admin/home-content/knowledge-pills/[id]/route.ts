import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const homeContentInfo = await db.homeContent.findMany();

    return NextResponse.json(
      homeContentInfo[0].knowledgePillsContent.knowledgePills.find(
        ({ id }) => id === params.id,
      ),
      { status: 200 },
    );
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body: { title: string; description: string } = await request.json();

  try {
    const [homeContentInfo] = await db.homeContent.findMany();

    const knowledgePillsUpdated =
      homeContentInfo.knowledgePillsContent.knowledgePills.map(
        ({ id, title, description }) => {
          if (id === params.id) {
            return {
              id,
              title: body.title,
              description: body.description,
            };
          }

          return { id, title, description };
        },
      );

    const knowledgePillsInfoUpdated = await db.homeContent.update({
      where: {
        id: homeContentInfo.id,
      },
      data: {
        knowledgePillsContent: {
          subtitle: homeContentInfo.knowledgePillsContent.subtitle,
          knowledgePills: knowledgePillsUpdated,
        },
      },
    });

    return NextResponse.json(
      {
        knowledgePillsInfoUpdated,
        message: "Información actualizada correctamente",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}
