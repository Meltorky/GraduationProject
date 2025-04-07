import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "Missing URL query parameter" },
      { status: 400 }
    );
  }

  try {
    // Fetch the image from Google Drive (or any source)
    const res = await fetch(imageUrl);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: res.status }
      );
    }

    const contentType = res.headers.get("Content-Type") || "image/jpeg";

    // Stream the image content to the client
    return new NextResponse(res.body, {
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
