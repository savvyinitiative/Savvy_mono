import { draftMode, cookies } from "next/headers";
import { redirect } from "next/navigation";


const { CONTENTFUL_PREVIEW_SECRET } = process.env;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);


  if (searchParams.get("previewSecret") !== CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  draftMode().enable();
  // Set the cookie here

  const cookieStore = cookies();
  const cookie = cookieStore.get("__prerender_bypass")!;
  const draftValue = cookie?.value;
  if (draftValue) {
    cookies().set({
      name: "__prerender_bypass",
      value: draftValue,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });

  }

 


  // const headers = new Headers();


  const redirectTo = searchParams.get("redirect");


  if (redirectTo === "/homepage") {
    redirect("/");
  }

  redirect(redirectTo || "/");
}