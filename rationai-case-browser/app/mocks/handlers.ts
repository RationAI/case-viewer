import { HttpResponse, bypass, http } from 'msw'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
 
export const handlers = [

  http.get('*', async ({ request }) => {
    const session = await getServerSession(authOptions)

    request.headers.set('Authorization', 'Bearer ' + session?.accessToken)
    const response = await fetch(bypass(request))
    const responseJson = await response.json()

    return HttpResponse.json({
      ...responseJson,
    })
  }),
]