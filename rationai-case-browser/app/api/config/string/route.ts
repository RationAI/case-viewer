import { createConfig } from "@/app/utils"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const project = searchParams.get('project')

  const config = JSON.stringify(await createConfig(project))
  

  return Response.json({ config })
}