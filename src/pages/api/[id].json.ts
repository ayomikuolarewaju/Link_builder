import type { APIRoute } from "astro";
import { Link, db, eq } from "astro:db";

export const DELETE: APIRoute = async ({ params }) => {
  const id = Number(params.id);

  if (!id) {
    return new Response(
      JSON.stringify({
        message: "Please provide all required fields.",
        success: false,
      }),
      {
        status: 404,
      }
    );
  }

  try {
    const res = await db.delete(Link).where(eq(Link.id, id));
    if (res) {
      return new Response(null, { status: 204 });
    } else {
      throw new Error("prob, bob");
    }
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: e,
        success: false,
      }),
      {
        status: 404,
      }
    );
  }
};